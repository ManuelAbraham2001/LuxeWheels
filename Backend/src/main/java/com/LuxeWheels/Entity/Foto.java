package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    @ManyToOne
    @JoinColumn(name = "vehiculo_id")
    @JsonIgnore
    private Vehiculo vehiculo;

    public Foto() {
    }

    public Foto(String url, Vehiculo vehiculo) {
        this.url = url;
        this.vehiculo = vehiculo;
    }

    public Foto(Long id, String url) {
        this.id = id;
        this.url = url;
    }

    public Foto(String url) {
        this.url = url;
    }
}
