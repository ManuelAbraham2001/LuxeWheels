import React, { useEffect, useState } from 'react'
import './styles/UserInfo.css'
import { Rating } from 'react-simple-star-rating'
import { format } from 'date-fns'
import LoadingSpinner from './LoadingSpinner';

const UserInfo = () => {
    const reformatDate = dateString => {
        const parts = dateString.split('/');
        return `${parts[1]}/${parts[0]}/${parts[2]}`;
    }

    const token = localStorage.getItem("jwt") || null
    const [resenia, setResenia] = useState("")
    const date = new Date();
    const [reservas, setReservas] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        console.log(rate);
        setRating(rate)
    }

    useEffect(() => {
        console.log(rating);
    }, [rating])

    const handleResenia = (id, rate) => {
        const payload = {
            resenia: resenia,
            calificacion: rate,
            fecha: format(date, "yyyy-MM-dd")
        }

        console.log(payload);

        // return;

        fetch(`http://3.135.246.162/api/resenias/${id}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "authorization": "Bearer " + token,
                "content-type": "application/json"
            }
        }).then(res => res.json())
    }

    useEffect(() => {
        fetch("http://3.135.246.162/api/usuarios/reservas", {
            method: "GET",
            headers: {
                authorization: "Bearer " + token,
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                const reservasOrdenadas = data.reservas.sort((a, b) => {
                    const fechaA = new Date(a.inicio.split('/').reverse().join('/'));
                    const fechaB = new Date(b.inicio.split('/').reverse().join('/'));
                    return fechaA - fechaB;
                });

                setReservas(reservasOrdenadas)
                setUserInfo(data.usuario);
                setIsLoading(false)
            })
    }, [])

    return (
        isLoading ? <LoadingSpinner /> :
            <div>
                <div className='user-info-main'>
                    <div className="user-info-container">
                        <h1>Informacion personal</h1>
                        <div className='user-info'>
                            <div className='user-info-content'>
                                <div className="user-info-content-item">
                                    <h3>Nombre:</h3>
                                    <span>{userInfo.nombre}</span>
                                </div>
                                <div className="user-info-content-item">
                                    <h3>Apellido:</h3>
                                    <span>{userInfo.apellido}</span>
                                </div>
                                <div className="user-info-content-item">
                                    <h3>Email:</h3>
                                    <span>{userInfo.email}</span>
                                </div>
                            </div>
                            <div>
                                <div className='user-info-content'>
                                    <div className="user-info-content-item">
                                        <h3>Fecha de nacimiento:</h3>
                                        <span>{`${userInfo.fechaNacimiento}`}</span>
                                    </div>
                                    <div className="user-info-content-item">
                                        <h3>Telefono:</h3>
                                        <span>{userInfo.telefono}</span>
                                    </div>
                                    <div className="user-info-content-item">
                                        <h3>Documento:</h3>
                                        <span>{userInfo.documento}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-reservas">
                        <h1>Reservas</h1>
                        <div className="reservas-container">
                            {reservas.map(r => (
                                <div key={r.id} className="reservas-content">
                                    <div className='reservas-content-item'>
                                        <h3>Vehiculo:</h3>
                                        <span>{r.vehiculo}</span>
                                    </div>
                                    <div className='reservas-content-item'>
                                        <h3>Fecha de reserva:</h3>
                                        <span>{r.fechaDeReserva}</span>
                                    </div>
                                    <div className='reservas-content-item'>
                                        <h3>Fecha de uso</h3>
                                        <span>Desde: {r.inicio} Hasta: {r.cierre}</span>
                                    </div>
                                    <div className='reservas-content-item'>
                                        <h3>Calificacion</h3>
                                        <span>
                                            {r.resenia?.calificacion == null && new Date(reformatDate(r.cierre)) <= date ? (
                                                <Rating
                                                    onClick={handleRating}
                                                    allowFraction={true}
                                                />
                                            ) : (
                                                <Rating
                                                    readonly={true}
                                                    allowFraction={true}
                                                    initialValue={r.resenia?.calificacion ? r.resenia.calificacion : 0}
                                                />
                                            )}
                                        </span>

                                    </div>
                                    <div className='reservas-content-item'>
                                        <div style={{ width: '100%' }}>
                                            <h3>Reseña</h3>
                                            <span>
                                                {r.resenia == null ? (
                                                    <textarea
                                                        disabled={new Date(reformatDate(r.cierre)) <= date ? false : true} // invertido
                                                        onChange={e => setResenia(e.target.value)}
                                                        placeholder='Escribe aqui tu experiencia...'
                                                        style={{ width: '100%', height: '100px' }}
                                                    ></textarea>
                                                ) : (
                                                    <textarea
                                                        style={{ width: '100%', height: '100px' }}
                                                        disabled
                                                    >
                                                        {r.resenia.resenia}
                                                    </textarea>
                                                )}
                                            </span>
                                            <div className='guardar-resenia'>
                                                {new Date(reformatDate(r.cierre)) <= date ? // invertir expresion // invertido
                                                    r.resenia == null ?
                                                        <button onClick={() => handleResenia(r.id, rating)}>Guardar reseña</button> : null
                                                    :
                                                    r.resenia == null ?
                                                        <span style={{ fontSize: "10px", color: "gray" }}>Podras dejar una resenia y una calificacion una vez haya finalizado tu reserva.</span>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default UserInfo

