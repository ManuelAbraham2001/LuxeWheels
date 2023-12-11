import React, { useState, useEffect } from 'react';
import './styles/AdminAddVehicleForm.css'
import LoadingSpinner from './LoadingSpinner'
import Swal from 'sweetalert2';

const AdminAddVehicleForm = ({ vehicle, isEdit, setIsEdit, id }) => {
    const [images, setImages] = useState([]);
    const token = localStorage.getItem('jwt')
    const [modelos, setModelos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [formData, setFormData] = isEdit ? useState({
        modelo: vehicle.modelo.modelo,
        marca: vehicle.modelo.marca.marca,
        anio: vehicle.anio.anio,
        categoria: "",
        patente: vehicle.patente,
        precio: vehicle.precio,
        descripcion: vehicle.descripcion,
        fotos: vehicle.fotos.map(f => (f.url)),
        fotosDelete: [],
        fotosCopy: vehicle.fotos
    }) : useState({
        modelo: "",
        marca: "",
        anio: "",
        categoria: "",
        patente: "",
        precio: "",
        descripcion: "",
        fotos: [],
        fotosDelete: [],
        fotosCopy: []
    })

    useEffect(() => {
        fetch("http://3.135.246.162/api/modelo", {
            method: "GET",
            headers: { authorization: "Bearer " + token }
        }).then(res => res.json())
            .then(data => { setModelos(data), setIsLoading(false) })
    }, [])

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

        if (isEdit) {

            setIsLoading(true)

            dataForm.append("vehiculo", JSON.stringify({
                modelo: formData.modelo,
                anio: formData.anio,
                patente: formData.patente,
                precio: formData.precio,
                descripcion: formData.descripcion,
                fotosBorradas: formData.fotosDelete
            }));

            const copy = []

            formData.fotos.forEach(e => {
                if (typeof e != "string") {
                    copy.push(e)
                }
            });

            copy.forEach((imagen) => {
                dataForm.append(`imagen`, imagen);
            });

            fetch(`http://3.135.246.162/api/vehiculos/${id}`, {
                method: "PUT",
                body: dataForm,
                headers: {
                    "authorization": "Bearer " + token
                }
            }).then(res => {
                setIsLoading(false)
                if (res.status === 200) {
                    Swal.fire({
                        title: "Vehiculo actualizado con exito!",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Ocurrio un error al actualizar el vehiculo.",
                        icon: "Error"
                    });
                }
                setIsEdit(false)
            })

        } else {

            setIsLoading(true)

            dataForm.append("vehiculo", JSON.stringify({
                modelo: formData.modelo,
                anio: formData.anio,
                patente: formData.patente,
                precio: formData.precio,
                descripcion: formData.descripcion
            }));

            formData.fotos.forEach((imagen) => {
                dataForm.append(`imagen`, imagen);
            });

            fetch("http://3.135.246.162/api/vehiculos", {
                method: "POST",
                body: dataForm,
                headers: {
                    "authorization": "Bearer " + token
                }
            })
                .then(res => {
                    setIsLoading(false)
                    setFormData({})
                    if (res.status === 200) {
                        Swal.fire({
                            title: "Vehiculo creado con exito!",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Ocurrio un error al crear el vehiculo.",
                            icon: "Error"
                        });
                    }
                })

        }

    }

    const handleImageChange = (e) => {
        const nuevasFotos = [...formData.fotos]
        for (let i = 0; i < e.target.files.length; i++) {
            nuevasFotos.push(e.target.files[i]);
        }
        setFormData({
            ...formData,
            fotos: nuevasFotos,
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

    const handleDeleteImage = (e, url, index) => {
        e.preventDefault();
        const newFotos = [...formData.fotos]
        const fotosEliminadas = [...formData.fotosDelete]
        newFotos.splice(index, 1)

        const fotoEliminada = formData.fotosCopy.find((foto) => foto.url == url);
        fotosEliminadas.push(fotoEliminada)

        setFormData((prevFormData) => ({
            ...prevFormData,
            fotosDelete: fotosEliminadas,
            fotos: newFotos
        }));
    };

    return (
        isLoading ? <LoadingSpinner /> :
            <section className='sectionAddVehicle'>
                <div className='add-vehicle-container' id={isEdit ? 'vehicle-edit' : null}>

                    <h2>{isEdit ? "Actualizar vehiculo" : "Agregar vehiculo"}</h2>
                    <form className='add-vehicle-form'>
                        <div className="add-vehicle-form-input-container">
                            <div className='add-vehicle-form-input modelo-marca'>
                                <label>Modelo:</label>
                                <select  style={{padding: "5px"}}
                                    value={formData.modelo}
                                    onChange={(e) => handleInputs("modelo", e.target.value)}
                                >
                                    <option disabled selected value="">Selecciona un modelo</option>
                                    {modelos.map((m) => (<option key={m.id}>{m.modelo}</option>))}
                                </select>
                            </div>
                            <div className='add-vehicle-form-input modelo-marca'>
                                <label>Marca:</label>
                                <input
                                    type="text"
                                    disabled
                                    value={modelos.find(m => m.modelo === formData.modelo)?.marca.marca}
                                    onChange={(e) => handleInputs("marca", e.target.value)}
                                    className='add-vehicle-form-input-field'
                                // className="input-field"
                                />
                            </div>
                        </div>

                        <div className="add-vehicle-form-input-container">
                            <div className='add-vehicle-form-input anio-patente'>
                                <label>Año:</label>
                                <select
                                    value={formData.anio}
                                    onChange={(e) => handleInputs("anio", e.target.value)}
                                    // className="input-field"
                                    className='add-vehicle-form-input-field'
                                >
                                    <option value="">Selecciona un año</option>
                                    {generateYearOptions()}
                                </select>
                            </div>
                            <div className='add-vehicle-form-input anio-patente'>
                                <label>Patente:</label>
                                <input
                                    type="text"
                                    value={formData.patente}
                                    onChange={(e) => handleInputs("patente", e.target.value)}
                                    // className="input-field"
                                    className='add-vehicle-form-input-field'
                                />
                            </div>
                        </div>

                        <div style={{ padding: "10px" }} className="add-vehicle-form-input-container input-precio">
                            <label>Precio:</label>
                            <input
                                type="number"
                                value={formData.precio}
                                onChange={(e) => handleInputs("precio", e.target.value)}
                                className='add-vehicle-form-input-field'
                            />
                        </div>

                        <div style={{ padding: "10px" }} className="add-vehicle-form-input-container">
                            <label for="file-upload" className="custom-file-upload">Seleccionar fotos</label>
                            <input id="file-upload" type="file" multiple onChange={handleImageChange} className="file-input-button custom-file-upload" />
                        </div>

                        {/* 
                    <div key={index} className="image-preview">
                                   <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                                </div> */}

                        {formData.fotos.length > 0 && (
                            <div style={{ padding: "10px", position: "relative" }} className="image-previews">
                                {formData.fotos.map((image, index) => (
                                    <div key={index} className="image-preview" style={{ position: "relative", marginBottom: "10px", width: "200px" }}>
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", position: "relative" }}>
                                            {typeof image === "string" ? (
                                                <img width={200} src={image} alt={`Image ${index}`} style={{ width: "100%" }} />
                                            ) : (
                                                <img width={200} src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: "100%" }} />
                                            )}
                                            <button onClick={(e) => handleDeleteImage(e, image, index)} style={{ position: "absolute", top: 0, right: 0, width: "25px", height: "25px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>X</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        <div style={{ padding: "10px" }} className="add-vehicle-form-input-container">
                            <div className='add-vehicle-form-input vehicle-descripcion'>
                                <label>Descripción:</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => handleInputs("descripcion", e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div style={{ padding: "10px" }} className="add-vehicle-form-input-container">
                            <button type="button" onClick={handleAddVehicle} className="submit-button">
                                {isEdit ? "Actualizar vehiculo" : "Agregar vehiculo"}
                            </button>
                        </div>

                    </form>

                </div>
            </section>

    );
};

export default AdminAddVehicleForm;