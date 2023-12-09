package com.LuxeWheels.Dto;

import com.LuxeWheels.Entity.Rol;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaNacimiento;
    private int telefono;
    private String documento;
    private Set<Rol> roles = new HashSet();

    public UsuarioDTO() {
    }

    public UsuarioDTO(Long id, String nombre, String apellido, String email, LocalDate fechaNacimiento, int telefono, String documento, Set<Rol> roles) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.documento = documento;
        this.roles = roles;
    }
}
