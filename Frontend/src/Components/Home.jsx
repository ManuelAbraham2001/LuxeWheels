import React, { useEffect, useState } from 'react'
import Card from './Card'

import "./styles/Home.css"
import Paginacion from './Paginacion';

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
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [isFilter, setIsFilter] = useState(false)
    const [page, currentPage] = useState(1)
    const [totalElements, setTotalElements] = useState(0)
    const [filterElements, setFilterElements] = useState(0)
    const [fechaInicio, setFechaInicio] = useState(null)
    const [fechaFin, setFechaFin] = useState(null)
    const fechaActual = new Date().toISOString().split('T')[0];


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
            .then((data) => { setVehicles(data.content), setTotalElements(data.totalElements), setFilterElements(data.numberOfElements) })
            .then(() => setLoading(false))
    }

    const filterRequest = () => {
        setLoading(true);
        fetch(`http://3.135.246.162/api/vehiculos?page=${page}&categorias=${encodeURIComponent(selectedCategorias.join(','))}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => { setVehicles(data.content), setFilterElements(data.numberOfElements) })
            .then(() => { setLoading(false), setIsFilter(true) });
    };

    const handleAddCategorias = (categoria) => {
        setSelectedCategorias((prevSelectedCategorias) => {
            if (prevSelectedCategorias.includes(categoria)) {
                return prevSelectedCategorias.filter((c) => c !== categoria);
            } else {
                return [...prevSelectedCategorias, categoria];
            }
        });
    };

    const onPageChange = () => {
        console.log('asd');
    }


    return (
        <main>
            <div className="buscador">
                <div className="fechas">
                    <div className="search-date">
                        <label>Desde </label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={e => setFechaInicio(e.target.value)}
                            min={fechaActual}
                        />
                    </div>
                    <div className="search-date">
                        <label>Hasta </label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={e => setFechaFin(e.target.value)}
                            min={fechaInicio}
                        />
                    </div>
                </div>
                <div className="buscar">
                    <button onClick={() => { loadVehicles(), setIsFilter(true) }} className="btn-buscar">
                        <strong>Buscar</strong>
                    </button>
                </div>
            </div>
            <div className='home-container'>
                {isFilter && (
                    <div className='filter-container'>
                        <div className='filter-results'>
                            <span>Mostrando resultados: {filterElements} de {totalElements}</span>
                            <div className="categorias">
                                <h3>Categorias</h3>
                                {categorias.map((c) => (
                                    <div>
                                        <span>{c.categoria}</span>
                                        <input
                                            onChange={() => handleAddCategorias(c.categoria)}
                                            value={c.categoria}
                                            key={c.id}
                                            checked={selectedCategorias.includes(c.categoria)}
                                            type='checkbox'></input>
                                    </div>
                                ))}
                                <button onClick={() => { filterRequest(selectedCategorias), setLoading(true) }}>Aplicar filtros</button>
                            </div>
                            <button onClick={() => { loadVehicles(), setLoading(true), setSelectedCategorias([]) }}>Eliminar filtros</button>
                        </div>
                    </div>
                )}
                <div className="card-grid">
                    {loading ? <>Cargando</> : vehicles.map((a) => <Card auto={a} key={a.id} />)}
                </div>

            </div>
            <div style={{width: "100%"}}>
                <Paginacion totalItems={totalElements} itemsPerPage={10} onPageChange={onPageChange}></Paginacion>
            </div>
        </main>
    );
}

export default Home