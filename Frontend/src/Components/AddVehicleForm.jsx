import React, { useState } from 'react';

const AddVehicleForm = ({ onAddVehicle }) => {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');

  const handleAddVehicle = () => {
    // Validar y enviar datos al servidor
    if (model && brand && year && category && description) {
      const newVehicle = {
        model,
        brand,
        year,
        category,
        images,
        description
      };

      // Llamamos a la función prop onAddVehicle para simular la adición del nuevo vehículo
      onAddVehicle(newVehicle);

      // Restablecemos el formulario
      setModel('');
      setBrand('');
      setYear('');
      setCategory('');
      setImages([]);
      setDescription('');
    }
  };

  // Manejar la carga de imágenes
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  return (
    <div className="main-container">
      <div add-vehicle-container>
        <h2>Agregar Vehículo</h2>
        <form className='add-vehicle-form'>
          <label>Modelo:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <br />

          <label>Marca:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <br />

          <label>Año:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <br />

          <label>Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />

          <label>Imágenes:</label>
          <input type="file" multiple onChange={handleImageChange} />
          <br />

          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />

          <button type="button" onClick={handleAddVehicle}>
            Agregar vehículo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
