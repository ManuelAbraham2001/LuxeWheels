package com.LuxeWheels.Controller;

import com.LuxeWheels.Service.MarcaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {

    @Autowired
    private MarcaServiceImpl marcaService;

    @GetMapping
    public ResponseEntity<?> listarCategorias(){
        return ResponseEntity.ok(marcaService.listar());
    }
}
