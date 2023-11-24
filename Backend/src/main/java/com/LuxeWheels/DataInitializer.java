package com.LuxeWheels;

import com.LuxeWheels.Entity.*;
import com.LuxeWheels.Repository.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

//@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AnioRepository anioRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private MarcaRepository marcaRepository;
    @Autowired
    private ModeloRepository modeloRepository;
    @Autowired
    private VehiculoRepository vehiculoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void run(String... args) throws Exception {

        System.out.println("Iniciando DataInitializer...");

        Rol admin = new Rol("ROLE_ADMIN");
        Rol user = new Rol("ROLE_USER");

        rolRepository.save(admin);
        rolRepository.save(user);

        Set<Rol> roles = new HashSet<>();
        Rol rolAdminDB = rolRepository.getRolByName("ROLE_ADMIN").orElseThrow();
        Rol rolUserDB = rolRepository.getRolByName("ROLE_USER").orElseThrow();

        roles.add(rolAdminDB);
        roles.add(rolUserDB);

        usuarioRepository.save(new Usuario("admin", "admin", "admin@email.com", passwordEncoder.encode("admin"), LocalDate.now(), 1122334455, "43434343", roles));

        for(int i = 2000; i <= 2023; i++){
            anioRepository.save(new Anio(i));
        }

        String[] categorias = {"Compactos", "Sedanes", "Deportivos", "Coupes", "Camionetas", "Electricos", "Hibridos"};

        for (String categoria : categorias) {
            categoriaRepository.save(new Categoria(categoria));
        }

        String[] marcas = {"Ford", "Volkswagen", "Fiat", "Peugeot", "Chevrolet", "Toyota", "Tesla"};

        for (String marca : marcas) {
            marcaRepository.save(new Marca(marca));
        }

        Categoria compacto = categoriaRepository.findByCategoria("Compactos");
        Categoria electrico = categoriaRepository.findByCategoria("Electricos");
        Marca tesla = marcaRepository.findByMarca("tesla");
        Marca fiat = marcaRepository.findByMarca("fiat");
        List<Categoria> categoriasTesla = new ArrayList<>();
        List<Categoria> categoriasFiat = new ArrayList<>();
        categoriasTesla.add(compacto);
        categoriasTesla.add(electrico);
        categoriasFiat.add(compacto);
        Modelo modelo = new Modelo("Model S", tesla, categoriasTesla);
        Modelo modelo1 = new Modelo("Uno", fiat, categoriasFiat);
        modeloRepository.save(modelo);
        modeloRepository.save(modelo1);
//
//        vehiculoRepository.save(new Vehiculo(uno, anio, "abe123", 2000d, "auto 1"));
//        vehiculoRepository.save(new Vehiculo(modelS, anio, "abx123", 3000d, "auto 2"));

        System.out.println("DataInitializer finalizado.");
    }
}
