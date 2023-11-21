package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.JwtResponse;
import com.LuxeWheels.Dto.LoginDTO;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyExistException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Security.JwtUtil;
import com.LuxeWheels.Service.MailService;
import com.LuxeWheels.Service.UsuarioService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    private UsuarioService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MailService mailService;

    @PostMapping("/singup")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) throws RolNotFoundException, UsuarioAlreadyExistException {
        try{
            service.crear(usuario);
            mailService.sendMail(usuario, "Confirmacion de la cuenta");
        }catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws JsonProcessingException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generarToken(authentication);
        JwtResponse jwtResponse = new JwtResponse(token);
        return ResponseEntity.ok().body(jwtResponse);
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendEmail(@RequestBody Usuario usuario) throws MessagingException {
        mailService.sendMail(usuario, "Confirmar cuenta");
        return ResponseEntity.ok().build();
    }

}
