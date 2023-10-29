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
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoria;

    @OneToMany(mappedBy = "categoria")
    @JsonIgnore
    private List<Vehiculo> vehiculos;

    public Categoria() {
    }

    public Categoria(String categoria) {
        this.categoria = categoria;
    }
}
