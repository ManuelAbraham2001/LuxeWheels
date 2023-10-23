//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.LuxeWheels.Security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Autowired
    private JwtUtil jwtUtil;

    public JwtAuthEntryPoint() {
    }

    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            if (!jwtUtil.esValido(jwt)) {
                sendUnauthorizedError(response, authException.getMessage());
            } else {
                Claims claims = jwtUtil.getClaims(jwt);
                boolean esAdmin = claims.get("esAdmin", Boolean.class);
                if (!esAdmin) {
                    sendForbiddenError(response, authException.getMessage());
                } else {
                    sendUnauthorizedError(response, authException.getMessage());
                }

            }
        } else {
            sendUnauthorizedError(response, authException.getMessage());
        }
    }

    private void sendUnauthorizedError(HttpServletResponse response, String message) throws IOException {
        response.sendError(401, message);
    }

    private void sendForbiddenError(HttpServletResponse response, String message) throws IOException {
        response.sendError(403, message);
    }
}
