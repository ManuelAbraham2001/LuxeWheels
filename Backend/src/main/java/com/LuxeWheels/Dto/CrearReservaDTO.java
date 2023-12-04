package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CrearReservaDTO {
    private LocalDate inicio;
    private LocalDate fin;
}
