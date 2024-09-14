package com.duokoala.server.service;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RedisTemplateService {
    RedisTemplate<String, Integer> redisTemplate;

    public int generateRandomOtp() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }

    public int generateOtp(String email) {
        int otp = generateRandomOtp();
        redisTemplate.opsForValue().set(email,otp,60, TimeUnit.SECONDS);
        return otp;
    }

    public boolean verifyOtp(String email, int otp) {
        Integer storedOtp = redisTemplate.opsForValue().get(email);
        if(storedOtp == null) throw new AppException(ErrorCode.EMAIL_NOT_FOUND);
        return otp == storedOtp;
    }
}
