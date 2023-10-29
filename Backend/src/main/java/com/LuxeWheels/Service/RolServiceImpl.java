package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository rolRepository;

    public Rol crear(String nombre) {
        return rolRepository.save(new Rol(nombre));
    }

    public Rol getRolByNombre(String nombre) throws RolNotFoundException {
        return rolRepository.getRolByName(nombre).orElseThrow(() -> new RolNotFoundException("El rol no existe"));
    }
}
