package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Vehiculo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
    @Query("SELECT v FROM Vehiculo v WHERE v.id = :id")
    Optional<Vehiculo> buscarVehiculoPorId(Long id);
    @Query("SELECT v FROM Vehiculo v JOIN v.modelo m JOIN m.marca ma WHERE ma.marca = :marca")
    List<Vehiculo> buscarVehiculosPorMarca(String marca);
    @Query("SELECT v FROM Vehiculo v")
    Page<Vehiculo> paginarVehiculos(Pageable pageable);
    @Query("SELECT v FROM Vehiculo v JOIN v.modelo m JOIN m.categorias ca WHERE ca.categoria IN :categorias GROUP BY v HAVING COUNT(DISTINCT ca) = :numCategorias")
    Page<Vehiculo> filtrarVehiculosPorCategoria(Pageable pageable, @Param("categorias") List<String> categorias, @Param("numCategorias") Long numCategorias);
    @Query("SELECT v FROM Vehiculo v JOIN v.modelo m JOIN m.marca ma WHERE LOWER(CONCAT(ma.marca, ' ', m.modelo)) LIKE LOWER(concat('%', :term, '%'))")
    Page<Vehiculo> buscarPorInput(Pageable pageable, String term);
}
