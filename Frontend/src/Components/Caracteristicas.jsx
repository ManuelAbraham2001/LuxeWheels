import React, { useEffect, useState } from 'react'

const Caracteristicas = () => {

    const [caracteristicas, setCaracteristicas] = useState([])

    useEffect(() => {
        fetch("http://3.135.246.162/api/caracteristicas", {
            method: "GET",
        }).then(res => res.json())
        .then(data => setCaracteristicas(data))
    }, [])

  return (
    <>
        {/* <h1>Caracteristicas</h1> */}
        {caracteristicas.map(c => (
            <div style={{display: "flex", width: "100%", alignItems: "center"}} key={c.id}>
                <img style={{width: "20px"}} src={c.url} alt="" />
                <h1 style={{fontSize: "16px"}}>{c.caracteristica}</h1>
            </div>
        ))}
    </>
  )
}

export default Caracteristicas