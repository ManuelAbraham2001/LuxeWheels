import React, { useEffect, useState } from 'react'

const AdminAddCaracteristicas = () => {

    const [caracteristicas, setCaracteristicas] = useState([])
    const token = localStorage.getItem("jwt")
    const [popUp, setPopUp] = useState(false)
    const [caracteristica, setCaracteristica] = useState(null)
    const [imagen, setImagen] = useState(null)
    const [isEditing, setisEditing] = useState(false)
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
            .then(data => setCaracteristicas(data))
    }

    const handleDelete = id => {
        fetch("http://3.135.246.162/api/caracteristicas/" + id, {
            method: "DELETE",
            headers: {
                authorization: "Bearer " + token
            }
        }).then(() => getCaracteristias())
    }

    const handleSubmit = () => {

        const formData = new FormData();

        formData.append("caracteristica", caracteristica)
        formData.append("foto", imagen[0])

        fetch("http://3.135.246.162/api/caracteristicas", {
            method: "POST",
            body: formData,
            headers: {
                authorization: "Bearer " + token
            }
        })
    }

    const handleEdit = () => {
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
        })
    }


    return (
        <>
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
                                            <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                                            <button onClick={() => {
                                                setisEditing(true), setPopUp(true), setCaracteristicaEdit({
                                                    id: c.id,
                                                    caracteristica: c.caracteristica,
                                                    nuevaCaracteristica: "",
                                                    foto: []
                                                })
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
                                <div className='add-vehicle-container'>
                                    <h2>{isEditing ? "Editar" : "Agregar"} Caracteristica</h2>
                                    <form className='add-vehicle-form'>
                                        <label className="label-field">Caracteristica:</label>
                                        <input
                                            type="text"
                                            onChange={(e) => { isEditing ? setCaracteristicaEdit({ ...caracteristicaEdit, nuevaCaracteristica: e.target.value }) : setCaracteristica(e.target.value) }}
                                            className="input-field"
                                        // value={isEditing ? caracteristicaEdit.caracteristica : ""}
                                        />
                                        <br />
                                        <label className="label-field">Imagen:</label>
                                        <input type="file" accept='.svg' onChange={e => { isEditing ? setCaracteristicaEdit({ ...caracteristicaEdit, foto: e.target.files }) : setImagen(e.target.files) }} className="file-input-button" />
                                        <br />

                                        <button onClick={isEditing ? handleEdit : handleSubmit} type="button" className="submit-button">
                                            {isEditing ? "Editar" : "Agregar"}
                                        </button>
                                        <button style={{ marginTop: "2px" }} className="submit-button" onClick={() => { setPopUp(false), setisEditing(false) }}>Cerrar</button>
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