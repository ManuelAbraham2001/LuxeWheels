package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.Modelo;

import java.util.List;

public interface ModeloService {
    Modelo crear(CrearModeloDTO modelo);
    List<Modelo> listarTodos();
    void eliminar(Long id);
}
