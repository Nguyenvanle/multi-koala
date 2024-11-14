package com.duokoala.server.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
//handle security endpoint and allow permission
public class SecurityConfig {
    private final String[] PUBLIC_ENDPOINTS = {"/**"};
    @Autowired
    private CustomJwtDecoder customJwtDecoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(request -> //config endpoint
                        request.requestMatchers(/*HttpMethod.POST,*/PUBLIC_ENDPOINTS).permitAll()
                                .anyRequest().authenticated());
        httpSecurity.oauth2ResourceServer(oauth2 ->//config jwt
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(customJwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);//avoid attacked web
        httpSecurity.cors(corsConfig -> corsConfig.configurationSource(request -> {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin("*"); //cấu hình cho phép truy cập từ domain nào
            corsConfiguration.addAllowedMethod("*"); //cấu hình cho phép sử dụng method nào
            corsConfiguration.addAllowedHeader("*"); //cấu hình cho phép sử dụng header nào
            corsConfiguration.setAllowCredentials(true); //cấu hình cho phép sử dụng credentials
            return corsConfiguration;
        })); //cấu hình cors
        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
        //without discard ROLE_ init permission
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public Cloudinary getCloudinary() {
        Map config = new HashMap();
        config.put("cloud_name", "dkz1esxyw");
        config.put("api_key", "137167157615336");
        config.put("api_secret", "mwoOHAglQTABRNvCVf1DF6-Gaq8");
        config.put("secure", true);
        return new Cloudinary(config);
    }

}
