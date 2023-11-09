package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Marca;
import com.LuxeWheels.Repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaServiceImpl implements MarcaService{

    @Autowired
    private MarcaRepository marcaRepository;

    @Override
    public List<Marca> listar() {
        return marcaRepository.findAll();
    }
}
