import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({auto}) => {

  return (
    <div>
      {auto && (
        <div key={auto.id} className="card">
          <img src={auto.images[0]} alt={auto.model} />
          <div className="card-content">
<<<<<<< HEAD
            <h3>{randomCard.model}</h3>
            <Link to={`/detail/${randomCard.id}`}>
              <button className="btn-detail"><strong>Detalles</strong></button>
             
=======
            <h3>{auto.model}</h3>
            <Link to={`/detail/${auto.id}`}>
              <button>Ver más</button>
>>>>>>> 9e797e20fccc61a518a72976cbecd00f340c6fd4
            </Link>
            <p>{auto.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;