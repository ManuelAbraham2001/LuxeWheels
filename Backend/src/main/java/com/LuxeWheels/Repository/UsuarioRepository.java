package com.LuxeWheels.Repository;

import com.LuxeWheels.Entity.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<String> findDocumentoByDocumento(String documento);
    Optional<String> findEmailByEmail(String email);
}
