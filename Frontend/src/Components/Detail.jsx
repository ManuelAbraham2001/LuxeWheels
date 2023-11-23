import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import svg from './../../public/images/arrow-left-solid.svg'
import './styles/DetailCard.css'
import Caracteristicas from "./Caracteristicas";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Detail = () => {

	const { id } = useParams();
	const [auto, setAuto] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [maxDate, setMaxDate] = useState(null)
	const [excludeDates, setExcludeDates] = useState([
		{ start: new Date('2023-12-05'), end: new Date('2023-12-15') },
		{ start: new Date('2023-12-20'), end: new Date('2023-12-25') },
	])
	const [error, setError] = useState(true)

	useEffect(() => {
		fetch("http://3.135.246.162/api/vehiculos/" + id, {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		}).then(res => res.json())
			.then(data => setAuto(data))
			.then(() => setIsLoading(false))
	}, [])

	const handleDate = date => {
		const nuevaFecha = new Date(date)
		const excludeDatesFilter = excludeDates.map(fecha => fecha.start)
		const fechasFuturas = excludeDatesFilter.filter(fecha => fecha.getTime() > nuevaFecha.getTime());
		setMaxDate(fechasFuturas[0])
		setDateRange(date)
	}

	return (
		<>
			{isLoading ? <div>Cargando...</div> :
				<div className="main-container">
					<div className="detail-vehicle">
						<h1>{auto.modelo.marca.marca} {auto.modelo.modelo} {auto.anio.anio}</h1>
						<div className="arrow-back">
							<a href="/">
								<img src={svg} />
							</a>
						</div>
					</div>
					<Gallery fotos={auto.fotos} />
					<div className="detail-conainer">
						<div className="detail-descripcion">
							<h2>DESCRIPCION</h2>
							<p>{auto.descripcion}</p>
						</div>
						<Caracteristicas caracteristicas={auto.modelo.caracteristicas}></Caracteristicas>
						{error ? <div className="error-calendar">
							<span>No se puede obtener información sobre las fechas disponibles en este momento. Por favor vuelta a intentarlo.</span>
							<button onClick={() => setError(false)}>Reintentar</button>
						</div> :
							<DatePicker
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								onChange={fecha => handleDate(fecha)}
								minDate={new Date()}
								maxDate={maxDate}
								// monthsShown={isMobile ? 1 : 2}
								monthsShown={2}
								excludeDateIntervals={excludeDates}
								isClearable
								inline
								disabledKeyboardNavigation
							/>
						}
					</div>
				</div>}
		</>
	);
};

export default Detail