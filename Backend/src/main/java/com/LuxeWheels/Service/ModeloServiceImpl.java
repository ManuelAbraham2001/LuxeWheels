package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.Anio;
import com.LuxeWheels.Entity.Categoria;
import com.LuxeWheels.Entity.Marca;
import com.LuxeWheels.Entity.Modelo;
import com.LuxeWheels.Repository.CategoriaRepository;
import com.LuxeWheels.Repository.MarcaRepository;
import com.LuxeWheels.Repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModeloServiceImpl implements ModeloService{

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private ModeloRepository modeloRepository;


    @Override
    public Modelo crear(CrearModeloDTO modelo) {
        Categoria categoria = categoriaRepository.findByCategoria(modelo.getCategoria());
        Marca marca = marcaRepository.findByMarca(modelo.getMarca());

        return modeloRepository.save(new Modelo(modelo.getModelo(), marca, categoria));
    }

    @Override
    public List<Modelo> listarTodos() {
        return modeloRepository.findAll();
    }

    @Override
    public void eliminar(Long id) {
        modeloRepository.deleteById(id);
    }
}
