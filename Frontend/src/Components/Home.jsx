import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useRentacarStates } from '../Context/Context'
import { Link } from "react-router-dom";
import "./styles/Home.css"
import Modal from './AddModal'
import jsonData from '../Data/products-1.json';

// Por ahora mandamos todo a localStorage


//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

function getRandomObjects(jsonData, count) {
  const shuffledData = [...jsonData];
  for (let i = shuffledData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }
  return shuffledData.slice(0, count);
}

const Home = () => {

// Por ahora mandamos todo a localStorage

const { state, dispatch } = useRentacarStates();



useEffect(() => {


 // console.log('Datos en useEffect:', state.vehicles);

  // Guardar datos en localStorage
  localStorage.setItem('local_vehicles', JSON.stringify(state.vehicles));
}, [state.vehicles]);


  const [randomCard, setRandomObjects] = useState([]);

  useEffect(() => {
    const randomCard = getRandomObjects(jsonData, 10);
    setRandomObjects(randomCard);
  }, []);

  /*console.log(randomCard);*/




  return (
    <main>
      <div className="buscador">

        <div className="buscar">
          <input type="text" placeholder="Escribe aquí..." id="buscar" />
          <button className="btn-buscar">
            <strong>Buscar</strong>
          </button>
        </div>

        <div>
          <select name="recomendacion" id="reco">
            <option value="seleccion">Recomendaciones</option>
          </select>
        </div>

        <div className="Categorias">
          <select name="categoria" id="cate">
            <option value="seleccion">Categorías</option>
          </select>
        </div>

      </div>

      <div className="card-grid">
        {randomCard.map((a) => (
          <Card auto={a} key={a.id} />
        ))}
      </div>

      <Link to="/admin/addproduct">
        <div className="add-product-button">
          <img
            src='../../public/images/add-product-button.png'
            alt="Agregar Producto"
          />
        </div>
      </Link>

    </main>
  );
}

export default Home














