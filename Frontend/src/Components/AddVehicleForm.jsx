


import React, { useState } from 'react';
import './styles/AddVehicleForm.css'

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
  const newImages = Array.from(e.target.files); // Utiliza "Array.from"
  setImages([...images, ...newImages]);
};

  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const startYear = 1900; // Puedes cambiar este valor si es necesario
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }

  return (

    <section className='sectionAddVehicle'>
      <div className='add-vehicle-container'>
        <h2>Agregar Vehículo</h2>
        <form className='add-vehicle-form'>
          <label className="label-field">Modelo:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Marca:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Año:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input-field"
          >
            <option value="">Selecciona un año</option>
            {generateYearOptions()}
          </select>
          <br />

          <label className="label-field">Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Imágenes:</label>
          <input type="file" multiple onChange={handleImageChange} className="file-input-button" />
          <br />

          {images.length > 0 && (
            <div className="image-previews">
              {images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                </div>
              ))}
            </div>
          )}

          <label className="label-field">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <br />

          <button type="button" onClick={handleAddVehicle} className="submit-button">
            Agregar vehículo
          </button>
        </form>
      </div>
    </section>

  );
};

export default AddVehicleForm;