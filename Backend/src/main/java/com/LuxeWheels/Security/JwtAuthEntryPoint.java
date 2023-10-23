package com.manu.clinica.dental.Security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            sendUnauthorizedError(response, authException.getMessage());
            return;
        }

        String jwt = token.substring(7);
        if (!jwtUtil.esValido(jwt)) {
            sendUnauthorizedError(response, authException.getMessage());
            return;
        }

        Claims claims = jwtUtil.obtenerClaims(jwt);
        boolean esAdmin = claims.get("esAdmin", Boolean.class);

        if (!esAdmin) {
            sendForbiddenError(response, authException.getMessage());
        } else {
            sendUnauthorizedError(response, authException.getMessage());
        }
    }

    private void sendUnauthorizedError(HttpServletResponse response, String message) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, message);
    }

    private void sendForbiddenError(HttpServletResponse response, String message) throws IOException {
        response.sendError(HttpServletResponse.SC_FORBIDDEN, message);
    }
}
