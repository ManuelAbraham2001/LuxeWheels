import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({auto}) => {

  return (
    <div>
      {auto && (
        <div key={auto.id} className="card">
          <img src={auto.images[0]} alt={auto.model} />
          <div className="card-content">
            <h3>{auto.model}</h3>
            <Link to={`/detail/${auto.id}`}>
              <button className="btn-detail"><strong>Detalles</strong></button>
             
            </Link>
            <p>{auto.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;