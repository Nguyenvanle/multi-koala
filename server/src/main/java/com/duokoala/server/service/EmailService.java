package com.duokoala.server.service;

import com.duokoala.server.enums.OTPEnums.Type;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    @NonFinal
    @Value("${otp.valid-for-verification-duration}")
    long verifyDuration;
    @NonFinal
    @Value("${otp.valid-for-usage-duration}")
    long usageDuration;
    RedisTemplate<String, Object> redisTemplate;
    JavaMailSender javaMailSender;
    PasswordEncoder passwordEncoder;

    public void sendRegisterEmail(String email) throws MessagingException {
        String otp = generateRegisterOTP(email);
        String subject = "DuoKoala - Verify Your Email Address";
        String body = "<p>Dear User,</p>"
                + "<p>Thank you for signing up on DuoKoala, the leading platform for buying and selling courses. "
                + "To complete your email verification, please enter the following OTP into the system.</p>"
                + "<p><strong>Your OTP code is: <span style='font-size: 16px;'>" + otp + "</span></strong></p>"
                + "<p>This code is valid for 60 seconds.</p>"
                + "<p>If you did not request this, please ignore this email or contact our support team for assistance.</p>"
                + "<p>Best regards,<br/>The DuoKoala Team</p>";
        sendEmail(email, subject, body);
    }

    public void sendResetPasswordEmail(String email) throws MessagingException {
        String otp = generateForgetPasswordOTP(email);
        String subject = "DuoKoala - Reset Your Password";
        String body = "<p>Dear User,</p>"
                + "<p>We received a request to reset your DuoKoala account password. Please use the following OTP to reset your password:</p>"
                + "<p><strong>Your OTP code is: <span style='font-size: 16px;'>" + otp + "</span></strong></p>"
                + "<p>This code is valid for 60 seconds. If you did not request a password reset, please ignore this email or contact our support team for assistance.</p>"
                + "<p>Best regards,<br/>The DuoKoala Team</p>";
        sendEmail(email, subject, body);
    }

    void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        javaMailSender.send(mimeMessage);
    }

    private String generateRandomNumberOtp() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));
    }

    private String generateOtp(String email, Type type) {
        var otp = generateRandomNumberOtp();
        String key = "otp:" + type.name().toLowerCase() + ":" + email;
        var encodeOTP = passwordEncoder.encode(otp);
        redisTemplate.opsForValue().set(key, encodeOTP, verifyDuration, TimeUnit.SECONDS); // Lưu OTP vào Redis với thời gian hết hạn 60 giây
        return otp;
    }

    private String generateRegisterOTP(String email) {
        return generateOtp(email, Type.REGISTER);
    }

    public String generateForgetPasswordOTP(String email) {
        return generateOtp(email, Type.RESET_PASSWORD);
    }

    private Boolean verifyOtp(String email, String otp, Type type) {
        String key = "otp:" + type.name().toLowerCase() + ":" + email;
        Object storedOtp = redisTemplate.opsForValue().get(key); // Lấy key từ Redis
        if (storedOtp == null) throw new AppException(ErrorCode.OTP_EXPIRED);
        boolean isOtpValid = passwordEncoder.matches(otp, storedOtp.toString());
        if (isOtpValid) {
            String verifiedKey = "otp-verified:" + type.name().toLowerCase() + ":" + email;
            redisTemplate.opsForValue().set(verifiedKey, "verified", usageDuration, TimeUnit.SECONDS);
        }
        return isOtpValid;
    }

    public Boolean verifyRegisterOTP(String email, String otp) {
        return verifyOtp(email, otp, Type.REGISTER); // verify OTP for register
    }

    public Boolean verifyForgetPasswordOTP(String email, String otp) {
        return verifyOtp(email, otp, Type.RESET_PASSWORD); // verify OTP for forgetPassword
    }
}
