import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import svg from './../../public/images/arrow-left-solid.svg'
import './styles/DetailCard.css'
import Caracteristicas from "./Caracteristicas";
import { useParams } from "react-router-dom";



const Detail = () => {

  const { id } = useParams();
  const [auto, setAuto] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("http://3.135.246.162/api/vehiculos/" + id, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json())
      .then(data => setAuto(data))
      .then(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading ? <div>Cargando...</div> :
        <div className="main-container">
          <div className="detail-vehicle">
            <h1>{auto.modelo.marca.marca} {auto.modelo.modelo} {auto.anio.anio}</h1>
            <div className="arrow-back">
              <a href="/">
                <img src={svg} />
              </a>
            </div>
          </div>
          <Gallery fotos={auto.fotos} />
          <div className="detail-descripcion">
            <h2>DESCRIPCION</h2>
            <p>{auto.descripcion}</p>
          </div>
          <Caracteristicas caracteristicas={auto.modelo.caracteristicas}></Caracteristicas>
        </div>}
    </>
  );
};

export default Detail