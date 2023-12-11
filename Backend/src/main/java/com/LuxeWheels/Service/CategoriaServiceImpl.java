package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearCategoriaDTO;
import com.LuxeWheels.Entity.Categoria;
import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Repository.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService{

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private FotoServiceImpl fotoService;

    @Override
    public Categoria crear(CrearCategoriaDTO categoriaDTO, MultipartFile foto) throws IOException {
        Foto fotoSubida = fotoService.cargar(foto, "image/jpeg");
        Categoria categoria = new Categoria(categoriaDTO.getCategoria(), categoriaDTO.getDescripcion(), fotoSubida.getUrl());
        return categoriaRepository.save(categoria);
    }

    @Override
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }
    @Override
    @Transactional
    public void eliminar(Long id) {
        categoriaRepository.deleteById(id);
    }
}
