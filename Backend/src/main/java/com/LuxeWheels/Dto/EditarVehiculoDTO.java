package com.LuxeWheels.Dto;

import com.LuxeWheels.Entity.Caracteristica;
import com.LuxeWheels.Entity.Foto;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class EditarVehiculoDTO implements Serializable {
    private String modelo;
    private int anio;
    private String categoria;
    private String patente;
    private double precio;
    private String descripcion;

    private List<Foto> fotosBorradas;

    public EditarVehiculoDTO() {
    }

    public EditarVehiculoDTO(String modelo, int anio, String categoria, String patente, double precio, String descripcion) {
        this.modelo = modelo;
        this.anio = anio;
        this.categoria = categoria;
        this.patente = patente;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    //    private MultipartFile[] fotos;
}
