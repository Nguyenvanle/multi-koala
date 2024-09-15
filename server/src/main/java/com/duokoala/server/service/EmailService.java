package com.duokoala.server.service;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    Map<String, Integer> otpStorage = new ConcurrentHashMap<>();
    ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
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

    public boolean verifyEmail(String email, String otp) {
        return verifyOtp(email, Integer.parseInt(otp));
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
        otpStorage.put(email, otp);
        executorService.schedule(() ->
                otpStorage
                        .remove(email), 60, TimeUnit.SECONDS);
        return otp;
    }

    public boolean verifyOtp(String email, int otp) {
        Integer storedOtp = otpStorage.get(email);
        if (storedOtp == null) throw new AppException(ErrorCode.EMAIL_NOT_FOUND);
        if (!storedOtp.equals(otp)) throw new AppException(ErrorCode.INVALID_OTP);
        return true;
    }
}
