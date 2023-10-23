package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Rol;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    @Query("SELECT r FROM Rol r WHERE r.rol = :name")
    Optional<Rol> getRolByName(String name);
}
