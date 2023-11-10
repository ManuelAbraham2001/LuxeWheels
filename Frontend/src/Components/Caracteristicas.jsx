import React from 'react'

const Caracteristicas = ({ caracteristicas }) => {

    return (
        <>
        <div className='caracteristicas-main'>
            <h2>CARACTERISTICAS</h2>
            <div className='caracteristicas-list-container'>
                {caracteristicas.length > 0 ? caracteristicas.map(c => (
                    <div className='caracteristicas-list' key={c.id}>
                        <img style={{ width: "20px" }} src={c.url} alt="" />
                        <span style={{ fontSize: "16px" }}>{c.caracteristica}</span>
                    </div>
                )) : <div>No hay caracteristicas para mostrar</div>}
            </div>
        </div>
        </>
    )
}

export default Caracteristicas