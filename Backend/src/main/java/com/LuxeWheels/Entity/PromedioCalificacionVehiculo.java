package com.LuxeWheels.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "promedio_calificacion_vehiculo")
public class PromedioCalificacionVehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "vehiculo_id", unique = true)
    @JsonIgnore
    private Vehiculo vehiculo;
    private int totalCalificaciones;
    private double promedioCalificacaiones;
    private double sumaCalificaciones;

    public PromedioCalificacionVehiculo() {
    }

    public PromedioCalificacionVehiculo(Vehiculo vehiculo, int totalCalificaciones, double promedioCalificacaiones, double sumaCalificaciones) {
        this.vehiculo = vehiculo;
        this.totalCalificaciones = totalCalificaciones;
        this.promedioCalificacaiones = promedioCalificacaiones;
        this.sumaCalificaciones = sumaCalificaciones;
    }
}
