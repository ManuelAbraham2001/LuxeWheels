package com.LuxeWheels.Controller;

import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Security.JwtUtil;
import com.LuxeWheels.Service.UsuarioService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/usuarios"})
public class UsuarioController {
    @Autowired
    private UsuarioService service;

    @Autowired
    private JwtUtil jwtUtil;

    public UsuarioController() {
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuario(@PathVariable Long id) throws UsuarioNotFoundException {
        return ResponseEntity.ok(service.listarUsuario(id));
    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) throws UsuarioNotFoundException {
        Claims claims = jwtUtil.getClaims(token.substring(7));
        String email = claims.getSubject();
        return ResponseEntity.ok(service.listarUsuarioPorEmail(email));

    }

    @GetMapping("/allusers")
    public ResponseEntity<?> listarTodosLosUsuarios(){
        return ResponseEntity.ok(service.listarUsuarios());
    }

    @PostMapping("/favoritos/{id}")
    public ResponseEntity<?> toggleFavoritos(@PathVariable Long id, @RequestHeader(name = "authorization") String token){
        String tokenCut = token.substring(7);
        service.toggleFavorito(id, tokenCut);
        return ResponseEntity.ok().build();
    }

    @GetMapping("favoritos")
    public ResponseEntity<?> listarFavoritos(@RequestHeader(name = "authorization") String token){
        String tokenCut = token.substring(7);
        return ResponseEntity.ok(service.listarFavoritos(tokenCut));
    }

}
