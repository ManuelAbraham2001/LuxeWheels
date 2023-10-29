package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Anio;
import com.LuxeWheels.Entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    @Query("SELECT m FROM Marca m WHERE m.marca = :marca")
    Marca findByMarca(String marca);
}
