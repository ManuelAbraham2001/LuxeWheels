package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Entity.Modelo;
import org.springframework.web.multipart.MultipartFile;

public interface FotoService {
    Foto cargar(MultipartFile foto);
    Foto cargarFotoModelo(MultipartFile foto, Modelo modelo);
}
