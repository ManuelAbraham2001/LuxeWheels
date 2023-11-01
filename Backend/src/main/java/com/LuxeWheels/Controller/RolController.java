package com.LuxeWheels.Controller;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyAdmin;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Service.RolServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/rol"})
public class RolController {
    @Autowired
    private RolServiceImpl service;

    @GetMapping
    public ResponseEntity<?> getRolByName(@RequestBody Rol rol) throws RolNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(service.getRolByNombre(rol.getRol()));
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<?> asignarAdmin(@PathVariable Long id) throws RolNotFoundException, UsuarioAlreadyAdmin, UsuarioNotFoundException {
        service.agregarOeliminarAdmin(id, false);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove/{id}")
    public ResponseEntity<?> removeAdmin(@PathVariable Long id) throws RolNotFoundException, UsuarioAlreadyAdmin, UsuarioNotFoundException {
        service.agregarOeliminarAdmin(id, true);
        return ResponseEntity.ok().build();
    }
}
