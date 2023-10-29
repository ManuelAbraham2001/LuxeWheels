package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyExistException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;

public interface UsuarioService {
    Usuario crear(Usuario usuario) throws RolNotFoundException, UsuarioNotFoundException, UsuarioAlreadyExistException;

    Usuario listarUsuario(Long id) throws UsuarioNotFoundException;

    void actualizarUsuario(Usuario usuario) throws UsuarioNotFoundException;

    void eliminarUsuario(Long id) throws UsuarioNotFoundException;
}
