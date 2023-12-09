package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UsuarioReservaResponseDTO {
    private UsuarioDTO usuario;
    private List<ReservaUsuarioDTO> reservas;

    public UsuarioReservaResponseDTO() {
    }

    public UsuarioReservaResponseDTO(UsuarioDTO usuario, List<ReservaUsuarioDTO> reservas) {
        this.usuario = usuario;
        this.reservas = reservas;
    }
}
