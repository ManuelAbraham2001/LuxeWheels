package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Entity.Modelo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FotoService {
    Foto cargar(MultipartFile foto) throws IOException;
    Foto cargarFotoModelo(MultipartFile foto, Modelo modelo);
}
