import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import svg from './../../public/images/arrow-left-solid.svg'
import './styles/DetailCard.css'
import Caracteristicas from "./Caracteristicas";
import { useNavigate, useParams } from "react-router-dom";
import Politicas from "../Routes/Politicas";
import LoadingSpinner from "./LoadingSpinner";


const Detail = () => {

	const { id } = useParams();
	const [auto, setAuto] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const token = localStorage.getItem('jwt')
	const navigate = useNavigate();



	useEffect(() => {

		fetch(`http://3.135.246.162/api/vehiculos/${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
		.then(res => res.json())
		.then(data => { setAuto(data), setIsLoading(false)})

	}, [])


	const handleRedirect = () => {

		if (!token) {
			navigate('/login', {
				state: { message: 'Debes iniciar sesión o registrarte para poder comprar' },
			})
		} else {
			navigate('/reservar', {
				state: { auto: auto, token: token}
			})
		}

	}

	return (
		<>
			{isLoading ?
				<LoadingSpinner />
				:
				<div className="main-container">
					<div className="detail-vehicle">
						<h1>{auto.modelo.marca.marca} {auto.modelo.modelo} {auto.anio?.anio}</h1>
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
						<div className="politicas-calendario">
							<Politicas></Politicas>
							<button onClick={handleRedirect} className="reservar-button">Iniciar reserva</button>
						</div>
					</div>
				</div>}
		</>
	);
};

export default Detail