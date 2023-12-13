import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import Swal from 'sweetalert2'
import svg from './../../public/images/arrow-left-solid.svg'

const AdminAddCaracteristicas = () => {

    const [caracteristicas, setCaracteristicas] = useState([])
    const token = localStorage.getItem("jwt")
    const [popUp, setPopUp] = useState(false)
    const [caracteristica, setCaracteristica] = useState(null)
    const [imagen, setImagen] = useState(null)
    const [isEditing, setisEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [fotoEdit, setFotoEdit] = useState('')
    const [caracteristicaEdit, setCaracteristicaEdit] = useState({
        id: "",
        caracteristica: "",
        nuevaCaracteristica: "",
        foto: null
    })

    popUp ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"

    useEffect(() => {
        getCaracteristias()
    }, [])

    const getCaracteristias = () => {
        fetch("http://3.135.246.162/api/caracteristicas", {
            method: "GET",
        }).then(res => res.json())
            .then(data => { setCaracteristicas(data), setIsLoading(false) })
    }

    const handleDelete = id => {
        fetch("http://3.135.246.162/api/caracteristicas/" + id, {
            method: "DELETE",
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => {

            const caracterisciasCopy = caracteristicas.filter(c => c.id != id)
            setCaracteristicas(caracterisciasCopy)

            setIsLoading(false)
            if (res.status === 200) {
                Swal.fire({
                    title: "Caracteristica eliminada con exito!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Ocurrio un error al eliminar la caracteristica.",
                    icon: "Error"
                });
            }
        })
    }

    const handleSubmit = () => {

        setIsLoading(true)

        const formData = new FormData();

        formData.append("caracteristica", caracteristica)
        formData.append("foto", imagen[0])

        fetch("http://3.135.246.162/api/caracteristicas", {
            method: "POST",
            body: formData,
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => {
            setIsLoading(false)
            if (res.status === 200) {
                Swal.fire({
                    title: "Caracteristica creada con exito!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Ocurrio un error al crear la caracteristica.",
                    icon: "Error"
                });
            }
            setPopUp(false)
        })
    }

    const handleEdit = () => {

        setIsLoading(true)

        const formData = new FormData();

        formData.append("nuevaCaracteristica", caracteristicaEdit.nuevaCaracteristica)
        formData.append("caracteristica", caracteristicaEdit.caracteristica)
        if (caracteristicaEdit.foto != null || caracteristicaEdit.foto.length > 0) {
            formData.append("foto", caracteristicaEdit.foto[0])
        }

        fetch("http://3.135.246.162/api/caracteristicas", {
            method: "PUT",
            body: formData,
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => {
            setIsLoading(false)
            if (res.status === 200) {
                Swal.fire({
                    title: "Caracteristica actualizada con exito!",
                    icon: "success"
                });
                getCaracteristias()
            } else {
                Swal.fire({
                    title: "Ocurrio un error al actualizar la caracteristica.",
                    icon: "Error"
                });
            }
            setPopUp(false)
        })
    }


    return (
        isLoading ? <LoadingSpinner /> :
            <>
                <div style={{ zIndex: 2 }} className="admin-arrow-back">
                    <a href="/admin">
                        <img src={svg} />
                    </a>
                </div>
                <main className="table">
                    <section className="table__header">
                        <div style={{ width: "95%", display: "flex", justifyContent: "end", margin: "0 auto" }}>
                            <button onClick={() => { setPopUp(true) }}>Agregar caracteristica</button>
                        </div>
                    </section>
                    <section className="table__body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Caracteristica</th>
                                    <th>Foto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {caracteristicas.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.caracteristica}</td>
                                        <td style={{ display: "flex", width: "100%", justifyContent: "center" }}><img style={{ width: "100px" }} src={c.url} alt="" /></td>
                                        <td>
                                            <div>
                                                <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(c.id)}>Eliminar</button>
                                                <button style={{ backgroundColor: 'gray' }} onClick={() => {
                                                    setisEditing(true), setPopUp(true), setCaracteristicaEdit({
                                                        id: c.id,
                                                        caracteristica: c.caracteristica,
                                                        nuevaCaracteristica: "",
                                                        foto: null
                                                    }, setFotoEdit(c.url))
                                                }}>Editar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
                {popUp && (
                    <div className="overlay">
                        <div className="modal">
                            <div>
                                <section className='sectionAddVehicle'>
                                    <div id='caracteristica-form' className='add-vehicle-container'>
                                        <h2>{isEditing ? "Editar" : "Agregar"} Caracteristica</h2>
                                        <form className='add-vehicle-form'>
                                            <label className="label-field">Caracteristica:</label>
                                            <input
                                                type="text"
                                                onChange={(e) => { isEditing ? setCaracteristicaEdit({ ...caracteristicaEdit, nuevaCaracteristica: e.target.value }) : setCaracteristica(e.target.value) }}
                                                className="input-field"
                                            />
                                            <br />
                                            <label for="file-upload" className="custom-file-upload">Seleccionar fotos</label>
                                            <input id="file-upload" accept='.svg' type="file" onChange={e => { isEditing ? setCaracteristicaEdit({ ...caracteristicaEdit, foto: e.target.files }) : setImagen(e.target.files) }} className="file-input-button custom-file-upload" />
                                            {!isEditing && imagen != null ?
                                                <div style={{ marginTop: "20px" }}>
                                                    <img width="100px" src={URL.createObjectURL(imagen[0])} alt="caracteristica-foto" />
                                                </div> : isEditing && <div style={{ marginTop: "20px" }}>
                                                    {caracteristicaEdit.foto != null ? <img width="100px" src={URL.createObjectURL(caracteristicaEdit.foto[0])} alt="caracteristica-foto" /> : <img width="100px" src={fotoEdit} alt="caracteristica-foto" />}
                                                </div>}
                                            <br />

                                            <button onClick={isEditing ? handleEdit : handleSubmit} type="button" className="submit-button">
                                                {isEditing ? "Editar" : "Agregar"}
                                            </button>
                                            <button style={{ marginTop: "2px" }} className="submit-button" onClick={() => { setPopUp(false), setisEditing(false), setImagen(null) }}>Cerrar</button>
                                        </form>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )}
            </>

    )
}

export default AdminAddCaracteristicas