import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/CardHome.css'
import img from '../../public/images/audi_1.jpg'
import Caracteristicas from "./Caracteristicas";


const Card = ({ auto }) => {

  return (
    <>
      {auto && (
        <div key={auto.id} className="card">
          <img src={auto.modelo.fotos[0]?.url || img} alt={(auto.modelo.marca.marca || "") + " " + (auto.modelo.modelo || "") + " " + (auto.anio.anio || "")} />
          <div className="card-content">
            <div style={{textAlign: "left"}}>
              <h3>
                {(auto.modelo.marca.marca || "") + " " + (auto.modelo.modelo || "") + " " + (auto.anio.anio || "")}
              </h3>
              <p>{auto.descripcion || "No hay descripción disponible."}</p>
            </div>
            <div>
              <Link to={`/detail/${auto.id}`}>
                <button>Ver más</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
