import React, { useEffect, useState } from 'react'
import './styles/Categories.css'

const AdminListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alerta, setAlerta] = useState({
        estado: false,
        id: null,
        categoria: ''
    })

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
        } )        
    }

    const handleEliminar = id => {
        // console.log(id);
        fetch(`http://3.135.246.162/api/categorias/${id}`, {
            method: "DELETE",
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => console.log(res.status))
    }

    return (
        <>
            <main className="table">
                {alerta.estado ?
                    <div className='overlay'>
                        <div className="eliminar-alerta">
                            <h1>ATENCION</h1>
                            <p style={{fontSize: "20px"}}>Estas por eliminar la categoria <span style={{color: "red", fontWeight: "bold"}}>{alerta.categoria}</span></p>
                            <p style={{fontSize: "20px"}}>Esto eliminara <span style={{color: "red", fontWeight: "bold"}}>TODOS</span> los vehiculos que tengan esta categoria</p>
                            <div className="eliminar-alerta-acciones">
                                <button onClick={() => setAlerta({...alerta, estado: false})} className='eliminar-alerta-acciones-cancelar'>Cancelar</button>
                                <button value={alerta.id} onClick={e => handleEliminar(e.target.value)} className='eliminar-alerta-acciones-confirmar'>Confirmar</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ overflowX: "auto" }}>
                        <section className="table__header">
                            <h1>Categorías</h1>
                            <button>Agregar Categoría</button>
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
                                            <td><img src={c.url} width={200}/></td>
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