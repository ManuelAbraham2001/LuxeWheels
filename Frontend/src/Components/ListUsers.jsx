import React, { useEffect, useState } from 'react'
import './styles/listUsers.css'

const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://3.135.246.162/api/usuarios/allusers", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn0se1wiYXV0aG9yaXR5XCI6XCJST0xFX1VTRVJcIn1dIiwiZXNBZG1pbiI6dHJ1ZSwic3ViIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjk4ODgyMTAzLCJleHAiOjE2OTk4ODIxMDN9.eYcOThi6SuRJqs_N781gtca0cJ9x6Tpj11HMeKjEdWLX2AjEgnUY7b3U75R5UjkkUSopoohX9nRBMwNXGMOjUA"
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
    }, [])

    const callApiAddRemoveRole = (user, id, roleToAdd) => {
        const isAdding = !user.roles.some((rol) => rol.rol === roleToAdd);
    
        fetch(`http://3.135.246.162/api/rol/${isAdding ? 'add' : 'remove'}/${id}`, {
            method: "POST",
            headers: {
                "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn0se1wiYXV0aG9yaXR5XCI6XCJST0xFX1VTRVJcIn1dIiwiZXNBZG1pbiI6dHJ1ZSwic3ViIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjk4ODgyMTAzLCJleHAiOjE2OTk4ODIxMDN9.eYcOThi6SuRJqs_N781gtca0cJ9x6Tpj11HMeKjEdWLX2AjEgnUY7b3U75R5UjkkUSopoohX9nRBMwNXGMOjUA"
            }
        });
        
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