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

    useEffect(() => {
        async function loadVehicles() {
            await fetch('http://3.135.246.162/api/vehiculos', {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => setVehicles(data))
                .then(() => setLoading(false))
        }

        loadVehicles();
    }, []);



    return (
        <main>
            <div className="buscador">

                <div className="buscar">
                    <input type="text" placeholder="Escribe aquí..." id="buscar" />
                    <button className="btn-buscar">
                        <strong>Buscar</strong>
                    </button>
                </div>

                <div>
                    <select name="recomendacion" id="reco">
                        <option value="seleccion">Recomendaciones</option>
                    </select>
                </div>

                <div className="Categorias">
                    <select name="categoria" id="cate">
                        <option value="seleccion">Categorías</option>
                    </select>
                </div>

            </div>

            <div className="card-grid">
                {loading ? <>Cargando</> : vehicles.map((a) => <Card auto={a} key={a.id} />)}
            </div>

        </main>
    );
}

export default Home














