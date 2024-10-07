package com.duokoala.server.service;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    RedisTemplate<String, Object> redisTemplate;
    JavaMailSender javaMailSender;

    public void sendVerificationEmail(String email) throws MessagingException {
        int otp = generateOtp(email);
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

    public void sendForgotPasswordEmail(String email) throws MessagingException {
        int otp = generateOtp(email);
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

    public int generateRandomOtp() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }

    public int generateOtp(String email) {
        int otp = generateRandomOtp();
        redisTemplate.opsForValue().set(email,otp, 60, TimeUnit.SECONDS); // Lưu OTP vào Redis với thời gian hết hạn 60 giây
        return otp;
    }

    public Boolean verifyOtp(String email, String otp) {
        Object storedOtp = redisTemplate.opsForValue().get(email); // Lấy OTP từ Redis
        if (storedOtp == null) throw new AppException(ErrorCode.OTP_EXPIRED);
        return storedOtp.toString().equals(otp);
    }
}
