package com.LuxeWheels.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    private String patente;
    private Double precio;
    private String descripcion;

    public Vehiculo() {
    }

    public Vehiculo(Modelo modelo, Anio anio, Categoria categoria, String patente, Double precio, String descripcion) {
        this.modelo = modelo;
        this.anio = anio;
        this.categoria = categoria;
        this.patente = patente;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    public Vehiculo(Long id, Modelo modelo, Anio anio, Categoria categoria, String patente, Double precio) {
        this.id = id;
        this.modelo = modelo;
        this.anio = anio;
        this.categoria = categoria;
        this.patente = patente;
        this.precio = precio;
    }
}
