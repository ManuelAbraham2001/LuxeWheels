package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Vehiculo;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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
    @Query("SELECT v FROM Vehiculo v JOIN v.modelo m JOIN m.marca ma JOIN m.categorias ca WHERE LOWER(CONCAT(ma.marca, ' ', m.modelo)) LIKE LOWER(concat('%', :term, '%')) and ca.categoria IN :categorias GROUP BY v HAVING COUNT(DISTINCT ca) = :numCategorias")
    Page<Vehiculo> filtrarPorInputYCategorias(Pageable pageable, String term, @Param("categorias") List<String> categorias, @Param("numCategorias") Long numCategorias);
    @Query("SELECT v FROM Vehiculo v JOIN v.modelo m JOIN m.marca ma WHERE LOWER(CONCAT(ma.marca, ' ', m.modelo)) LIKE LOWER(concat('%', :term, '%')) AND v.id NOT IN (SELECT r.vehiculo.id FROM Reserva r WHERE (:inicio BETWEEN r.inicio AND r.cierre) OR (:fin BETWEEN r.inicio AND r.cierre) OR (r.inicio BETWEEN :inicio AND :fin) OR (r.cierre BETWEEN :inicio AND :fin))")
    Page<Vehiculo> buscarPorFecha(Pageable pageable, String term, LocalDate inicio, LocalDate fin);

    boolean existsByPatente(String patente);
}
