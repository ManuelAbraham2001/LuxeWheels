package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marca;

    @OneToMany(mappedBy = "marca")
    @JsonIgnore
    private List<Modelo> modelos;

    public Marca() {
    }

    public Marca(String marca) {
        this.marca = marca;
    }
}
