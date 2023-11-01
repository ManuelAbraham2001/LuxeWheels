package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    @Query("SELECT u FROM Usuario u WHERE u.documento = :documento")
    Optional<String> findDocumentoByDocumento(String documento);
    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Optional<String> findEmailByEmail(String email);
}
