


import React, { useState, useEffect} from 'react';
import './styles/AddVehicleForm.css'
import { useParams } from 'react-router-dom'
import { useRentacarStates } from '../Context/Context';
import { Link } from 'react-router-dom';



const AddVehicleForm = () => {
  const [images, setImages] = useState([]);


  const [formData, setFormData] = useState({
    modelo: "",
    marca: "",
    anio: "",
    categoria: "",
    patente: "",
    precio: "",
    descripcion: "",
    fotos: []
  })

  const handleInputs = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleAddVehicle = () => {
    setFormData({
      ...formData,
      precio: parseFloat(formData.precio)
    })

    const dataForm = new FormData();

    dataForm.append("vehiculo", JSON.stringify({
      modelo: formData.modelo,
      anio: formData.anio,
      categoria: formData.categoria,
      patente: formData.patente,
      precio: formData.precio,
      descripcion: formData.descripcion
    }));

    formData.fotos.forEach((imagen) => {
      dataForm.append(`imagen`, imagen);
    });

    console.log("enviando");

    fetch("http://3.135.246.162/api/vehiculos", {
      method: "POST",
      body: dataForm,
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json()); 
          return response.json();
        } else {
          throw new Error("Error en la solicitud.");
        }
      })
      .then((data) => {
        console.log("Respuesta de la API:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setFormData({
      ...formData,
      fotos: selectedImages,
    });
  };

  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const startYear = 2000; // Puedes cambiar este valor si es necesario
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
      <Link to="/admin">
          <button className="submit-button">Ir a Administración</button>
      </Link>

        <h2>Agregar Vehículo</h2>
        <form className='add-vehicle-form'>
          <label className="label-field">Modelo:</label>
          <input
            type="text"
            value={formData.modelo}
            onChange={(e) => handleInputs("modelo", e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Marca:</label>
          <input
            type="text"
            value={formData.marca}
            onChange={(e) => handleInputs("marca", e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Año:</label>
          <select
            value={formData.anio}
            onChange={(e) => handleInputs("anio", e.target.value)}
            className="input-field"
          >
            <option value="">Selecciona un año</option>
            {generateYearOptions()}
          </select>
          <br />

          <label className="label-field">Categoría:</label>
          <input
            type="text"
            value={formData.categoria}
            onChange={(e) => handleInputs("categoria", e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Patente:</label>
          <input
            type="text"
            value={formData.patente}
            onChange={(e) => handleInputs("patente", e.target.value)}
            className="input-field"
          />
          <br />

          <label className="label-field">Precio:</label>
          <input
            type="number"
            value={formData.precio}
            onChange={(e) => handleInputs("precio", e.target.value)}
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
            value={formData.descripcion}
            onChange={(e) => handleInputs("descripcion", e.target.value)}
            className="input-field"
          />
          <br />

          <button type="button" onClick={handleAddVehicle} className="submit-button">
            Agregar vehículo
          </button>
        </form>
        <br>
        </br>


      </div>
    </section>

  );
};

export default AddVehicleForm;