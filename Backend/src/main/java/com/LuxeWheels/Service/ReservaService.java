package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearReservaDTO;
import com.LuxeWheels.Entity.Reserva;
import jakarta.mail.MessagingException;

import java.util.List;

public interface ReservaService {
    Reserva crearReserva(CrearReservaDTO reservaDTO, Long id, String token) throws MessagingException;
    List<Reserva> listarFechas(Long id);

    void actualizarEstadoDeLasReservas();
}
