package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.PromedioCalificacionVehiculo;
import com.LuxeWheels.Entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromedioCalificacionVehiculoRepository extends JpaRepository<PromedioCalificacionVehiculo, Long> {
    Optional<PromedioCalificacionVehiculo> findByVehiculo(Vehiculo vehiculo);
}
