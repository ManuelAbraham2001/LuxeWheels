package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;

    @ManyToOne
    @JoinColumn(name = "marca_id")

    private Marca marca;

    @OneToMany(mappedBy = "modelo")
    @JsonIgnore
    private List<Vehiculo> vehiculos;

    @OneToMany(mappedBy = "modelo")
    private List<Foto> fotos;

    public Modelo() {
    }

    public Modelo(String modelo) {
        this.modelo = modelo;
    }

    public Modelo(String modelo, Marca marca) {
        this.modelo = modelo;
        this.marca = marca;
    }

    public Modelo(String modelo, Marca marca, List<Vehiculo> vehiculos, List<Foto> fotos) {
        this.modelo = modelo;
        this.marca = marca;
        this.vehiculos = vehiculos;
        this.fotos = fotos;
    }
}
