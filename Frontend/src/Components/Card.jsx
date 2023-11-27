import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/CardHome.css'
import img from '../../public/images/audi_1.jpg'
import Caracteristicas from "./Caracteristicas";
import { useRentacarStates } from '../Context/Context'
import isFav from '../../public/images/isFav.svg'

const Card = ({ auto, renderizarIcono }) => {

    const { state, dispatch } = useRentacarStates()
    const token = localStorage.getItem("jwt")
    const [error, setError] = useState(false)

    const handleFav = id => {
        if (token) {
            dispatch({ type: "TOGGLE_FAV", payload: id })
        } else {
            setError(true)
            return
        }
    }

    useEffect(() => {
        if (error) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [error])

    return (
        <>
            {auto && (
                <div key={auto.id} className="card">
                    <img src={auto.fotos[0]?.url || img} alt={(auto.modelo.marca.marca || "") + " " + (auto.modelo.modelo || "") + " " + (auto.anio?.anio || "")} />
                    <div className="card-content" style={{width: "100%"}}>
                        <div className="card-content-info" style={{ textAlign: "left", display: "flex", justifyContent: "space-between"}}>
                            <h3>
                                {(auto.modelo.marca.marca || "") + " " + (auto.modelo.modelo || "") + " " + (auto.anio?.anio || "")}
                            </h3>
                            {renderizarIcono(auto.id, handleFav)}
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <p>{auto.descripcion || "No hay descripción disponible."}</p>
                        </div>
                        <div>
                            <Link to={`/detail/${auto.id}`}>
                                <button>Ver más</button>
                            </Link>
                        </div>
                        {/* <button onClick={() => handleFav(auto.id)} className="favBtn"></button> */}

                    </div>
                </div>
            )}
            {error ?
                <div className="overlay ">
                    <div className="favoritoCartel">
                        <h1>Debes iniciar sesion para marcar un vehiculo como favorito</h1>
                        <div className="acciones">
                            <a href="/login">Iniciar sesion</a>
                            <button onClick={() => setError(false)}>Continuar sin iniciar sesion</button>
                        </div>
                    </div>
                </div> : null}
        </>
    );
};

export default Card;
