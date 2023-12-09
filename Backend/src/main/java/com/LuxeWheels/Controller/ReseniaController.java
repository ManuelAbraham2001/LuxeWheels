package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.CrearReseniaDTO;
import com.LuxeWheels.Security.JwtUtil;
import com.LuxeWheels.Service.ReseniaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resenias")
public class ReseniaController {
    @Autowired
    private ReseniaServiceImpl reseniaService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/{id}")
    private ResponseEntity<?> crear(@RequestBody CrearReseniaDTO reseniaDTO, @PathVariable Long id, @RequestHeader("authorization") String token){
        if(jwtUtil.esValido(token.substring(7))){
            return ResponseEntity.ok(reseniaService.crear(reseniaDTO, id));
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping(value = "/{id}", params = {"page"})
    private ResponseEntity<?> listar(@PathVariable Long id, @RequestParam int page){
        return ResponseEntity.ok(reseniaService.listar(id, page));
    }
}
