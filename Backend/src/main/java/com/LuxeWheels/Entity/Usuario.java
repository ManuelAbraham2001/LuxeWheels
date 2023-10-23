package com.LuxeWheels.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
public class Usuario {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private LocalDate fechaNacimiento;
    private int telefono;
    private String documento;
    @OneToOne
    private Rol rol;
}
