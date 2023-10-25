import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDentiStates } from '../Context/Context'


//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Detail = () => {
 
  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un user en especifico

  const {state, dispatch} = useDentiStates()
  const params = useParams()
  const {name,email,phone,website} = state.dentista

  const url = 'https://jsonplaceholder.typicode.com/users/' + params.id

  useEffect(() => {
      axios(url)
      .then(res => dispatch({type: 'GET_DENTISTA', payload: res.data}))
  }, [])


  return (
    <>
    <div class="divDetail">

      <h1>Detail Dentista id </h1>
      <h2>Nombre: {name}</h2>
      <img src="/images/doctor.jpg" alt="" className="card-image"/>
      <h3>Email: {email}</h3>
      <h3>Telefono: {phone}</h3>
      <h3>Website: {website}</h3>
      {/* Deberan mostrar el name - email - phone - website por cada user en especifico */}
    </div>
    </>
  )
}

export default Detail