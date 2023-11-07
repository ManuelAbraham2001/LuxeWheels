package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Modelo;

import java.util.List;

public interface ModeloService {
    Modelo crear(Modelo modelo);
    List<Modelo> listarTodos();
    void eliminar(Long id);
}
