//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Repository.RolRepository;
import com.LuxeWheels.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario crear(Usuario usuario) throws RolNotFoundException {
        usuario.getRoles().add(rolRepository.getRolByName("ROLE_USER").orElseThrow(() -> new RolNotFoundException("El rol no existe")));
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public Usuario listarUsuario(Long id) throws UsuarioNotFoundException {
        return buscarUsuarioPorId(id);
    }

    public void actualizarUsuario(Usuario usuario) throws UsuarioNotFoundException {
        buscarUsuarioPorId(usuario.getId());
        usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) throws UsuarioNotFoundException {
        usuarioRepository.deleteById(buscarUsuarioPorId(id).getId());
    }

    private Usuario buscarUsuarioPorId(Long id) throws UsuarioNotFoundException {
        return usuarioRepository.findById(id).orElseThrow(() -> new UsuarioNotFoundException("El usuario no existe"));
    }
}
