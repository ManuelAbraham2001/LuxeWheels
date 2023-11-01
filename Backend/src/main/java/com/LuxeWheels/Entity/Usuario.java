package com.LuxeWheels.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private LocalDate fechaNacimiento;
    private int telefono;
    private String documento;
    @ManyToMany
    @JoinTable(
            name = "usuario_rol",
            joinColumns = {@JoinColumn(
                    name = "usuario_id"
            )},
            inverseJoinColumns = {@JoinColumn(
                    name = "rol_id"
            )}
    )
    private Set<Rol> roles = new HashSet();

    public Usuario() {
    }

    public Usuario(String nombre, String apellido, String email, String password, LocalDate fechaNacimiento, int telefono, String documento, Set<Rol> roles) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.documento = documento;
        this.roles = roles;
    }

    public Usuario(Long id, String nombre, String apellido, String email, String password, LocalDate fechaNacimiento, int telefono, String documento, Set<Rol> roles) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.documento = documento;
        this.roles = roles;
    }

}
