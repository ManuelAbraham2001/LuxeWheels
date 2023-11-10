package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String caracteristica;
    private String url;
    @ManyToMany(mappedBy = "caracteristicas")
    @JsonIgnore
    private List<Modelo> modelos;

    @PreRemove
    private void eliminarCaracteristicaDeModelos(){
        if(modelos != null){
            for (Modelo modelo : modelos) {
                modelo.getCaracteristicas().remove(this);
            }
        }
    }

    public Caracteristica() {
    }

    public Caracteristica(String caracteristica, String url) {
        this.caracteristica = caracteristica;
        this.url = url;
    }
}
