package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Entity.Modelo;
import com.LuxeWheels.Entity.Vehiculo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FotoService {
    Foto cargar(MultipartFile foto, String tipo) throws IOException;
    void cargarFotoModelo(MultipartFile foto, Vehiculo vehiculo);
}
