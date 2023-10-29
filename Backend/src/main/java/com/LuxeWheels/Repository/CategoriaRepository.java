package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    @Query("SELECT c FROM Categoria c WHERE c.categoria = :categoria")
    Categoria findByCategoria(String categoria);
}
