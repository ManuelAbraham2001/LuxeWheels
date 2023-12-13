import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useRentacarStates } from "../Context/Context";
import isFav from '../../public/images/isFav.svg'
import noFav from '../../public/images/noFav.svg'
import LoadingSpinner from "../Components/LoadingSpinner";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = ({isUserPage}) => {

    const { state, dispatch } = useRentacarStates()
    const token = localStorage.getItem("jwt")
    const [favs, setFavs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFavs()
    }, [])

    const handleFav = id => {
        if (token) {
            //     const updatedIds = localIdsProductosFavoritos.includes(id)
            //     ? localIdsProductosFavoritos.filter((favId) => favId !== id)
            //     : [...localIdsProductosFavoritos, id];

            // setLocalIdsProductosFavoritos(updatedIds);
            dispatch({ type: "TOGGLE_FAV", payload: id })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } else {
            setError(true)
            return
        }
    }

    const getFavs = () => {
        fetch("http://3.135.246.162/api/usuarios/favoritos", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token,
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {setFavs(data), setIsLoading(false)})
    }

    const idsProductosFavoritos = favs.map(v => v.id);

    const renderizarIcono = (idProducto) => {
        return idsProductosFavoritos.includes(idProducto) ? (
            <img className='fav'
                onClick={() => handleFav(idProducto)}
                style={{ width: "200px !important", cursor: "pointer" }}
                src={isFav}
                alt="Favorito"
            />
        ) : (
            <img
                className='fav'
                onClick={() => handleFav(idProducto)}
                src={noFav}
                alt="No favorito"
            />
        )
    };
    return (
        <>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                favs.length > 0 ? (
                    <>
                        <h1>Vehiculos Favs</h1>
                        <div id={isUserPage ? "favs-user" : null} className="card-grid">
                            {favs.map(fav => <Card renderizarIcono={renderizarIcono} auto={fav} key={fav.id} />)}
                        </div>
                    </>
                ) : (
                    <div style={{ background: "white", padding: "20px", marginTop: "20px", borderRadius: "10px", height: "100vh" }}>
                        <h1>No has agregado ningún vehículo a favoritos.</h1>
                    </div>
                )
            )}
        </>
    );
}

export default Favs;
