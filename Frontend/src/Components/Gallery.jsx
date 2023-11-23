import React from 'react'
import noImg from '../../public/images/no-imagen.jpg'
import imagen1 from '../../public/images/audi_a6_quattro_2016.jpg'
import imagen2 from '../../public/images/audi_q7_2015.jpg'
import imagen3 from '../../public/images/audi_q5_2017.jpg'
import imagen4 from '../../public/images/audi_q7_2017.jpg'
import './styles/Gallery.css'



const Gallery = ({ fotos }) => {
    console.log(fotos);
    return (
        <>
            <div className="gallery-main">
                <div className="gallery-container">
                    <div className="main-img">
                        <img src={fotos[0]?.url || noImg} alt="Imagen Principal" />
                    </div>
                    <div className="img-grid">
                        <div className="grid-item">
                            <img src={fotos[1]?.url || noImg} alt="Imagen 1" />
                        </div>
                        <div className="grid-item">
                            <img src={fotos[2]?.url || noImg} alt="Imagen 2" />
                        </div>
                        <div className="grid-item">
                            <img src={fotos[3]?.url || noImg} alt="Imagen 3" />
                        </div>
                        <div className="grid-item">
                            <img src={fotos[4]?.url || noImg} alt="Imagen 4" />
                        </div>
                    </div>
                </div>
                <div className="ver-mas">
                    <a href='#'>Ver más</a>
                </div>
            </div>

        </>
    )
}

export default Gallery