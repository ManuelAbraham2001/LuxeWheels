package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Service.VehiculoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin("*")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public ResponseEntity<?> listar(){
        return ResponseEntity.ok(vehiculoService.listarTodo());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> crear(@RequestParam("vehiculo") String json, @RequestParam("imagen") MultipartFile[] fotos) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        CrearVehiculoDTO crearVehiculoDTO = objectMapper.readValue(json, CrearVehiculoDTO.class);
        return ResponseEntity.ok(vehiculoService.crear(crearVehiculoDTO, fotos));
    }

    @GetMapping(params = "marca")
    public ResponseEntity<?> buscarVehiculosPorMarca(@RequestParam String marca){
        return ResponseEntity.ok(vehiculoService.buscarVehiculosPorMarca(marca));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarVehiculoPorId(@PathVariable Long id){
        return ResponseEntity.ok(vehiculoService.buscarVehiculoPorId(id));
    }
}
