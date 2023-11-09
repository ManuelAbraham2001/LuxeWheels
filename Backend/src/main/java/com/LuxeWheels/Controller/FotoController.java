package com.LuxeWheels.Controller;

import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Service.FotoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/foto")
public class FotoController {
    @Autowired
    private FotoServiceImpl fotoService;

    @PostMapping
    public ResponseEntity<?> cargar(@RequestBody MultipartFile foto) throws IOException {
        Foto subida = fotoService.cargar(foto);
        return ResponseEntity.ok(subida.getUrl());
    }

}
