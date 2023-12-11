package com.LuxeWheels.Dto;

import com.LuxeWheels.Entity.Resenia;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservaUsuarioDTO {
    private Long id;
    private Long idVehiculo;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate inicio;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate cierre;
    private boolean estado;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaDeReserva;
    private String vehiculo;
    private Resenia resenia;

    public ReservaUsuarioDTO() {
    }

    public ReservaUsuarioDTO(Long id, Long idVehiculo, LocalDate inicio, LocalDate cierre, boolean estado, LocalDate fechaDeReserva, String vehiculo, Resenia resenia) {
        this.id = id;
        this.idVehiculo = idVehiculo;
        this.inicio = inicio;
        this.cierre = cierre;
        this.estado = estado;
        this.fechaDeReserva = fechaDeReserva;
        this.vehiculo = vehiculo;
        this.resenia = resenia;
    }
}
