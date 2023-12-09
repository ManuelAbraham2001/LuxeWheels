package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearReseniaDTO;
import com.LuxeWheels.Entity.Resenia;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ReseniaService {
    Resenia crear(CrearReseniaDTO resenia, Long id);
    Page<Resenia> listar(Long id, int pagina);
}
