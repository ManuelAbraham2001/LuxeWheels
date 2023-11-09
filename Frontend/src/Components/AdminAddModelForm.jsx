import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminAddModelForm = () => {

    const [marcas, setMarcas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [formData, setFormData] = useState({
        modelo: "",
        marca: "",
        categoria: ""
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
    }, [])

    const handleInputs = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

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
                            value={formData.categoria}
                            onChange={(e) => handleInputs("categoria", e.target.value)}
                        >
                            <option disabled selected value="">Selecciona una categoria</option>
                            {categorias.map((c) => (<option key={c.id}>{c.categoria}</option>))}
                        </select>
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