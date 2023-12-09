package com.LuxeWheels.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReseniasVehiculoDTO {
    private String usuario;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fecha;
    private double calificacion;
    private String resenia;

    public ReseniasVehiculoDTO() {
    }

    public ReseniasVehiculoDTO(String usuario, LocalDate fecha, double calificacion, String resenia) {
        this.usuario = usuario;
        this.fecha = fecha;
        this.calificacion = calificacion;
        this.resenia = resenia;
    }
}
