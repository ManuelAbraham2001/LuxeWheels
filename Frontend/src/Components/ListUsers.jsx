import React, { useEffect, useState } from 'react'
import './styles/listUsers.css'

const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        fetch("http://3.135.246.162/api/usuarios/allusers", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const callApiAddRemoveRole = (user, id, roleToAdd) => {
        const isAdding = !user.roles.some((rol) => rol.rol === roleToAdd);
    
        fetch(`http://localhost:8080/api/rol/${isAdding ? 'add' : 'remove'}/${id}`, {
            method: "POST",
            headers: {
                "authorization": "Bearer " + token
            }
        }).then(() => getUsers())
        
    }
    
    const toggleAdmin = (user) => {
        callApiAddRemoveRole(user, user.id, "ROLE_ADMIN");
    };
    


    return (
        <>
            <main className="table">
                <section className="table__header">
                    <h1>Usuarios</h1>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Documento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nombre + " " + u.apellido}</td>
                                    <td>{u.email}</td>
                                    <td>{u.documento}</td>
                                    <td>
                                        <div>
                                            <button onClick={() => toggleAdmin(u)} className={u.roles.some((rol) => rol.rol === "ROLE_ADMIN") ? "noAdmin" : "admin"}>
                                                {u.roles.some((rol) => rol.rol === "ROLE_ADMIN") ? "Eliminar admin" : "Agregar admin"}
                                            </button>
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

export default ListUsers