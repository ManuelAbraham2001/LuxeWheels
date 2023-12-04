import React from 'react'
import noImg from '../../public/images/no-imagen.jpg'
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