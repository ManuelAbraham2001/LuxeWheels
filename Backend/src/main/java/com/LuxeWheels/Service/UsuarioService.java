package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.UsuarioDTO;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyExistException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Usuario crear(Usuario usuario) throws RolNotFoundException, UsuarioAlreadyExistException;

    Usuario listarUsuario(Long id) throws UsuarioNotFoundException;

    UsuarioDTO listarUsuarioPorEmail(String email) throws UsuarioNotFoundException;

    List<UsuarioDTO> listarUsuarios();

    void actualizarUsuario(Usuario usuario) throws UsuarioNotFoundException;

    void eliminarUsuario(Long id) throws UsuarioNotFoundException;
}
