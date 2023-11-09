import React from 'react'
import "./styles/Admin.css"

const Admin = () => {
    return (
        <>
            <div className="admin-main">
                <div className="admin-menu">
                    <a href="/admin/addproduct">
                        <div className="menu-option">
                            <h2>Agregar Vehiculo</h2>
                        </div>
                    </a>
                    <a href="/admin/ListVehicles">
                        <div className="menu-option">
                            <h2>Ver Vehiculos</h2>
                        </div>
                    </a>
                    <a href="/admin/listUsers">
                        <div className="menu-option">
                            <h2>Ver Usuarios</h2>
                        </div>
                    </a>
                    <a href="/admin/addModelo">
                        <div className="menu-option">
                            <h2>Crear Modelo</h2>
                        </div>
                    </a>
                </div>
                <div className="mobile-device">
                    <span>Sitio no disponible</span>
                </div>
            </div>
        </>
    )
}

export default Admin