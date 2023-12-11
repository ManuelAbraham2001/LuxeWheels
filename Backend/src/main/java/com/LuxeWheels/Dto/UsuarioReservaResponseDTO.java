package com.LuxeWheels.Dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class UsuarioReservaResponseDTO {
    private UsuarioDTO usuario;
    private Page<ReservaUsuarioDTO> reservas;

    public UsuarioReservaResponseDTO() {
    }

    public UsuarioReservaResponseDTO(UsuarioDTO usuario, Page<ReservaUsuarioDTO> reservas) {
        this.usuario = usuario;
        this.reservas = reservas;
    }
}
