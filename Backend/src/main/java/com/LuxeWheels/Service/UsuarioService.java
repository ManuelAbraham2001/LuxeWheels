//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Usuario;
import com.LuxeWheels.Exceptions.RolNotFoundException;
import com.LuxeWheels.Exceptions.UsuarioNotFoundException;

public interface UsuarioService {
    Usuario crear(Usuario usuario) throws RolNotFoundException;

    Usuario listarUsuario(Long id) throws UsuarioNotFoundException;

    void actualizarUsuario(Usuario usuario) throws UsuarioNotFoundException;

    void eliminarUsuario(Long id) throws UsuarioNotFoundException;
}
