import React, { useEffect, useState } from 'react'
import Card from './Card'

import "./styles/Home.css"

function getRandomObjects(jsonData, count) {
    const shuffledData = [...jsonData];
    for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    return shuffledData.slice(0, count);
}

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [randomCard, setRandomCard] = useState([]);
    const [categorias, setCategorias] = useState([])
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [isFilter, setIsFilter] = useState(false)
    const [page, currentPage] = useState(1)
    const [totalElements, setTotalElements] = useState(0)
    const [filterElements, setFilterElements] = useState(0)

    console.log(totalElements);

    useEffect(() => {
        loadVehicles();

        fetch("http://3.135.246.162/api/categorias", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setCategorias(data))

    }, []);

    async function loadVehicles() {
        await fetch(`http://3.135.246.162/api/vehiculos?page=${page}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {setVehicles(data.content), setTotalElements(data.totalElements), setFilterElements(data.numberOfElements)})
            .then(() => setLoading(false))
    }

    const filterRequest = (categoria) => {

        setLoading(true)
        fetch(`http://3.135.246.162/api/vehiculos?page=${page}&categoria=${categoria}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {setVehicles(data.content), setFilterElements(data.numberOfElements)})
            .then(() => { setLoading(false), setIsFilter(true)})
    };

    return (
        <main>
            <div className="buscador">
                <div className="fechas">
                    <div className="search-date">
                        <label>Desde </label>
                        <input type="date" />
                    </div>
                    <div className="search-date">
                        <label>Hasta </label>
                        <input type="date" />
                    </div>
                </div>
                <div className="buscar">
                    <button onClick={() => { loadVehicles(), setIsFilter(true) }} className="btn-buscar">
                        <strong>Buscar</strong>
                    </button>
                </div>
            </div>
            {isFilter ? <div className='filter-results'>
                <span>Mostrando resultados: {filterElements} de {totalElements}</span>
                <div className="categorias">
                    <select name="categoria" id="cate" onChange={e => setSelectedCategoria(e.target.value)} value={selectedCategoria}>
                        <option disabled selected value="">Seleccionar</option>
                        {categorias.map((c) => (
                            <option key={c.id} value={c.categoria}>
                                {c.categoria}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => { filterRequest(selectedCategoria), setLoading(true) }}>Aplicar filtros</button>
                </div>
                <button onClick={() => { loadVehicles(), setLoading(true) }}>Eliminar filtros</button>
            </div> : null}
            <div className="card-grid">
                {loading ? <>Cargando</> : vehicles.map((a) => <Card auto={a} key={a.id} />)}
            </div>
        </main>
    );
}

export default Home