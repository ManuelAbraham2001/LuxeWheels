package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Reserva;
import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Entity.Vehiculo;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByVehiculo(Vehiculo vehiculo);
    Page<Reserva> findByUsuario(Usuario usuario, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Reserva r SET r.estado = false WHERE r.cierre < CURRENT_DATE")
    void actualizarEstadoReservasVencidas();
}
