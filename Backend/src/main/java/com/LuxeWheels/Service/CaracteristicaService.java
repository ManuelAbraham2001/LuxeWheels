package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Caracteristica;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CaracteristicaService {
    Caracteristica crear(String caracteristica, MultipartFile foto) throws IOException;
    List<Caracteristica> listar();
    void eliminar(Long id);
}
