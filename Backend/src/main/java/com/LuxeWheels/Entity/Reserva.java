package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate inicio;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate cierre;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnore
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "vehiculo_id")
    @JsonIgnore
    private Vehiculo vehiculo;

    private boolean estado;

    public Reserva() {
    }

    public Reserva(LocalDate inicio, LocalDate cierre, Usuario usuario, Vehiculo vehiculo) {
        this.inicio = inicio;
        this.cierre = cierre;
        this.usuario = usuario;
        this.vehiculo = vehiculo;
    }
}
