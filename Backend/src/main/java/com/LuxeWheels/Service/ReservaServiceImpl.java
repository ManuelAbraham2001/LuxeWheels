package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.CrearReservaDTO;
import com.LuxeWheels.Entity.Reserva;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Repository.ReservaRepository;
import com.LuxeWheels.Repository.UsuarioRepository;
import com.LuxeWheels.Repository.VehiculoRepository;
import com.LuxeWheels.Security.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservaServiceImpl implements ReservaService{

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private JwtUtil jwtUtil;

    private boolean fechaDisponible(LocalDate inicio, LocalDate fin, Vehiculo vehiculo){
        List<Reserva> reservas = reservaRepository.findByVehiculo(vehiculo);

        for (Reserva r : reservas) {
            if(r.getInicio().isBefore(fin) && r.getCierre().isAfter((inicio))){
                return false;
            }
        }

        return true;
    }

    @Override
    public Reserva crearReserva(CrearReservaDTO reservaDTO, Long id, String token) throws MessagingException {

        Vehiculo vehiculo = vehiculoRepository.findById(id).orElseThrow();

        if(!fechaDisponible(reservaDTO.getInicio(), reservaDTO.getFin(), vehiculo)){
            return null;
        }

        String email = jwtUtil.getClaims(token).getSubject();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();

        Reserva reserva = reservaRepository.save(new Reserva(reservaDTO.getInicio(), reservaDTO.getFin(), usuario, vehiculo));

        mailService.sendEmailConfirmacionDeReserva(usuario ,vehiculo, "Confirmacion de reserva");

        return reserva;
    }

    @Override
    public List<Reserva> listarFechas(Long id) {

        Vehiculo vehiculo = vehiculoRepository.findById(id).orElseThrow();

        return reservaRepository.findByVehiculo(vehiculo);
    }

    @Override
    @Transactional
    public void actualizarEstadoDeLasReservas() {
        reservaRepository.actualizarEstadoReservasVencidas();
    }
}
