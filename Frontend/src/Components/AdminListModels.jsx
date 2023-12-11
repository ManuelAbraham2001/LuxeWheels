import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Paginacion from './Paginacion'
import LoadingSpinner from './LoadingSpinner'
import AdmiAddModelForm from './AdminAddModelForm'
import Swal from 'sweetalert2'

const AdminListModels = () => {

    const [modelo, setModelo] = useState({})
    const token = localStorage.getItem("jwt")
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalElements, setTotalElements] = useState(0)
    const [editForm, setEditForm] = useState(false)
    const [editCategoria, setEditCategoria] = useState(false)
    const [payloadCategoria, setPayloadCategoria] = useState({
        id: 0,
        categoria: ""
    })
    const [modelos, setModelos] = useState([])
    const [categorias, setCategorias] = useState()

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://3.135.246.162/api/modelo?page=${page}`, {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token,
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setModelos(data.content)
                setTotalElements(data.totalElements)
                setIsLoading(false)
            })
    }, [page])

    useEffect(() => {
        fetch("http://3.135.246.162/api/categorias", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
        .then(data => setCategorias(data))
    }, [])

    const handleEdit = (modelo) => {
        setModelo(modelo)
        setEditForm(true)
    }

    const handleEditCategoria = id => {
        setPayloadCategoria({
            ...payloadCategoria,
            id: id
        })
        setEditCategoria(true)
    }

    const handleSelectCategoria = c => {
        setPayloadCategoria({
            ...payloadCategoria,
            categoria: c.target.value
        })
    }

    const handleSubmitCategoria = () => {
        setIsLoading(true)
        fetch(`http://3.135.246.162/api/modelo/${payloadCategoria.id}?categoria=${payloadCategoria.categoria}`,{
            method: "PUT",
            headers: {
                "authorization": "Bearer " + token
            }
        }).then(res => {
            if(res.status == 200){
                Swal.fire({
                    title: "Categoria agregada con exito!",
                    icon: "success"
                });
            }else{
                Swal.fire({
                    title: "Ocurrio un error al agregar la categoria.",
                    icon: "Error"
                });
            }
            setEditCategoria(false)
            setIsLoading(false)
        })
    }

    const handleEliminar = id => {
        setIsLoading(true)
        fetch(`http://3.135.246.162/api/modelo/${id}`,{
            method: "DELETE",
            headers: {
                "authorization": "Bearer " + token
            }
        }).then(res => {
            if(res.status == 200){
                const modelosFilter = modelos.filter(m => m.id != id)
                setModelos(modelosFilter)
                Swal.fire({
                    title: "Modelo eliminado con exito!",
                    icon: "success"
                });
            }else{
                Swal.fire({
                    title: "Ocurrio un error al eliminar el modelo.",
                    icon: "Error"
                });
            }
            setIsLoading(false)
        })
        
    }

    return (
        isLoading ? <LoadingSpinner/> :
        <div className="list">
            {editForm ?
                <div className='overlay'>
                    <AdmiAddModelForm modelo={modelo} isEdit={true} setEditForm={setEditForm} id={modelo.id}/>
                </div> : null
            }
            {editCategoria ?
                <div className='overlay'>
                    <div style={{background: "#FFBE3F", padding: "20px", display: "flex", flexDirection: "column", justifyItems: "center", width: "20%", borderRadius: "10px", textAlign: "center"}}>
                        <h2 style={{marginTop: 0}}>Agregar categoria</h2>
                        <select onChange={handleSelectCategoria} style={{padding: "5px", outline: "none"}}>
                            <option disabled selected>Seleccionar</option>
                            {categorias.map(c => (<option value={c.categoria}>{c.categoria}</option>))}
                        </select>
                        <button onClick={handleSubmitCategoria} style={{margin: "10px 0", padding: "5px", outline: "none", background: "black", color: "white", border: "none", borderRadius: "5px"}}>Agregar</button>
                        <button onClick={() => setEditCategoria(false)} style={{padding: "5px", outline: "none", background: "black", color: "white", border: "none", borderRadius: "5px"}}>Cancelar</button>
                    </div>
                </div> : null
            }
            <div className='vehicle-list'>
                <div>
                    <span>ID</span>
                </div>
                <div>
                    <span>Modelo</span>
                </div>
                <div>
                    <span>Acciones</span>
                </div>
            </div>
            <div className="vechicle-card">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    modelos.map(m => (
                        <div className='vehicle-properties' key={m.id}>
                            <div>
                                <span>{m.id}</span>
                            </div>
                            <div>
                                <span>{m.marca.marca + " " + m.modelo}</span>
                            </div>
                            <div className='vehicle-properties-actions'>
                                <button onClick={() => handleEliminar(m.id)}>Eliminar</button>
                                <button onClick={() => handleEdit(m)}>Editar</button>
                                <button onClick={() => handleEditCategoria(m.id)}>Agregar Categoria</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Paginacion totalItems={totalElements} itemsPerPage={10} currentPage={setPage} page={page} />
        </div>
    )
}

export default AdminListModels