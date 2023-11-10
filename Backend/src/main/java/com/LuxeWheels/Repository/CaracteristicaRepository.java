package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
    Caracteristica findByCaracteristica(String caracteristica);
}
