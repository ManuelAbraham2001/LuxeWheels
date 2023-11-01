//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.UsuarioDTO;
import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyExistException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Repository.RolRepository;
import com.LuxeWheels.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario crear(Usuario usuario) throws RolNotFoundException, UsuarioAlreadyExistException {

        Optional<String> documentoDB = usuarioRepository.findDocumentoByDocumento(usuario.getDocumento());
        if (documentoDB.isPresent()) {
            throw new UsuarioAlreadyExistException("El documento ya está en uso");
        }

        Optional<String> emailDB = usuarioRepository.findEmailByEmail(usuario.getEmail());
        if (emailDB.isPresent()) {
            throw new UsuarioAlreadyExistException("El correo electrónico ya está en uso");
        }

        usuario.getRoles().add(rolRepository.getRolByName("ROLE_USER").orElseThrow(() -> new RolNotFoundException("El rol no existe")));
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public Usuario listarUsuario(Long id) throws UsuarioNotFoundException {
        return buscarUsuarioPorId(id);
    }

    @Override
    public UsuarioDTO listarUsuarioPorEmail(String email) throws UsuarioNotFoundException {

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new UsuarioNotFoundException("No se encontro el usuario"));
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getNombre(), usuario.getApellido(), usuario.getEmail(), usuario.getFechaNacimiento(), usuario.getTelefono(), usuario.getDocumento(), usuario.getRoles());

        return usuarioDTO;
    }

    @Override
    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<UsuarioDTO> usuarioDTOS = new ArrayList<>();
        for (Usuario u : usuarios) {
            UsuarioDTO usuarioDTO = new UsuarioDTO(u.getId(), u.getNombre(), u.getApellido(), u.getEmail(), u.getFechaNacimiento(), u.getTelefono(), u.getDocumento(), u.getRoles());
            usuarioDTOS.add(usuarioDTO);
        }

        return usuarioDTOS;
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
