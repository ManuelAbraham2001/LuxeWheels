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
public class Resenia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String resenia;
    private double calificacion;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fecha;

    @OneToOne
    @JoinColumn(name = "reserva_id", unique = true)
    @JsonIgnore
    private Reserva reserva;

    public Resenia() {
    }

    public Resenia(Long id, String resenia, double calificacion, LocalDate fecha, Reserva reserva) {
        this.id = id;
        this.resenia = resenia;
        this.calificacion = calificacion;
        this.fecha = fecha;
        this.reserva = reserva;
    }

    public Resenia(String resenia, double calificacion, LocalDate fecha, Reserva reserva) {
        this.resenia = resenia;
        this.calificacion = calificacion;
        this.fecha = fecha;
        this.reserva = reserva;
    }
}
