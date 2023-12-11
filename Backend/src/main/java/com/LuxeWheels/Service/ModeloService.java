package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.Modelo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ModeloService {
    Modelo crear(CrearModeloDTO modelo);
    List<Modelo> listarTodos();
    void editar(CrearModeloDTO modeloDTO, Long id);
    Page<Modelo> listarPaginados(int pagina);
    void agregarCategoria(String categoria, Long id);
    void eliminar(Long id);
}
