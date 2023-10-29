package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Anio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int anio;

    @OneToMany(mappedBy = "anio")
    @JsonIgnore
    private List<Vehiculo> vehiculos;

    public Anio() {
    }

    public Anio(int anio) {
        this.anio = anio;
    }
}
