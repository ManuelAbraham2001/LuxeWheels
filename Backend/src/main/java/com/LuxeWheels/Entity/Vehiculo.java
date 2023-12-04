package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;
    @ManyToOne
    @JoinColumn(name = "anio_id")
    private Anio anio;
    private String patente;
    private Double precio;
    private String descripcion;

    @OneToMany(mappedBy = "vehiculo")
    private List<Foto> fotos;

    @OneToMany(mappedBy = "vehiculo")
    @JsonIgnore
    private List<Reserva> reservas;

    public Vehiculo() {
    }

    public Vehiculo(Modelo modelo, Anio anio, String patente, Double precio, String descripcion) {
        this.modelo = modelo;
        this.anio = anio;
        this.patente = patente;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    public Vehiculo(Long id, Modelo modelo, Anio anio, String patente, Double precio) {
        this.id = id;
        this.modelo = modelo;
        this.anio = anio;
        this.patente = patente;
        this.precio = precio;
    }
}
