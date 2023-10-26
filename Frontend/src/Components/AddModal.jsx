import React, { useState } from 'react';
import AddVehicleForm from './AddVehicleForm';

const Modal = ({ isOpen, onClose, onAddVehicle }) => {
  const [isFormOpen, setFormOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      {isFormOpen ? (
        <div>
          <AddVehicleForm onAddVehicle={onAddVehicle} />
          <button onClick={closeForm}>Cerrar Formulario</button>
        </div>
      ) : (
        <button onClick={openForm}>Agregar Vehículo</button>
      )}
      <button onClick={onClose}>Cerrar Modal</button>
    </div>
  );
};

export default Modal;