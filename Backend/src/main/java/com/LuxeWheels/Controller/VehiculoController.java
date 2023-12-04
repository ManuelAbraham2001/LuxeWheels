package com.LuxeWheels.Controller;

import com.LuxeWheels.Dto.CrearReservaDTO;
import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Service.VehiculoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin("*")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public ResponseEntity<?> listarvehiculosPaginados(@RequestParam("page") int page){
        return ResponseEntity.ok(vehiculoService.paginarVehiculos(page));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> crear(@RequestParam("vehiculo") String json, @RequestParam(value = "imagen", required = false) MultipartFile[] fotos) throws JsonProcessingException {
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

    @GetMapping(params = {"page", "categorias"})
    public ResponseEntity<?> buscarVehiculosPorCategoria(@RequestParam int page, @RequestParam List<String> categorias){
        return ResponseEntity.ok(vehiculoService.filtrarVehiculosPorCategoria(page, categorias, (long) categorias.size()));
    }

    @GetMapping(params = {"page", "busqueda"})
    public ResponseEntity<?> buscarVehiculosPorInput(@RequestParam int page, @RequestParam String busqueda){
        return ResponseEntity.ok(vehiculoService.buscarVehiculosPorInput(page, busqueda));
    }
    @GetMapping(params = {"page", "busqueda", "categorias"})
    public ResponseEntity<?> filtrarPorBusquedaYCategorias(@RequestParam int page, @RequestParam String busqueda, @RequestParam List<String> categorias){
        return ResponseEntity.ok(vehiculoService.filtrarVehiculosPorBusquedaYCategoria(page, busqueda, categorias, (long) categorias.size()));
    }

    @GetMapping(value = "/buscar", params = {"page", "busqueda", "inicio", "fin"})
    public ResponseEntity<?> buscarPorFecha(@RequestParam int page, @RequestParam String busqueda, @RequestParam LocalDate inicio, @RequestParam LocalDate fin){
        return ResponseEntity.ok(vehiculoService.buscarPorFecha(page, busqueda, inicio, fin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        vehiculoService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
