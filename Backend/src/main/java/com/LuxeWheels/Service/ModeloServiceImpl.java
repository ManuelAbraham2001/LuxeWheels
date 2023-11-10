package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearModeloDTO;
import com.LuxeWheels.Entity.*;
import com.LuxeWheels.Repository.CaracteristicaRepository;
import com.LuxeWheels.Repository.CategoriaRepository;
import com.LuxeWheels.Repository.MarcaRepository;
import com.LuxeWheels.Repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModeloServiceImpl implements ModeloService{

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;


    @Override
    public Modelo crear(CrearModeloDTO modelo) {
        Categoria categoria = categoriaRepository.findByCategoria(modelo.getCategoria());
        Marca marca = marcaRepository.findByMarca(modelo.getMarca());

        List<Caracteristica> caracteristicas = new ArrayList<>();
        for (String c : modelo.getCaracteristicas()) {
            Caracteristica caracteristica = caracteristicaRepository.findByCaracteristica(c);
            caracteristicas.add(caracteristica);
        }

        return modeloRepository.save(new Modelo(modelo.getModelo(), marca, categoria, caracteristicas));
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
