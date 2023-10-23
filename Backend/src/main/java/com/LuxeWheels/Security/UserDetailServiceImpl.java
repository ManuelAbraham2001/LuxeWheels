package com.LuxeWheels.Security;

import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<Usuario> userDB = repo.findByEmail(email);

        List<GrantedAuthority> roles = userDB.get().getRoles().stream().map(r -> new SimpleGrantedAuthority(r.getRol())).collect(Collectors.toList());

        return userDB.map(user -> new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), roles)).orElse(null);

    }
}
