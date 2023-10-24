import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDentiStates } from '../Context/Context'



  const Card = () => {
    const jsonData = {
      "cards": [
        {
          "id": 1,
          "title": "Card 1",
          "description": "This is the description for Card 1. It contains some sample text.",
          "image": "https://example.com/card1.jpg"
        },
        {
          "id": 2,
          "title": "Card 2",
          "description": "Card 2 has a different description. You can customize this text as needed.",
          "image": "https://example.com/card2.jpg"
        },
        {
          "id": 3,
          "title": "Card 3",
          "description": "Card 3 also comes with a description. Feel free to modify it to your liking.",
          "image": "https://example.com/card3.jpg"
        }
      ]
    };
  
    const [randomCard, setRandomCard] = useState(null);
  
    useEffect(() => {
      // Generar un índice aleatorio
      const randomIndex = Math.floor(Math.random() * jsonData.cards.length);
  
      // Seleccionar la tarjeta aleatoria
      const selectedCard = jsonData.cards[randomIndex];
  
      // Actualizar el estado con la tarjeta aleatoria
      setRandomCard(selectedCard);
    }, []);
  
    return (
      <div>
        {randomCard && (
          <div key={randomCard.id} className="card">
            <img src={randomCard.image} alt={randomCard.title} />
            <div className="card-content">
              <h3>{randomCard.title}</h3>
              <p>{randomCard.description}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  

    

/*

        {/* Ademas deberan integrar la logica para guardar cada Card en el localStorage */
        //<button onClick={addFav} className="favButton">{findDentista ? '🌟' : '⭐'}</button>
      //  {/* () => setFavs((prevFavs) => [...prevFavs, odontologo]) */}
    //</div>
/** */

export default Card;
