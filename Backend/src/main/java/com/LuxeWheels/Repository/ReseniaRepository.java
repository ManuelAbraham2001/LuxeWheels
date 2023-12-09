package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Resenia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReseniaRepository extends JpaRepository<Resenia, Long> {
    @Query("SELECT r FROM Resenia r JOIN r.reserva rv WHERE rv.vehiculo.id = :reservaID")
    Page<Resenia> listar(Long reservaID, Pageable pagina);
}
