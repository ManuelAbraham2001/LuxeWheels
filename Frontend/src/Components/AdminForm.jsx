import React from 'react';
import { useRentacarStates } from '../Context/Context';
import { Link } from 'react-router-dom';
import "./styles/AdminForm.css"


const VehicleList = () => {
  const localFavs = JSON.parse(localStorage.getItem('favs')) || [];
  const localVehicles = JSON.parse(localStorage.getItem('local_vehicles')) || [];

  const state = { vehicles: [...localFavs, ...localVehicles] };

  console.log(state);

  return (
    <div className="vehicle-list-container">
      <h2>Administración ::: Listado de Vehículos</h2>

      <Link to="/admin/addproduct" className="add-vehicle-link">
        <button className="add-vehicle-button">Agregar Vehículo</button>
      </Link>

      <ul className="vehicle-list">
        {state.vehicles.map((vehicle) => (
          <li key={vehicle.id} className="vehicle-item">
            <strong>Modelo:</strong> {vehicle.model} | <strong>Marca:</strong> {vehicle.brand} |{' '}
            <strong>Año:</strong> {vehicle.year} | <strong>Categoría:</strong> {vehicle.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;

