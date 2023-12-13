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
    private String descripcion;
    private String url;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "categoria_modelo",
            joinColumns = @JoinColumn(name = "categoria_id"),
            inverseJoinColumns = @JoinColumn(name = "modelo_id"))
    @JsonIgnore
    private List<Modelo> modelos;

    public Categoria() {
    }

    public Categoria(String categoria) {
        this.categoria = categoria;
    }

    public Categoria(String categoria, String descripcion) {
        this.categoria = categoria;
        this.descripcion = descripcion;
    }

    public Categoria(String categoria, String descripcion, String url) {
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.url = url;
    }
}
