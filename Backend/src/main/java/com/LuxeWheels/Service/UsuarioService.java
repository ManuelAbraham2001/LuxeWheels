package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.UsuarioDTO;
import com.LuxeWheels.Dto.UsuarioReservaResponseDTO;
import com.LuxeWheels.Entity.Reserva;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyExistException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;

import java.util.List;

public interface UsuarioService {
    Usuario crear(Usuario usuario) throws RolNotFoundException, UsuarioAlreadyExistException;

    Usuario listarUsuario(Long id) throws UsuarioNotFoundException;

    UsuarioDTO listarUsuarioPorEmail(String email) throws UsuarioNotFoundException;

    List<UsuarioDTO> listarUsuarios();

    void actualizarUsuario(Usuario usuario) throws UsuarioNotFoundException;

    void eliminarUsuario(Long id) throws UsuarioNotFoundException;

    void toggleFavorito(Long id, String token);

    List<Vehiculo> listarFavoritos(String token);

    UsuarioReservaResponseDTO listarReservasUsuario(String token) throws UsuarioNotFoundException;
}
