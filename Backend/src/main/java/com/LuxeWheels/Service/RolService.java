package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyAdmin;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;

public interface RolService {
    Rol crear(String nombre);
    Rol getRolByNombre(String nombre) throws RolNotFoundException;

    void agregarOeliminarAdmin(Long id, boolean isAdmin) throws UsuarioNotFoundException, RolNotFoundException, UsuarioAlreadyAdmin;
}
