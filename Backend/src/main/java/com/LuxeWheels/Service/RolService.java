package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Exceptions.RolNotFoundException;

public interface RolService {
    Rol crear(String nombre);
    Rol getRolByNombre(String nombre) throws RolNotFoundException;
}
