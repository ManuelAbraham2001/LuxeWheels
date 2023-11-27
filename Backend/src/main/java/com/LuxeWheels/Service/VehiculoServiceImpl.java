package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Entity.Foto;
import com.LuxeWheels.Entity.Modelo;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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

        Vehiculo vehiculo = new Vehiculo(modelo, anioRepository.findByAnio(vehiculoDTO.getAnio()), vehiculoDTO.getPatente(), vehiculoDTO.getPrecio(), vehiculoDTO.getDescripcion());
        Vehiculo vehiculoDB = vehiculoRepository.save(vehiculo);

        try{
            for (MultipartFile foto : fotos) {
                fotoService.cargarFotoModelo(foto, vehiculoDB);
            }
        }catch (RuntimeException e){
            e.printStackTrace();
        }

        return vehiculoDB;
    }

    @Override
    public Optional<Vehiculo> buscarVehiculoPorId(Long id) {
        return vehiculoRepository.buscarVehiculoPorId(id);
    }

    @Override
    public List<Vehiculo> buscarVehiculosPorMarca(String marca) {
        return vehiculoRepository.buscarVehiculosPorMarca(marca);
    }

    @Override
    public Page<Vehiculo> paginarVehiculos(int pagina) {
        int cantidadPorPagina = 10;
        Pageable pageable = PageRequest.of(pagina - 1, cantidadPorPagina);
        return vehiculoRepository.paginarVehiculos(pageable);
    }

    @Override
    public Page<Vehiculo> filtrarVehiculosPorCategoria(int page, List<String> categorias, Long numCategorias) {
        int cantidadPorPagina = 10;
        Pageable pageable = PageRequest.of(page - 1, cantidadPorPagina);
        return vehiculoRepository.filtrarVehiculosPorCategoria(pageable, categorias, numCategorias);
    }

    @Override
    public Page<Vehiculo> buscarVehiculosPorInput(int page, String busqueda) {
        int cantidadPorPagina = 10;
        Pageable pageable = PageRequest.of(page - 1, cantidadPorPagina);
        return vehiculoRepository.buscarPorInput(pageable, busqueda);
    }

    @Override
    public Page<Vehiculo> filtrarVehiculosPorBusquedaYCategoria(int page, String busqueda, List<String> categorias, Long numCategorias) {
        int cantidadPorPagina = 10;
        Pageable pageable = PageRequest.of(page - 1, cantidadPorPagina);
        return vehiculoRepository.filtrarPorInputYCategorias(pageable, busqueda, categorias, numCategorias);
    }

    @Override
    public void eliminar(Long id) {
        vehiculoRepository.deleteById(id);
    }
}
