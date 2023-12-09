import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import svg from './../../public/images/arrow-left-solid.svg'
import './styles/DetailCard.css'
import Caracteristicas from "./Caracteristicas";
import { useNavigate, useParams } from "react-router-dom";
import Politicas from "../Routes/Politicas";
import LoadingSpinner from "./LoadingSpinner";
import { Rating } from "react-simple-star-rating";


const Detail = () => {

	const { id } = useParams();
	const [auto, setAuto] = useState({})
	const [resenias, setResenias] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const token = localStorage.getItem('jwt')
	const navigate = useNavigate();


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
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleRedirect = () => {

		if (!token) {
			navigate('/login', {
				state: { message: 'Debes iniciar sesión o registrarte para poder comprar' },
			})
		} else {
			navigate('/reservar', {
				state: { auto: auto, token: token }
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
						<div className="detail-vehicle-title">
							<h1>{auto.modelo.marca.marca} {auto.modelo.modelo} {auto.anio?.anio}</h1>
							{auto.promedioCalificacionVehiculo != null ? 
							<Rating
								size={35}
                                readonly={true}
                                initialValue={auto?.promedioCalificacionVehiculo.promedioCalificacaiones}
								allowFraction={true}
                            /> :
							<span style={{fontSize: "12px", }}>Aun no se han registrado valoraciones para este vehiculo.</span>
						}
						</div>
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
						<button onClick={handleRedirect} className="reservar-button">Iniciar reserva</button>
						<div className="politicas-calendario">
							{/* <Politicas></Politicas> */}
							<div className="resenias">
								<h1 style={{ textAlign: "center", width: "100%" }}>Reseñas de los usuarios</h1>
								{<span>Un total de {auto.promedioCalificacionVehiculo?.totalCalificaciones || 0} usuarios han valorado este vehiculo.</span>}
								
								<div className="resenias-container">
									{resenias.map(r => (
										<div className="resenia-content">
											<div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "space-between" }}>
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
						</div>
					</div>
				</div>}
		</>
	);
};

export default Detail