package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CrearReseniaDTO {
    private String resenia;
    private double calificacion;
    private LocalDate fecha;
}
