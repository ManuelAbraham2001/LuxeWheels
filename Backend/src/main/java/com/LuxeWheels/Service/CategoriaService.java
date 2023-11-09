package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearCategoriaDTO;
import com.LuxeWheels.Entity.Categoria;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoriaService {
    Categoria crear(CrearCategoriaDTO categoriaDTO, MultipartFile foto) throws IOException;
    List<Categoria> listar();
}
