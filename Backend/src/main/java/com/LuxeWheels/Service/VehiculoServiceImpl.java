package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Entity.Modelo;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Repository.AnioRepository;
import com.LuxeWheels.Repository.CategoriaRepository;
import com.LuxeWheels.Repository.ModeloRepository;
import com.LuxeWheels.Repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoServiceImpl implements VehiculoService{

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private AnioRepository anioRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private FotoServiceImpl fotoService;

    @Override
    public List<Vehiculo> listarTodo() {
        return vehiculoRepository.findAll();
    }

    @Override
    public Vehiculo crear(CrearVehiculoDTO vehiculoDTO, MultipartFile fotos[]) {

        Modelo modelo = modeloRepository.findByModelo(vehiculoDTO.getModelo());

        for (MultipartFile foto : fotos) {
            fotoService.cargarFotoModelo(foto, modelo);
        }

        Vehiculo vehiculo = new Vehiculo(modelo, anioRepository.findByAnio(vehiculoDTO.getAnio()), vehiculoDTO.getPatente(), vehiculoDTO.getPrecio(), vehiculoDTO.getDescripcion());

        return vehiculoRepository.save(vehiculo);
    }

    @Override
    public Optional<Vehiculo> buscarVehiculoPorId(Long id) {
        return vehiculoRepository.buscarVehiculoPorId(id);
    }

    @Override
    public List<Vehiculo> buscarVehiculosPorMarca(String marca) {
        return vehiculoRepository.buscarVehiculosPorMarca(marca);
    }
}
