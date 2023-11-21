package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CrearModeloDTO {
    private String modelo;
    private List<String> categorias;
    private String marca;
    private List<String> caracteristicas;
    public CrearModeloDTO() {
    }
}
