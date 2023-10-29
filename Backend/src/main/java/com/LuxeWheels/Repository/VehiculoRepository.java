package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
    @Query("SELECT v FROM Vehiculo v WHERE v.id = :id")
    Optional<Vehiculo> buscarVehiculoPorId(Long id);
    @Query("SELECT v FROM Vehiculo v JOIN v.modelo m JOIN m.marca ma WHERE ma.marca = :marca")
    List<Vehiculo> buscarVehiculosPorMarca(String marca);
}
