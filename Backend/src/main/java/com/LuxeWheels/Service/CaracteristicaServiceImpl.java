package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Caracteristica;
import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Repository.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CaracteristicaServiceImpl implements CaracteristicaService{

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Autowired
    private FotoServiceImpl fotoService;

    @Override
    public Caracteristica crear(String caracteristica, MultipartFile foto) throws IOException {
        Foto fotoCargada = fotoService.cargar(foto, "image/svg+xml");
        Caracteristica caracteristicaDB = new Caracteristica(caracteristica, fotoCargada.getUrl());
        return caracteristicaRepository.save(caracteristicaDB);
    }

    @Override
    public List<Caracteristica> listar() {
        return caracteristicaRepository.findAll();
    }

    @Override
    public void eliminar(Long id) {
        caracteristicaRepository.deleteById(id);
    }
}
