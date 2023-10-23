//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.LuxeWheels.Security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Collection;
import java.util.Date;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    public String generarToken(Authentication authentication) throws JsonProcessingException {
        String username = authentication.getName();

        Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();

        boolean esAdmin = roles.stream().anyMatch((r) -> r.getAuthority().equals("ROLE_ADMIN"));

        Claims claims = Jwts.claims();

        claims.put("roles", (new ObjectMapper()).writeValueAsString(roles));
        claims.put("esAdmin", esAdmin);

        return Jwts.builder().setClaims(claims).setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 999999999L)).signWith(SignatureAlgorithm.HS512, "firma").compact();
    }

    public Claims getClaims(String token) {
        Claims claims = Jwts.parser().setSigningKey("firma").parseClaimsJws(token).getBody();
        return claims;
    }

    public Boolean esValido(String token) {
        try {
            Jwts.parser().setSigningKey("firma").parseClaimsJws(token);
            return true;
        } catch (Exception var3) {
            return false;
        }
    }
}
