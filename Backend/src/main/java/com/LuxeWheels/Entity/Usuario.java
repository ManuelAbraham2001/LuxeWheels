package com.LuxeWheels.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
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

    public Long getId() {
        return this.id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public LocalDate getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    public int getTelefono() {
        return this.telefono;
    }

    public String getDocumento() {
        return this.documento;
    }

    public Set<Rol> getRoles() {
        return this.roles;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public void setNombre(final String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(final String apellido) {
        this.apellido = apellido;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public void setFechaNacimiento(final LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public void setTelefono(final int telefono) {
        this.telefono = telefono;
    }

    public void setDocumento(final String documento) {
        this.documento = documento;
    }

    public void setRoles(final Set<Rol> roles) {
        this.roles = roles;
    }
}
