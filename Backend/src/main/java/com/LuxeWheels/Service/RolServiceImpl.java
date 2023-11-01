package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyAdmin;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Repository.RolRepository;
import com.LuxeWheels.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UsuarioServiceImpl usuarioService;

    public Rol crear(String nombre) {
        return rolRepository.save(new Rol(nombre));
    }

    public Rol getRolByNombre(String nombre) throws RolNotFoundException {
        return rolRepository.getRolByName(nombre).orElseThrow(() -> new RolNotFoundException("El rol no existe"));
    }
    @Override
    public void agregarOeliminarAdmin(Long id, boolean isAdmin) throws UsuarioNotFoundException, RolNotFoundException, UsuarioAlreadyAdmin {

        Usuario usuario = usuarioService.listarUsuario(id);
        Rol admin = rolRepository.getRolByName("ROLE_ADMIN").orElseThrow(() -> new RolNotFoundException("Rol no encontrado"));
        boolean isAdminAlreadyAssigned = usuario.getRoles().contains(admin);

        if (!isAdmin && !isAdminAlreadyAssigned) {
            usuario.getRoles().add(admin);
        } else if (isAdmin && isAdminAlreadyAssigned) {
            usuario.getRoles().remove(admin);
        } else {
            throw new UsuarioAlreadyAdmin("El usuario ya es administrador o no es administrador");
        }

        usuarioService.actualizarUsuario(usuario);
    }
}
