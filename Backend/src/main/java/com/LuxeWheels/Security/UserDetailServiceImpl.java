package com.manu.clinica.dental.Security;

import com.manu.clinica.dental.Entity.Usuario;
import com.manu.clinica.dental.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Usuario> userDB = repo.findByUsername(username);

        List<GrantedAuthority> roles = userDB.get().getRoles().stream().map(r -> new SimpleGrantedAuthority(r)).collect(Collectors.toList());

        return userDB.map(user -> new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), roles)).orElse(null);

    }
}
