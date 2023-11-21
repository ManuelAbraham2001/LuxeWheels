package com.LuxeWheels.Security;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSConfig {
    private String accessKey = "accessKey"; // NUNCA PUSHEAR ESTAS CLAVES // CAMBIAR LOS VALORES SOLO PARA DESARROLLO

    private String secretKey = "secretKey"; // NUNCA PUSHEAR ESTAS CLAVES // CAMBIAR LOS VALORES SOLO PARA DESARROLLO

    private String region = "us-east-2";

    @Bean
    public AmazonS3 amazonS3Client() {
        return AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();
    }
}
