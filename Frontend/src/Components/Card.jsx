import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/CardHome.css'
import img from '../../public/images/audi_1.jpg'


const Card = ({ auto }) => {
  console.log(auto);

  return (
    <>
      {auto && (
        <div key={auto.id} className="card">
          <img src={img} alt={(auto.modelo.marca.marca || "") + " " + (auto.modelo.modelo || "") + " " + (auto.anio.anio || "")} />
          <div className="card-content">
            <h3>
              {(auto.modelo.marca.marca || "") + " " + (auto.modelo.modelo || "") + " " + (auto.anio.anio || "")}
            </h3>
            <Link to={`/detail/${auto.id}`}>
              <button>Ver más</button>
            </Link>
            <p>{auto.descripcion || "No hay descripción disponible."}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
