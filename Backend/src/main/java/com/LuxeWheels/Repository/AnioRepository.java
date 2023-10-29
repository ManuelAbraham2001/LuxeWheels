package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Anio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnioRepository extends JpaRepository<Anio, Long> {
    @Query("SELECT a FROM Anio a WHERE a.anio = :anio")
    Anio findByAnio(int anio);
}
