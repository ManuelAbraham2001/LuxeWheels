//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.LuxeWheels;

import com.LuxeWheels.Entity.Rol;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Repository.RolRepository;
import com.LuxeWheels.Repository.UsuarioRepository;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void run(String... args) throws Exception {
        Rol admin = new Rol("ROLE_ADMIN");
        Rol user = new Rol("ROLE_USER");
        rolRepository.save(admin);
        rolRepository.save(user);
        Set<Rol> roles = new HashSet();
        Rol rolAdminDB = rolRepository.getRolByName("ROLE_ADMIN").orElseThrow();
        Rol rolUserDB = rolRepository.getRolByName("ROLE_USER").orElseThrow();
        roles.add(rolAdminDB);
        roles.add(rolUserDB);
        Usuario userAdmin = new Usuario("admin", "admin", "admin@email.com", passwordEncoder.encode("admin"), LocalDate.now(), 1122334455, "43434343", roles);
        this.usuarioRepository.save(userAdmin);
    }
}
