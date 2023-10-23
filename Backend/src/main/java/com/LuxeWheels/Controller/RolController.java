package com.LuxeWheels.Controller;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Service.RolServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/rol"})
public class RolController {
    @Autowired
    private RolServiceImpl service;

    @GetMapping
    public ResponseEntity<?> getRolByName(@RequestBody Rol rol) throws RolNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(service.getRolByNombre(rol.getRol()));
    }
}
