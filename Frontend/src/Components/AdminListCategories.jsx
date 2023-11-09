import React, { useEffect, useState } from 'react'
import './styles/Categories.css'

const AdminListCategories = () => {

    /*const [categories, setCategories] = useState([]);*/
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('jwt');


    const categories = [
        { id: 1, nombre: "Compactos", descripcion: "Automóviles compactos ideales para la ciudad.", imagen: "imagen_compactos.jpg" },
        { id: 2, nombre: "Sedanes", descripcion: "Elegantes sedanes para un viaje cómodo.", imagen: "imagen_sedanes.jpg" },
        { id: 3, nombre: "Deportivos", descripcion: "Deportivos rápidos y potentes.", imagen: "imagen_deportivos.jpg" },
        { id: 4, nombre: "Coupes", descripcion: "Coupés elegantes y con estilo.", imagen: "imagen_coupes.jpg" },
        { id: 5, nombre: "Camionetas", descripcion: "Camionetas robustas para aventuras todo terreno.", imagen: "imagen_camionetas.jpg" },
        { id: 6, nombre: "Electricos", descripcion: "Automóviles eléctricos para una conducción sostenible.", imagen: "imagen_electricos.jpg" },
        { id: 7, nombre: "Híbridos", descripcion: "Automóviles híbridos que combinan eficiencia y rendimiento.", imagen: "imagen_hibridos.jpg" }
      ];


    /*
    useEffect(() => {
        fetch("http://3.135.246.162/api/productos/categorias", {
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

*/

    /*
    const callApiAddRemoveRole = (user, id, roleToAdd) => {
        const isAdding = !user.roles.some((rol) => rol.rol === roleToAdd);
    
        fetch(`http://3.135.246.162/api/rol/${isAdding ? 'add' : 'remove'}/${id}`, {
            method: "POST",
            headers: {
                "authorization": "Bearer " + token
            }
        });
        
    }
    
    const toggleAdmin = (user) => {
        callApiAddRemoveRole(user, user.id, "ROLE_ADMIN");
    };


*/

  const handleAddCategorie = () => {};




    return (
        <>
            <main className="table">
                <section className="table__header">
                    <h1>Categorías</h1>
                    <button onClick={handleAddCategorie}>Agregar Categoría</button>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.nombre}</td>
                                    <td>{c.descripcion}</td>
                                    <td>{c.imagen}</td>
                                    <td>
                                        <div>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    )
}

export default AdminListCategories