package com.duokoala.server.service;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

    public void sendVerificationEmail(String email) {
        int otp = generateOtp(email);
        String subject = "Verify your email address";
        String body = "Please enter the following OTP to verify your email: " + otp;
        sendEmail(email,subject,body);
    }

    public boolean verifyEmail(String email, String otp) {
        return verifyOtp(email,Integer.parseInt(otp));
    }


    void sendEmail(String to,String subject, String body) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(body);
        javaMailSender.send(mailMessage);
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
        if(storedOtp == null) throw new AppException(ErrorCode.EMAIL_NOT_FOUND);
        if(!storedOtp.equals(otp)) throw new AppException(ErrorCode.INVALID_OTP);
        return true;
    }
}
