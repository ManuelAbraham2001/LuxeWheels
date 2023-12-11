import React, { useEffect, useState } from 'react'
import './styles/ListVehicles.css'
import Paginacion from './Paginacion';
import LoadingSpinner from './LoadingSpinner';
import AdminAddVehicleForm from './AdminAddVehicleForm'

const AdminListVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, currentPage] = useState(1)
    const [totalElements, setTotalElements] = useState(0)
    const [vehicle, setVehicle] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        getVehicles()
    }, [page])

    const getVehicles = () => {
        fetch(`http://3.135.246.162/api/vehiculos?page=${page}`, {
            method: "GET",
          })
          .then(res => res.json())
          .then(data => {
              setVehicles(data.content);
              setIsLoading(false); 
              setTotalElements(data.totalElements)
          })
          .catch(error => {
              console.error(error);
              setIsLoading(false); 
          });
    }

    const handleEliminar = id => {

        const isConfirmed = confirm("Estas seguro que deseas eliminar el auto?")

        if(isConfirmed){
            fetch(`http://3.135.246.162/api/vehiculos/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + token
                }
            }).then(() => getVehicles())
        }else{
            return;
        }
    }

    const handleEditar  = vehicle => {
        setVehicle(vehicle)
        setIsEdit(true)
    }

    
    return (
        <>
            <div className="list">
                {isEdit ? 
                    <div className="overlay">
                        <AdminAddVehicleForm vehicle={vehicle} isEdit={isEdit} setIsEdit={setIsEdit} id={vehicle.id}/>
                    </div> : null
                }
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
                        <LoadingSpinner/>
                    ) : (
                        vehicles.map(v => (
                            <div className='vehicle-properties' key={v.id}>
                                <div>
                                    <span>{v.id}</span>
                                </div>
                                <div>
                                    <span>{v.modelo.marca.marca + " " + v.modelo.modelo + " " + v.anio.anio}</span>
                                </div>
                                <div className='vehicle-properties-actions'>
                                    <button onClick={() => handleEliminar(v.id)}>Eliminar</button>
                                    <button onClick={() => handleEditar(v)}>Edtiar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <Paginacion totalItems={totalElements} itemsPerPage={10} currentPage={currentPage} page={page}></Paginacion>
            </div>
        </>
    )
}

export default AdminListVehicles
