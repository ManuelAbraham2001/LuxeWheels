import React from 'react'
import Card from './Card'
import { useDentiStates } from '../Context/Context'
import { Link } from "react-router-dom";
import "./styles/Home.css"

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Home = () => {

  const {state} = useDentiStates()

  return (
    <main className="main-container">

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
        {state.dentistas.map((dentista) => (
          <Card dentista={dentista} key={dentista.id} />
          
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










  
 


