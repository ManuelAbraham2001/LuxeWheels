package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearReseniaDTO;
import com.LuxeWheels.Entity.*;
import com.LuxeWheels.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReseniaServiceImpl implements ReseniaService{

    @Autowired
    private ReseniaRepository repository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PromedioCalificacionVehiculoRepository promedioCalificacionVehiculoRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Override
    public Resenia crear(CrearReseniaDTO reseniaDTO, Long id) {

        Reserva reserva = reservaRepository.findById(id).orElseThrow();

        Optional<PromedioCalificacionVehiculo> promedioCalificacionVehiculo = promedioCalificacionVehiculoRepository.findByVehiculo(reserva.getVehiculo());

        if (promedioCalificacionVehiculo.isEmpty()) {
            PromedioCalificacionVehiculo newPromedioCalificacionVehiculo = new PromedioCalificacionVehiculo(reserva.getVehiculo(), 1, reseniaDTO.getCalificacion(), reseniaDTO.getCalificacion());
            promedioCalificacionVehiculoRepository.save(newPromedioCalificacionVehiculo);
        } else {
            int totalCalificaciones = promedioCalificacionVehiculo.get().getTotalCalificaciones() + 1;
            double sumaCalificaciones = promedioCalificacionVehiculo.get().getSumaCalificaciones() + reseniaDTO.getCalificacion();
            double nuevoPromedio = sumaCalificaciones/ totalCalificaciones;

            promedioCalificacionVehiculo.get().setTotalCalificaciones(totalCalificaciones);
            promedioCalificacionVehiculo.get().setPromedioCalificacaiones(nuevoPromedio);
            promedioCalificacionVehiculoRepository.save(promedioCalificacionVehiculo.get());
        }

        return repository.save(new Resenia(reseniaDTO.getResenia(), reseniaDTO.getCalificacion(), reseniaDTO.getFecha(), reserva));
    }

    @Override
    public Page<Resenia> listar(Long id, int pagina) {
        int cantidadPorPagina = 5;
        Pageable pageable = PageRequest.of(pagina - 1, cantidadPorPagina);
        return repository.listar(id, pageable);
    }
}
