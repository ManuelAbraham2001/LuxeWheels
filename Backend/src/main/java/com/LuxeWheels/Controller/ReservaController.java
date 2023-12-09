package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.CrearReservaDTO;
import com.LuxeWheels.Exceptions.ConflictDatesException;
import com.LuxeWheels.Repository.ReservaRepository;
import com.LuxeWheels.Security.JwtUtil;
import com.LuxeWheels.Service.ReservaServiceImpl;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {
    @Autowired
    private ReservaServiceImpl reservaService;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/{id}")
    public ResponseEntity<?> crearReserva(@PathVariable Long id, @RequestBody CrearReservaDTO reservaDTO, @RequestHeader("authorization") String token) throws MessagingException, ConflictDatesException {
        if(token.startsWith("Bearer ")){
            String tokenSubString = token.substring(7);
            if(jwtUtil.esValido(tokenSubString)){
                return ResponseEntity.ok(reservaService.crearReserva(reservaDTO, id, tokenSubString));
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarReservasPorVehiculo(@PathVariable Long id){
        return ResponseEntity.ok(reservaService.listarFechas(id));
    }

    @DeleteMapping
    public ResponseEntity<?> delete(){
        reservaRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

}
