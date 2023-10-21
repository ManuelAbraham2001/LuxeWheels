import React from "react";
import Card from "../Components/Card";
import { useDentiStates } from "../Context/Context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {

  const {state} = useDentiStates()

  

  return (
    <>
      <h1>Dentistas Favs</h1>
      <div className="card-grid">
        {state.favs.map(fav =>
        <Card dentista={fav} key={fav.id}/>)}
      </div>
    </>
  );
};

export default Favs;
