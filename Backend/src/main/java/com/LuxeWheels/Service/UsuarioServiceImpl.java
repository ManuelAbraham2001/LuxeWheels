package com.LuxeWheels.Service;

import com.LuxeWheels.Dto.ReservaUsuarioDTO;
import com.LuxeWheels.Dto.UsuarioDTO;
import com.LuxeWheels.Dto.UsuarioReservaResponseDTO;
import com.LuxeWheels.Entity.Reserva;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Entity.Vehiculo;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioAlreadyExistException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;
import com.LuxeWheels.Repository.ReservaRepository;
import com.LuxeWheels.Repository.RolRepository;
import com.LuxeWheels.Repository.UsuarioRepository;
import com.LuxeWheels.Repository.VehiculoRepository;
import com.LuxeWheels.Security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private JwtUtil jwtUtil;

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

    @Override
    public void toggleFavorito(Long id, String token) {
        Claims claims = jwtUtil.getClaims(token);
        String email = claims.getSubject();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        List<Vehiculo> vehiculos = usuario.getFavoritos();
        List<Vehiculo> nuevosFavoritos = new ArrayList<>();

        boolean encontrado = false;

        for (Vehiculo v : vehiculos) {
            if (v.getId().equals(id)) {
                encontrado = true;
            } else {
                nuevosFavoritos.add(v);
            }
        }

        if (!encontrado) {
            Vehiculo vehiculo = vehiculoRepository.findById(id).orElseThrow();
            nuevosFavoritos.add(vehiculo);
        }

        usuario.setFavoritos(nuevosFavoritos);
        usuarioRepository.save(usuario);
    }

    @Override
    public List<Vehiculo> listarFavoritos(String token) {
        Claims claims = jwtUtil.getClaims(token);
        String email = claims.getSubject();

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();

        return usuario.getFavoritos();
    }

    @Override
    public UsuarioReservaResponseDTO listarReservasUsuario(String token, int pagina) throws UsuarioNotFoundException {
        Claims claims = jwtUtil.getClaims(token);
        String email = claims.getSubject();
        int cantPorPage = 5;
        Pageable page = PageRequest.of(pagina - 1, cantPorPage);

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getNombre(), usuario.getApellido(), usuario.getEmail(), usuario.getFechaNacimiento(), usuario.getTelefono(), usuario.getDocumento(), usuario.getRoles());

        Page<Reserva> reservasUsuario = reservaRepository.findByUsuario(usuario, page);

        List<ReservaUsuarioDTO> reservaUsuarioDTOS = new ArrayList<>();

        for (Reserva r : reservasUsuario) {
            String vehiculo = r.getVehiculo().getModelo().getMarca().getMarca() + " " + r.getVehiculo().getModelo().getModelo() + " " + r.getVehiculo().getAnio().getAnio();
            ReservaUsuarioDTO reservaUsuarioDTO = new ReservaUsuarioDTO(r.getId(), r.getVehiculo().getId(), r.getInicio(), r.getCierre(), r.isEstado(), r.getFechaDeReserva(), vehiculo, r.getResenia());
            reservaUsuarioDTOS.add(reservaUsuarioDTO);
        }

        Page<ReservaUsuarioDTO> pageReservaUsuarioDTO = new PageImpl<>(reservaUsuarioDTOS, page, reservasUsuario.getTotalElements());

        return new UsuarioReservaResponseDTO(usuarioDTO, pageReservaUsuarioDTO);
    }


    private Usuario buscarUsuarioPorId(Long id) throws UsuarioNotFoundException {
        return usuarioRepository.findById(id).orElseThrow(() -> new UsuarioNotFoundException("El usuario no existe"));
    }
}
