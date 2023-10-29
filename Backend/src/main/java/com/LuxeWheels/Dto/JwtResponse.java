package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private static final String TYPE = "Bearer";
    private String type;
    private String token;

    public JwtResponse(String token) {
        this.type = TYPE;
        this.token = token;
    }
}
