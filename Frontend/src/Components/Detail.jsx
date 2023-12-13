import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import svg from './../../public/images/arrow-left-solid.svg'
import './styles/DetailCard.css'
import Caracteristicas from "./Caracteristicas";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { Rating } from "react-simple-star-rating";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Politicas from "../Routes/Politicas";


const Detail = () => {

	const { id } = useParams();
	const [auto, setAuto] = useState({})
	const [resenias, setResenias] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const token = localStorage.getItem('jwt')
	const navigate = useNavigate();
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [isMobile, setIsMobile] = useState(false)
	const [maxDate, setMaxDate] = useState(null)
	const [excludeDates, setExcludeDates] = useState([])


	useEffect(() => {
		Promise.all([
			fetch(`http://3.135.246.162/api/vehiculos/${id}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			}).then(res => res.json()),
			fetch(`http://3.135.246.162/api/vehiculos/resenias/${id}?page=1`, { // ?page=1
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			}).then(res => res.json())
		])
			.then(([autoData, reseniasData]) => {
				setAuto(autoData);
				setResenias(reseniasData)
			}),
			fetch(`http://3.135.246.162/api/reservas/${id}`, {
				method: 'GET',
				headers: {
					'content-type': "application/json"
				}
			}).then(res => res.json())
				.then(data => {
					const reservas = data
					const compararPorInicio = (a, b) => new Date(a.inicio) - new Date(b.inicio);
					const arrayOrdenado = reservas.sort(compararPorInicio);
					const auxFechas = arrayOrdenado.map(f => ({ start: new Date(f.inicio), end: new Date(f.cierre + 'T23:59:59') }))
					setExcludeDates(auxFechas)
				})
				.finally(() => {
					setIsLoading(false);
				});

		const handleResize = () => {
			if (window.innerWidth <= 1700) {
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

	const handleRedirect = () => {

		if (!token) {
			navigate('/login', {
				state: { message: 'Debes iniciar sesión o registrarte para poder comprar' },
			})
		} else {
			navigate('/reservar', {
				state: { auto: auto, token: token, excludeDates: excludeDates, start: startDate, end: endDate }
			})
		}

	}

	const handleDate = date => {
		const nuevaFecha = new Date(date)
		const excludeDatesFilter = excludeDates.map(fecha => fecha.start)
		const fechasFuturas = excludeDatesFilter.filter(fecha => fecha.getTime() > nuevaFecha.getTime());
		setMaxDate(fechasFuturas[0])
		setDateRange(date)
	}

	return (
		<>
			{isLoading ?
				<LoadingSpinner />
				:
				<div className="main-container">
					<div className="detail-vehicle">
						<div className="detail-vehicle-title">
							<h1>{auto.modelo.marca?.marca} {auto.modelo.modelo} {auto.anio?.anio}</h1>
							{auto.promedioCalificacionVehiculo != null ?
								<Rating
									size={35}
									readonly={true}
									initialValue={auto?.promedioCalificacionVehiculo.promedioCalificacaiones}
									allowFraction={true}
								/> :
								<span style={{ fontSize: "12px", }}>Aun no se han registrado valoraciones para este vehiculo.</span>
							}
						</div>
						<div className="arrow-back">
							<a href="/">
								<img src={svg} />
							</a>
						</div>
					</div>
					<Gallery fotos={auto.fotos} />
					<span style={{ padding: "20px", background: "white", marginLeft: "20px", borderRadius: "10px", fontWeight: "bold" }}>Precio por dia: ${auto.precio}</span>
					<div className="detail-conainer">
						<div className="detail-descripcion">
							<h2>DESCRIPCION</h2>
							<p>{auto.descripcion}</p>
						</div>
						<Caracteristicas caracteristicas={auto.modelo.caracteristicas}></Caracteristicas>
						<div className="politicas-calendario">
							<div style={{ margin: "0 auto" }} className='reserva-calendario'>
								<h2>Selecciona tu fecha de reserva</h2>
								<DatePicker
									selectsRange={true}
									startDate={startDate}
									endDate={endDate}
									onChange={fecha => handleDate(fecha)}
									minDate={new Date()}
									{...(maxDate !== null && { maxDate })}
									monthsShown={isMobile ? 1 : 2}
									excludeDateIntervals={excludeDates}
									isClearable
									inline
									disabledKeyboardNavigation
								/>
							</div>
							<button onClick={handleRedirect} className="reservar-button">Iniciar reserva</button>

							<div className="resenias">
								<h1 style={{ textAlign: "center", width: "100%" }}>Reseñas de los usuarios</h1>
								{<span>Un total de {auto.promedioCalificacionVehiculo?.totalCalificaciones || 0} usuarios han valorado este vehiculo.</span>}

								<div className="resenias-container">
									{resenias.map(r => (
										<div className="resenia-content">
											<div className="resenia-content-rating" style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "space-between" }}>
												<h2>{r.usuario}</h2>
												<Rating
													size={30}
													readonly={true}
													initialValue={r.calificacion}
													allowFraction={true}
												/>
											</div>
											<div>
												{r?.resenia ? <p>"{r.resenia}"</p> : null}
											</div>
											<span>{r.fecha}</span>
										</div>
									))}
								</div>

							</div>
							<div style={{ margin: "20px 0" }}>
								<Politicas></Politicas>

							</div>
						</div>
					</div>
				</div>}
		</>
	);
};

export default Detail