import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminAddModelForm = () => {

    const [marcas, setMarcas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [caracteristicas, setCaracteristicas] = useState([])
    const [formData, setFormData] = useState({
        modelo: "",
        marca: "",
        categorias: [],
        caracteristicas: []
    })
    const token = localStorage.getItem('jwt')


    useEffect(() => {

        fetch("http://3.135.246.162/api/marcas", {
            method: "GET"
        }).then(res => res.json())
            .then(data => setMarcas(data))

        fetch("http://3.135.246.162/api/categorias", {
            method: "GET"
        }).then(res => res.json())
            .then(data => setCategorias(data))

        fetch("http://3.135.246.162/api/caracteristicas", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setCaracteristicas(data))

    }, [])

    const handleInputs = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCaracteristicaChange = (caracteristica) => {
        console.log(caracteristica);
        const nuevaCaracteristica = caracteristica

        if (formData.caracteristicas.includes(caracteristica)){
            const nuevoArray = formData.caracteristicas.filter(c => c!== caracteristica)
            setFormData({
                ...formData,
                caracteristicas: nuevoArray
            });
            return
        }

        setFormData({
            ...formData,
            caracteristicas: [...formData.caracteristicas, nuevaCaracteristica]
        });
    };

    const handleCategoriaChange = (value) => {
        const nuevaCategoria = value;

        if (formData.categorias.includes(nuevaCategoria)){
            const nuevoArray = formData.categorias.filter(c => c!== value)
            setFormData({
                ...formData,
                categorias: nuevoArray
            });
            return
        }

        setFormData({
            ...formData,
            categorias: [...formData.categorias, nuevaCategoria]
        });
    };

    const handleSubmit = () => {
        fetch("http://3.135.246.162/api/modelo", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    return (
        <div>
            <section className='sectionAddVehicle'>
                <div className='add-vehicle-container'>
                    <h2>Agregar Modelo</h2>
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
                        <select name="" id=""
                            value={formData.marca}
                            onChange={(e) => handleInputs("marca", e.target.value)}
                        >
                            <option disabled selected value="">Selecciona una marca</option>
                            {marcas.map((m) => (<option key={m.id}>{m.marca}</option>))}
                        </select>
                        <br />
                        <label className="label-field">Categoria:</label>
                        <select name="" id=""
                            value=""
                            onChange={(e) => handleCategoriaChange(e.target.value)}
                        >
                            <option disabled selected value="">Selecciona una categoria</option>
                            {categorias.map((c) => (<option key={c.id}>{c.categoria}</option>))}
                        </select>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                            {formData.categorias.map(c => (
                                <div className="item-container">
                                    <span>{c}</span>
                                    <button onClick={(e) => { e.preventDefault(), handleCategoriaChange(c) }}>X</button>
                                </div>
                            ))}
                        </div>
                        <br />
                        <label className="label-field">Caracteristicas:</label>
                        <select name="" id=""
                            onChange={e => handleCaracteristicaChange(e.target.value)}
                        >
                            <option disabled selected value="">Selecciona una Caracteristica</option>
                            {caracteristicas.map((c) => (<option key={c.id}>{c.caracteristica}</option>))}
                        </select>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                            {formData.caracteristicas.map(c => (
                                <div className="item-container">
                                    <span>{c}</span>
                                    <button onClick={(e) => { e.preventDefault(), handleCaracteristicaChange(c) }}>X</button>
                                </div>
                            ))}
                        </div>
                        <br />
                        <button type="button" onClick={handleSubmit} className="submit-button">
                            Agregar Modelo
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AdminAddModelForm