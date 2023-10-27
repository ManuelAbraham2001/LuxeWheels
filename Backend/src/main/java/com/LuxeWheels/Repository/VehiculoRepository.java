package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculoService extends JpaRepository<Vehiculo, Long> {
}
