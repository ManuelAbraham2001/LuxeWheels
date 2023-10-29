package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CrearVehiculoDTO implements Serializable {
    private String modelo;
    private int anio;
    private String categoria;
    private String patente;
    private double precio;
    private String descripcion;

    public CrearVehiculoDTO() {
    }

    public CrearVehiculoDTO(String modelo, int anio, String categoria, String patente, double precio, String descripcion) {
        this.modelo = modelo;
        this.anio = anio;
        this.categoria = categoria;
        this.patente = patente;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    //    private MultipartFile[] fotos;
}
