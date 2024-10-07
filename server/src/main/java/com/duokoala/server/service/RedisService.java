//package com.duokoala.server.service;
//
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.redis.core.HashOperations;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.concurrent.TimeUnit;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//public class RedisService {
//    @Value("${spring.redis.full-endpoint}")
//    private String REDIS_ENDPOINT;
//    RedisTemplate<String, Object> redisTemplate;
//    HashOperations<String, String, Object> hashOperations;
//
//    public void set(String key, String value) {
//        redisTemplate.opsForValue().set(key,value);
//    }
//
//    public void setTimeToLive(String key, long timeoutInDays) {
//        redisTemplate.expire(key, timeoutInDays, TimeUnit.DAYS);
//    }
//}