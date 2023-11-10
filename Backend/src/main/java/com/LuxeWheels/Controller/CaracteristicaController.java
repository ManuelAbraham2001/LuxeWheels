package com.LuxeWheels.Controller;

import com.LuxeWheels.Entity.Caracteristica;
import com.LuxeWheels.Service.CaracteristicaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/caracteristicas")
public class CaracteristicaController {
    @Autowired
    private CaracteristicaServiceImpl caracteristicaService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> crear(@RequestParam("caracteristica") String caracteristica, @RequestParam("foto") MultipartFile foto) throws IOException {
        return ResponseEntity.ok(caracteristicaService.crear(caracteristica, foto));
    }

    @GetMapping
    public ResponseEntity<?> listar(){
        return ResponseEntity.ok(caracteristicaService.listar());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        caracteristicaService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
