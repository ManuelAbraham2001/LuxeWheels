import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from './Card'
import { Link } from "react-router-dom";
import "./styles/Home.css"
import Paginacion from './Paginacion';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import isFav from '../../public/images/isFav.svg'
import noFav from '../../public/images/noFav.svg'
import { useRentacarStates } from '../Context/Context';

function getRandomObjects(jsonData, count) {
    const shuffledData = [...jsonData];
    for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    return shuffledData.slice(0, count);
}

const Home = () => {
    const token = localStorage.getItem("jwt")
    const [error, setError] = useState(false)
    const [favs, setFavs] = useState([])
    const [localIdsProductosFavoritos, setLocalIdsProductosFavoritos] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [randomCard, setRandomCard] = useState([]);
    const [categorias, setCategorias] = useState([])
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [isFilter, setIsFilter] = useState(false)
    const [page, currentPage] = useState(1)
    const [totalElements, setTotalElements] = useState(0)
    const [filterElements, setFilterElements] = useState(0)
    const [busqueda, setBusqueda] = useState('')
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [maxDate, setMaxDate] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const feedbackOptions = [
        { id: 1, name: 'Ford' },
        { id: 2, name: 'Volkswagen' },
        { id: 3, name: 'Fiat' },
        { id: 4, name: 'Peugeot' },
        { id: 5, name: 'Chevrolet' },
        { id: 6, name: 'Toyota' },
        { id: 7, name: 'Tesla' },
        { id: 8, name: 'Amarok' },
        { id: 9, name: 'Tiguan' },
        { id: 10, name: 'Volkswagen Tiguan' },
        { id: 11, name: 'Volkswagen Amarok' },
        { id: 12, name: 'Peugeot 208' },
        { id: 13, name: 'Chevrolet Onix' },
    ];
    const [feedback, setFeedback] = useState('');
    const { state, dispatch } = useRentacarStates()

    const handleFav = id => {
        if (token) {
                        const updatedIds = localIdsProductosFavoritos.includes(id)
                        ? localIdsProductosFavoritos.filter((favId) => favId !== id)
                        : [...localIdsProductosFavoritos, id];
        
                    setLocalIdsProductosFavoritos(updatedIds);
            dispatch({ type: "TOGGLE_FAV", payload: id })
        } else {
            setError(true)
            return
        }
    }

    // const [states, setStates] = useState({
    //     vehicles: [],
    //     loading: true,
    //     categorias: [],
    //     selectedCategorias: [],
    //     isFilter: false,
    //     page: 1,
    //     totalElements: 0,
    //     filterElements: 0,
    //     busqueda: "",
    //     dateRange: [null, null],
    //     startDate: dateRange[0],
    //     endDate: dateRange[1],
    //     maxDate: null,
    //     excludeDates: [],
    //     isMobile: false
    // })

    // refactorizar todos los states y pasarlos a un solo objeto

    const handleSelect = (selected) => {
        setBusqueda(selected.name);
    };

    const handleBusqueda = value => {
        setBusqueda(value)
    }

    useEffect(() => {
        fetch("http://3.135.246.162/api/categorias", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setCategorias(data))

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const idsProductosFavoritos = favs.map(v => v.id);


    useEffect(() => {
        loadVehicles();
        getFavs()
        setLocalIdsProductosFavoritos(idsProductosFavoritos)
    }, [page])

    const renderizarIcono = (idProducto) => {
        const isFavorito = localIdsProductosFavoritos.includes(idProducto);
        return idsProductosFavoritos.includes(idProducto) ? (
            <img className='fav'
                onClick={() => handleFav(idProducto)}
                style={{ width: "200px !important", cursor: "pointer" }}
                src={isFavorito ? isFav : noFav}
                alt={isFavorito ? "Favorito" : "No favorito"}
            />
        ) : (
            <img
            className='fav'
                onClick={() => handleFav(idProducto)}
                src={isFavorito ? isFav : noFav}
                alt={isFavorito ? "Favorito" : "No favorito"}
            />
            )
    };

    const getFavs = () => {
        if (token != null) {
            fetch("http://3.135.246.162/api/usuarios/favoritos", {
                method: "GET",
                headers: {
                    authorization: "Bearer " + token
                }
            }).then(res => res.json())
                .then(data => setFavs(data))
        }
    }

    const handleDate = date => {
        setDateRange(date)
    }

    async function loadVehicles() {
        await fetch(`http://3.135.246.162/api/vehiculos?page=${page}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => { setVehicles(data.content), setTotalElements(data.totalElements), setFilterElements(data.numberOfElements) })
            .then(() => setLoading(false))
    }

    const searchVehicles = () => {
        setLoading(true);
        fetch(`http://3.135.246.162/api/vehiculos?page=${page}&busqueda=${busqueda}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => { setVehicles(data.content), setTotalElements(data.totalElements), setFilterElements(data.numberOfElements) })
            .then(() => setLoading(false))
    }

    const filterRequest = () => {
        setLoading(true);
        fetch(`http://3.135.246.162/api/vehiculos?page=${page}&busqueda=${busqueda}&categorias=${encodeURIComponent(selectedCategorias.join(','))}`, {
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

    const handleFavs = () => {
        console.log("Token en handleFavs:", token);
        if (token && token.trim() !== "") {
            window.location.replace("/favs");
        } else {
            setError(true);
            return;
        }
    }

    useEffect(() => {
        if (error) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [error])

    const inputValue = `${startDate ? startDate.toLocaleDateString() + " -" : ''}${endDate ? ` ${endDate.toLocaleDateString()}` : ''}`;

    return (
        <main>
            <div className="buscador">
                <div className='buscador-title'>
                    <h1 >¡Busca tu auto ideal!</h1>
                    <p>¡Encuentra el vehículo perfecto para tu próxima aventura con nuestro servicio de alquiler de vehículos! Explora una amplia variedad de opciones, desde autos compactos ideales para la ciudad hasta espaciosas SUVs para viajes en familia</p>
                </div>
                <div className='buscador-form'>
                    <div style={{ width: "40%" }} className='buscador-form-input'>
                        {/* <input value={busqueda} onChange={(e) => handleBusqueda(e.target.value)} type="text" /> */}
                        <ReactSearchAutocomplete
                            items={feedbackOptions}
                            onSelect={handleSelect}
                            onSearch={handleBusqueda}
                            onChange={(e) => handleBusqueda(e)}
                            // onSearch={(value) => setFeedback(value)}
                            formatResult={item => <span style={{ display: 'block', textAlign: 'left', cursor: "pointer" }}>{item.name}</span>}
                            placeholder="Busca por marca o modelo"
                            
                        />
                    </div>
                    <div className='buscador-form-input'>
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={fecha => handleDate(fecha)}
                            minDate={new Date()}
                            maxDate={maxDate}
                            monthsShown={isMobile ? 1 : 2}
                            isClearable
                            customInput={<div className='buscador-form-input'><input value={inputValue} type="text" placeholder='Desde - Hasta' /></div>}
                        />
                    </div>
                    <div className="buscar">
                        <button onClick={() => { searchVehicles(), setIsFilter(true) }} className="btn-buscar">
                            Buscar
                        </button>
                    </div>
                    <div className='favs'>
                        <button onClick={handleFavs} className='btn-fav'>
                            Favoritos
                        </button>
                    </div>
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
                    {loading ? <>Cargando</> : vehicles.map((a) => <Card renderizarIcono={renderizarIcono} auto={a} key={a.id} />)}
                </div>

            </div>
            <div style={{ width: "100%" }}>
                <Paginacion totalItems={totalElements} itemsPerPage={10} currentPage={currentPage} page={page}></Paginacion>
            </div>
            {error ?
                <div className="overlay ">
                    <div className="favoritoCartel">
                        <h1>Debes iniciar sesion para marcar un vehiculo como favorito</h1>
                        <div className="acciones">
                            <a href="/login">Iniciar sesion</a>
                            <button onClick={() => setError(false)}>Continuar sin iniciar sesion</button>
                        </div>
                    </div>
                </div> : null}
        </main>
    );
}

export default Home