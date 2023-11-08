import React, { useEffect, useState } from 'react'
import './styles/ListVehicles.css'

const AdminListVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        fetch("http://3.135.246.162/api/vehiculos", {
            method: "GET",
          })
          .then(res => res.json())
          .then(data => {
              setVehicles(data);
              setIsLoading(false); 
          })
          .catch(error => {
              console.error(error);
              setIsLoading(false); 
          });
    }, [])

    const handleEliminar = id => {

        const isConfirmed = confirm("Estas seguro que deseas eliminar el auto?")

        if(isConfirmed){
            fetch(`http://3.135.246.162/api/vehiculos/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + token
                }
            })
        }else{
            return;
        }
    }

    
    return (
        <>
            <div className="list">
                <div className='vehicle-list'>
                    <div>
                        <span>ID</span>
                    </div>
                    <div>
                        <span>Vehiculo</span>
                    </div>
                    <div>
                        <span>Acciones</span>
                    </div>
                </div>
                <div className="vechicle-card">
                    {isLoading ? ( 
                        <div>Cargando...</div>
                    ) : (
                        vehicles.map(v => (
                            <div className='vehicle-properties' key={v.id}>
                                <div>
                                    <span>{v.id}</span>
                                </div>
                                <div>
                                    <span>{v.modelo.marca.marca + " " + v.modelo.modelo + " " + v.anio.anio}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleEliminar(v.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminListVehicles
