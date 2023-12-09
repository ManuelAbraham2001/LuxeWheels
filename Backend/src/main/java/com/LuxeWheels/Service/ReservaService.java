package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearReservaDTO;
import com.LuxeWheels.Dto.ReseniasVehiculoDTO;
import com.LuxeWheels.Entity.Reserva;
import com.LuxeWheels.Exceptions.ConflictDatesException;
import jakarta.mail.MessagingException;

import java.util.List;

public interface ReservaService {
    Reserva crearReserva(CrearReservaDTO reservaDTO, Long id, String token) throws MessagingException, ConflictDatesException;
    List<Reserva> listarFechas(Long id);
    void actualizarEstadoDeLasReservas();
}
