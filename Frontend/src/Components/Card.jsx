import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDentiStates } from '../Context/Context'



const Card = () => {
      const [randomCard, setRandomCard] = useState(null);
    
      useEffect(() => {
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        const selectedCard = jsonData[randomIndex];
        setRandomCard(selectedCard);
      }, []);
    
      return (
        <div>
          {randomCard && (
            <div key={randomCard.id} className="card">
              <img src={randomCard.images[0]} alt={randomCard.model} />
              <div className="card-content">
                <h3>{randomCard.model}</h3>
                <Link to={`/detail/${randomCard.id}`}>
                  <button>Ver más</button>
                </Link>
                <p>{randomCard.description}</p>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default Card;