import React, { useEffect, useState } from 'react'
import './styles/Categories.css'
import LoadingSpinner from './LoadingSpinner'
import svg from './../../public/images/arrow-left-solid.svg'
import Swal from 'sweetalert2'

const AdminListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alerta, setAlerta] = useState({
        estado: false,
        id: null,
        categoria: ''
    })
    const [agregarCategoria, setAgregarCategoria] = useState(false)
    const [imagen, setImagen] = useState(null)
    const [categoria, setCategoria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        fetch("http://3.135.246.162/api/categorias", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [])


    const handleAlerta = (id, categoria) => {
        setAlerta({
            estado: true,
            id: id,
            categoria: categoria
        })
    }

    const handleEliminar = id => {
        setIsLoading(true)
        setAlerta({
            ...alerta,
            estado: false
        })
        fetch(`http://3.135.246.162/api/categorias/${id}`, {
            method: "DELETE",
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => {
            if (res.status == 200) {
                const categoriasFilter = categories.filter(c => c.id != alerta.id)
                setCategories(categoriasFilter)
                Swal.fire({
                    title: "Categoria eliminada con exito!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Ocurrio un error al eliminar la categoria.",
                    icon: "Error"
                });
            }
            setIsLoading(false)
        })
    }

    const handleSubmit = () => {

        setIsLoading(true)

        const formData = new FormData();

        formData.append("categoria", JSON.stringify({ categoria: categoria, descripcion: descripcion }))
        if (imagen != null) {
            formData.append("imagen", imagen[0])
        }

        fetch("http://3.135.246.162/api/categorias", {
            method: "POST",
            body: formData,
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("Error al crear la categoría");
            }
            return res.json();
        }).then(newCategoria => {
            setCategories([...categories, newCategoria]);
            setIsLoading(false);

            Swal.fire({
                title: "Categoría creada con éxito!",
                icon: "success"
            });

            setAgregarCategoria(false);
        }).catch(error => {
            console.error("Error:", error);
            setIsLoading(false);

            Swal.fire({
                title: "Ocurrió un error al crear la Categoría.",
                icon: "error"
            });

            setAgregarCategoria(false);
        });
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
                    {agregarCategoria ?
                        <div className="overlay">
                            <div className="modal">
                                <div>
                                    <section className='sectionAddVehicle'>
                                        <div id='caracteristica-form' className='add-vehicle-container'>
                                            <h2>Crear categoria</h2>
                                            <form className='add-vehicle-form'>
                                                <label className="label-field">Categoria:</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => { setCategoria(e.target.value) }}
                                                    className="input-field"
                                                />
                                                <br />
                                                <label className="label-field">Descripcion:</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => { setDescripcion(e.target.value) }}
                                                    className="input-field"
                                                />
                                                <br />
                                                <label for="file-upload" className="custom-file-upload">Seleccionar fotos</label>
                                                <input id="file-upload" type="file" onChange={e => { setImagen(e.target.files) }} className="file-input-button custom-file-upload" />
                                                <div style={{ marginTop: "10px" }}>
                                                    {imagen != null ?
                                                        <img width="100px" src={URL.createObjectURL(imagen[0])} alt="caracteristica-foto" /> : null
                                                    }
                                                </div>
                                                <br />

                                                <button onClick={handleSubmit} type="button" className="submit-button">
                                                    Crear
                                                </button>
                                                <button style={{ marginTop: "2px" }} className="submit-button" onClick={() => { setAgregarCategoria(false), setImagen(null) }}>Cerrar</button>
                                            </form>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        : null}
                    {alerta.estado ?
                        <div className='overlay'>
                            <div style={{ margin: "0 auto", padding: "10px" }} className="eliminar-alerta">
                                <h1>ATENCION</h1>
                                <p style={{ fontSize: "20px" }}>Estas por eliminar la categoria <span style={{ color: "red", fontWeight: "bold" }}>{alerta.categoria}</span></p>
                                <p style={{ fontSize: "20px", maxWidth: "80%", margin: "0 auto" }}>Esto hara que todos los vehiculos que tengan esta categoria dejen de tenerla, esta accion <span style={{ color: "red", fontWeight: "bold" }}>NO</span> es reversible.</p>
                                <div className="eliminar-alerta-acciones">
                                    <button onClick={() => setAlerta({ ...alerta, estado: false })} className='eliminar-alerta-acciones-cancelar'>Cancelar</button>
                                    <button value={alerta.id} onClick={e => handleEliminar(e.target.value)} className='eliminar-alerta-acciones-confirmar'>Confirmar</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{ overflowX: "auto" }}>
                            <section id='table-categorias' className="table__header">
                                <h1>Categorías</h1>
                                <button onClick={() => setAgregarCategoria(true)}>Agregar Categoría</button>
                            </section>
                            <section className="table__body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Imagen</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(c => (
                                            <tr key={c.id}>
                                                <td>{c.id}</td>
                                                <td>{c.categoria}</td>
                                                <td>{c.descripcion}</td>
                                                <td><img src={c.url} width={200} /></td>
                                                <td>
                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <button onClick={() => handleAlerta(c.id, c.categoria)} style={{ background: "red" }}>Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </div>}
                </main>
            </>
    )
}

export default AdminListCategories