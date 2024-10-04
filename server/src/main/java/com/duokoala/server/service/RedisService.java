//package com.duokoala.server.service;
//
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import redis.clients.jedis.Jedis;
//import redis.clients.jedis.Connection;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//public class RedisService {
//    @Value("${spring.redis.full-endpoint}")
//    private String REDIS_ENDPOINT;
//
//    Connection createConnection() {
//        Jedis jedis = new Jedis(REDIS_ENDPOINT);
//        return jedis.getConnection();
//    }
//}