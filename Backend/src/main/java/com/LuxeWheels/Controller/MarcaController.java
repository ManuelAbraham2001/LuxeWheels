package com.LuxeWheels.Controller;

import com.LuxeWheels.Service.CategoriaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaServiceImpl categoriaService;

    @GetMapping
    public ResponseEntity<?> listarCategorias(){
        return ResponseEntity.ok(categoriaService.listar());
    }
}
