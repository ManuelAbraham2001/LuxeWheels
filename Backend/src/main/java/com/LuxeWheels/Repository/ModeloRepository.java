package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Modelo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    @Query("SELECT m FROM Modelo m WHERE m.modelo = :modelo")
    Modelo findByModelo(String modelo);
    @Query("SELECT m FROM Modelo m")
    Page<Modelo> paginarModelos(Pageable page);

    @Query("SELECT CONCAT(m.modelo, ' ', ma.marca) FROM Modelo m JOIN m.marca ma")
    List<String> feedBackOptions();
}
