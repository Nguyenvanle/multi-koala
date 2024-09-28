package com.duokoala.server.service;

import com.duokoala.server.dto.request.authRequest.IntrospectRequest;
import com.duokoala.server.dto.request.authRequest.LoginRequest;
import com.duokoala.server.dto.request.authRequest.LogoutRequest;
import com.duokoala.server.dto.request.authRequest.RefreshRequest;
import com.duokoala.server.dto.response.authResponse.AuthenticationResponse;
import com.duokoala.server.dto.response.authResponse.IntrospectResponse;
import com.duokoala.server.entity.InvalidatedToken;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.entity.user.User;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.UserMapper;
import com.duokoala.server.repository.InvalidatedTokenRepository;
import com.duokoala.server.repository.userRepository.AdminRepository;
import com.duokoala.server.repository.userRepository.StudentRepository;
import com.duokoala.server.repository.userRepository.TeacherRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    StudentRepository studentRepository;
    TeacherRepository teacherRepository;
    AdminRepository adminRepository;
    UserMapper userMapper;


    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    public AuthenticationResponse login(LoginRequest request) throws JOSEException {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) throw new AppException(ErrorCode.INVALID_PASSWORD);
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .user(userMapper.toUserResponse(user))
                .authenticated(true)
                .build();
    }

    public AuthenticationResponse refreshToken(RefreshRequest request)
            throws ParseException, JOSEException {
        SignedJWT signedJWT = verifyToken(request.getToken(), true);

        String jit = signedJWT.getJWTClaimsSet().getJWTID();
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        String username = signedJWT.getJWTClaimsSet().getSubject();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .tokenId(jit)
                .expiryTime(expiryTime)
                .user(user)
                .build();
        invalidatedTokenRepository.save(invalidatedToken);
        var newToken = generateToken(user);

        return AuthenticationResponse.builder()
                .token(newToken)
                .user(userMapper.toUserResponse(user))
                .authenticated(true)
                .build();
    }


    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            SignedJWT signedJWT = verifyToken(request.getToken(), true);
            //throw exception if this signedJWT expired!

            String jit = signedJWT.getJWTClaimsSet().getJWTID();
            Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
            String username = signedJWT.getJWTClaimsSet().getSubject();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .tokenId(jit)
                    .expiryTime(expiryTime)
                    .user(user)
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException e) {
            log.info("Token already expired!");
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException {
        String token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh)
            throws ParseException, JOSEException {
        JWSVerifier jwsVerifier = new MACVerifier(SIGNER_KEY.getBytes());
        //create verify tool by signature

        SignedJWT signedJWT = SignedJWT.parse(token);
        //changed token to signedJWT

        var verified = signedJWT.verify(jwsVerifier);
        //verified =>is signedJWT can use?

        Date expireTime = (isRefresh) ?
                new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant()
                        .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        if (!(verified && expireTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String generateToken(User user) throws JOSEException {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        //header => use Algorithm HS512, enough strong to protect token
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .claim("userId", user.getUserId())
                .subject(user.getUsername())
                .jwtID(UUID.randomUUID().toString())
                .issuer("duokoalaServer.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
        return jwsObject.serialize();
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getRoleName());
                if (!CollectionUtils.isEmpty(role.getPermissions())) {
                    role.getPermissions()
                            .forEach(permission -> {
                                stringJoiner.add(permission.getPermissionName());
                            });
                }
            });
        }
        return stringJoiner.toString();
    }

    public String getAuthenticatedUsername() {
        var context = SecurityContextHolder.getContext(); //get current context
        return context.getAuthentication().getName();
    }

    public Student getAuthenticatedStudent() {
        return studentRepository.findByUsername(getAuthenticatedUsername())
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
    }

    public Admin getAuthenticatedAdmin() {
        return adminRepository.findByUsername(getAuthenticatedUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ADMIN_NOT_FOUND));
    }

    public Teacher getAuthenticatedTeacher() {
        return teacherRepository.findByUsername(getAuthenticatedUsername())
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
    }

    public User getAuthenticatedUser() {
        return userRepository.findByUsername(getAuthenticatedUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
}