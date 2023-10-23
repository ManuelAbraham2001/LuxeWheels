package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.LoginDTO;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Security.JwtUtil;
import com.LuxeWheels.Service.UsuarioService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/usuarios"})
public class UsuarioController {
    @Autowired
    private UsuarioService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    public UsuarioController() {
    }

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) throws RolNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.service.crear(usuario));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<?> getUsuario(@PathVariable Long id) throws UsuarioNotFoundException {
        return ResponseEntity.ok(this.service.listarUsuario(id));
    }

    @PostMapping({"/login"})
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws JsonProcessingException {
        Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generarToken(authentication);
        Map<String, String> response = new HashMap();
        response.put("type", "Bearer");
        response.put("token", token);
        return ResponseEntity.ok().body(response);
    }
}
