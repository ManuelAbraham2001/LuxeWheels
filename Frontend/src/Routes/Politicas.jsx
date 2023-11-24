import React from 'react'
import "../Components/styles/Politicas.css"


const Politicas = () => {
  return (
    <>

        <div class="container">
        <div class="policy">
            <h2>1. Reservas</h2>
            <p>Las reservas de vehículos se realizarán a través de nuestro sitio web o aplicación móvil</p>
            <p>Se requiere una tarjeta de crédito válida para confirmar y garantizar la reserva.</p>
        </div>
        <div class="policy">
            <h2>2. Cancelaciones</h2>
            <p>Las cancelaciones deben realizarse con al menos 24 horas de anticipación para recibir un reembolso completo.</p>
            <p>Cancelaciones realizadas dentro de las 24 horas anteriores a la hora de recogida estarán sujetas a cargos.</p>
        </div>
        <div class="policy">
            <h2>3. Seguro</h2>
            <p>Ofrecemos opciones de seguro adicional para cubrir daños y responsabilidades..</p>
            <p>Se puede requerir un depósito reembolsable como garantía.</p>
        </div>
        <div class="policy">
            <h2>4. Mantenimiento y Combustible:</h2>
            <p>Los vehículos se proporcionarán con un nivel de combustible específico.</p>
            <p>Se espera que los clientes devuelvan los vehículos con el mismo nivel de combustible.</p>
            <p>Cualquier daño al vehículo debe ser informado de inmediato.</p>
        </div>
        </div>
      
    </>
  )
}

export default Politicas