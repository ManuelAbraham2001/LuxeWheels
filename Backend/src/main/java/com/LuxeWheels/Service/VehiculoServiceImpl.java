package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Dto.EditarVehiculoDTO;
import com.LuxeWheels.Dto.ReseniasVehiculoDTO;
import com.LuxeWheels.Entity.*;
import com.LuxeWheels.Exceptions.PatenteAlreadyExistException;
import com.LuxeWheels.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
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
    private ReseniaRepository reseniaRepository;

    @Autowired
    private FotoRepository fotoRepository;

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
    public Page<Vehiculo> buscarPorFecha(int pagina, String busqueda, LocalDate inicio, LocalDate fin) {
        int cantidadPorPagina = 10;
        Pageable pageable = PageRequest.of(pagina - 1, cantidadPorPagina);
        return vehiculoRepository.buscarPorFecha(pageable,busqueda, inicio, fin);
    }

    @Override
    public List<ReseniasVehiculoDTO> listarResenias(Long id, int pagina) {

        int cantidadPorPagina = 5;
        Pageable pageable = PageRequest.of(pagina - 1, cantidadPorPagina);

        List<ReseniasVehiculoDTO> reseniasDTO = new ArrayList<>();
        Page<Resenia> resenias = reseniaRepository.listar(id, pageable);

        if(resenias.getTotalElements() > 0){
            for (Resenia r : resenias) {
                String usuario = r.getReserva().getUsuario().getNombre() + " " + r.getReserva().getUsuario().getApellido();
                ReseniasVehiculoDTO rndto = new ReseniasVehiculoDTO(usuario, r.getFecha(), r.getCalificacion(), r.getResenia());
                reseniasDTO.add(rndto);
            }
        }

        return reseniasDTO;
    }

    @Override
    public void editar(EditarVehiculoDTO vehiculoDTO, Long id, List<MultipartFile> fotos) throws IOException, PatenteAlreadyExistException {
        Vehiculo vehiculo = vehiculoRepository.findById(id).orElseThrow();
        fotoService.eliminarFotosVehiculo(vehiculoDTO.getFotosBorradas());
        if (fotos != null){
            for (MultipartFile f : fotos) {
                Foto foto = fotoService.cargar(f, "image/jpeg");
                foto.setVehiculo(vehiculo);
                fotoRepository.save(foto);
            }
        }
        if(!vehiculo.getModelo().getModelo().equals(vehiculoDTO.getModelo())){
            Modelo modelo = modeloRepository.findByModelo(vehiculoDTO.getModelo());
            vehiculo.setModelo(modelo);
        }
        if(vehiculo.getAnio().getAnio() != vehiculoDTO.getAnio()){
            Anio anio = anioRepository.findByAnio(vehiculoDTO.getAnio());
            vehiculo.setAnio(anio);
        }
        if(!vehiculo.getPatente().equals(vehiculoDTO.getPatente())){
            if(!vehiculoRepository.existsVehiculoByPatente(vehiculoDTO.getPatente())){
                vehiculo.setPatente(vehiculo.getPatente());
            }else{
                throw new PatenteAlreadyExistException("Ya existe un vehiculo con esa patente");
            }
        }
        if(vehiculo.getPrecio() != vehiculoDTO.getPrecio()){
            vehiculo.setPrecio(vehiculoDTO.getPrecio());
        }
        if(!vehiculo.getDescripcion().equals(vehiculoDTO.getDescripcion())){
            vehiculo.setDescripcion(vehiculo.getDescripcion());
        }

        vehiculoRepository.save(vehiculo);

    }

    @Override
    public void eliminar(Long id) {
        vehiculoRepository.deleteById(id);
    }
}
