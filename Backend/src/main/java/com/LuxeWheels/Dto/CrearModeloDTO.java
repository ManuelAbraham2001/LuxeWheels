package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrearModeloDTO {
    private String modelo;
    private String categoria;
    private String marca;

    public CrearModeloDTO() {
    }
}
