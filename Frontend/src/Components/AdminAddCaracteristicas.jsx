import React, { useEffect, useState } from 'react'

const AdminAddCaracteristicas = () => {

    const [caracteristicas, setCaracteristicas] = useState([])
    const token = localStorage.getItem("jwt")
    const [popUp, setPopUp] = useState(false)
    const [caracteristica, setCaracteristica] = useState(null)
    const [imagen, setImagen] = useState(null)

    popUp ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"

    useEffect(() => {
        fetch("http://localhost:8080/api/caracteristicas", {
            method: "GET",
        }).then(res => res.json())
            .then(data => setCaracteristicas(data))
    }, [])

    const handleDelete = id => {
        fetch("http://localhost:8080/api/caracteristicas/" + id, {
            method: "DELETE",
            headers: {
                authorization: "Bearer " + token
            }
        })
    }

    const handleSubmit = () => {

        const formData = new FormData();

        formData.append("caracteristica", caracteristica)
        formData.append("foto", imagen[0])

        fetch("http://localhost:8080/api/caracteristicas", {
            method: "POST",
            body: formData,
            headers:{
                authorization: "Bearer " + token
            }
        })
    }


    return (
        <>
            <main className="table">
                <section className="table__header">
                    <div style={{ width: "95%", display: "flex", justifyContent: "end", margin: "0 auto" }}>
                        <button onClick={() => { setPopUp(true)}}>Agregar caracteristica</button>
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
                                            <button>Editar</button>
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


                                    <h2>Agregar Caracteristica</h2>
                                    <form className='add-vehicle-form'>
                                        <label className="label-field">Caracteristica:</label>
                                        <input
                                            type="text"
                                            onChange={(e) =>  setCaracteristica(e.target.value)}
                                            className="input-field"
                                        />
                                        <br />
                                        <label className="label-field">Imagen:</label>
                                        <input type="file" accept='.svg' onChange={e => setImagen(e.target.files)} className="file-input-button" />
                                        <br />

                                        <button onClick={handleSubmit} type="button"  className="submit-button">
                                            Agregar
                                        </button>
                                        <button style={{marginTop: "2px"}} className="submit-button" onClick={() => setPopUp(false)}>Cerrar</button>
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