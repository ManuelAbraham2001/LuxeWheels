package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearVehiculoDTO;
import com.LuxeWheels.Dto.EditarVehiculoDTO;
import com.LuxeWheels.Dto.ReseniasVehiculoDTO;
import com.LuxeWheels.Entity.Marca;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Exceptions.PatenteAlreadyExistException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VehiculoService {
    Vehiculo crear(CrearVehiculoDTO vehiculoDTO, MultipartFile[] fotos);
    List<Vehiculo> listarTodo();
    Optional<Vehiculo> buscarVehiculoPorId(Long id);
    List<Vehiculo> buscarVehiculosPorMarca(String marca);
    Page<Vehiculo> paginarVehiculos(int pagina);
    Page<Vehiculo> filtrarVehiculosPorCategoria(int pagina, List<String> categorias, Long numCategorias);
    Page<Vehiculo> buscarVehiculosPorInput(int pagina, String busqueda);
    Page<Vehiculo> filtrarVehiculosPorBusquedaYCategoria(int pagina, String busqueda, List<String> categorias, Long numCategorias);
    Page<Vehiculo> buscarPorFecha(int pagina, String busqueda, LocalDate inicio, LocalDate fin);
    List<ReseniasVehiculoDTO> listarResenias(Long id, int page);
    void editar(EditarVehiculoDTO vehiculoDTO, Long id, List<MultipartFile> fotos) throws IOException, PatenteAlreadyExistException;
    void eliminar(Long id);
}
