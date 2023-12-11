import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import './styles/listUsers.css'
import Swal from 'sweetalert2';

const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        getUsers()
    }, [])

    const buttonAdmin = u => {
        return u.roles.some((rol) => rol.rol === "ROLE_ADMIN") ? "Eliminar admin" : "Agregar admin"
    }

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

        setIsLoading(true)

        const isAdding = !user.roles.some((rol) => rol.rol === roleToAdd);
    
        fetch(`http://3.135.246.162/api/rol/${isAdding ? 'add' : 'remove'}/${id}`, {
            method: "POST",
            headers: {
                "authorization": "Bearer " + token
            }
        }).then(res => {

            if(res.status != 200 && !isAdding){
                Swal.fire({
                    title: "Ocurrio un error al eliminar el administrador.",
                    icon: "Error"
                });
            }else if(res.status != 200 && isAdding){
                Swal.fire({
                    title: "Ocurrio un error al agregar el administrador.",
                    icon: "Error"
                });
            }

            if (res.status === 200 && !isAdding) {
                setUsers(prevUsers => {
                    return prevUsers.map(u => {
                        if (u.id === id) {
                            u.roles = [{ id: 2, rol: 'ROLE_USER' }];
                        }
                        return u;
                    });
                });
                Swal.fire({
                    title: "Administrador eliminado con exito!",
                    icon: "success"
                });
            } else if (res.status === 200 && isAdding) {
                setUsers(prevUsers => {
                    return prevUsers.map(u => {
                        if (u.id === id) {
                            u.roles = [{ id: 1, rol: 'ROLE_ADMIN' }, { id: 2, rol: 'ROLE_USER' }];
                        }
                        return u;
                    });
                });
                Swal.fire({
                    title: "Administrador agregado con exito!",
                    icon: "success"
                });
            }
            setIsLoading(false)
        })
    
    }
    
    const toggleAdmin = (user) => {
        callApiAddRemoveRole(user, user.id, "ROLE_ADMIN");
    };

    return (
        isLoading ? <LoadingSpinner/> :
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
                                                {buttonAdmin(u)}
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