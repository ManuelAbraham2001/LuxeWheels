package com.manu.clinica.dental.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;

@EnableWebMvc
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthEntryPoint jwtAuthEntryPoint;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    JwtAuthFilter jwtAuthFilter(){
        return new JwtAuthFilter();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Access-Control-Allow-Origin"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(a ->
                        a.requestMatchers("/usuarios/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/odontologos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/odontologos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/odontologos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/odontologos/**").hasAnyRole("ADMIN", "USER")
                                .requestMatchers(HttpMethod.POST, "/pacientes/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/pacientes/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/pacientes/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/pacientes/**").hasAnyRole("ADMIN", "USER")
                                .requestMatchers(HttpMethod.POST, "/turnos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/turnos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/turnos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/turnos/**").hasAnyRole("ADMIN", "USER")

                                .anyRequest().authenticated())

                .build();
    }

}
