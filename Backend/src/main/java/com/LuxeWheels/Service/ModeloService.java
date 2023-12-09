package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.Modelo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ModeloService {
    Modelo crear(CrearModeloDTO modelo);
    void editar(CrearModeloDTO modeloDTO, Long id);
    Page<Modelo> listarTodos(int pagina);
    void agregarCategoria(String categoria, Long id);
    void eliminar(Long id);
}
