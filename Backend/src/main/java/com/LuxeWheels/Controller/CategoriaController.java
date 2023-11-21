package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.CrearCategoriaDTO;
import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Entity.Categoria;
import com.LuxeWheels.Service.CategoriaServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaServiceImpl categoriaService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> crear(@RequestParam("categoria") String json, @RequestParam(value = "imagen", required = false) MultipartFile foto) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CrearCategoriaDTO categoria = objectMapper.readValue(json, CrearCategoriaDTO.class);
        return ResponseEntity.ok(categoriaService.crear(categoria, foto));
    }

    @GetMapping
    public ResponseEntity<?> listarCategorias(){
        return ResponseEntity.ok(categoriaService.listar());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> elimiar(@PathVariable Long id){

        return ResponseEntity.ok().build();
    }

}
