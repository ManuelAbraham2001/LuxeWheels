package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.Modelo;
import com.LuxeWheels.Service.ModeloServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modelo")
public class ModeloController {

    @Autowired
    private ModeloServiceImpl modeloService;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody CrearModeloDTO modelo){
        return ResponseEntity.ok(modeloService.crear(modelo));
    }

    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(modeloService.listarTodos());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        modeloService.eliminar(id);
        return ResponseEntity.ok().build();
    }

}
