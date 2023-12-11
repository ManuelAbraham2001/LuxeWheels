import React, { useState } from 'react'
import noImg from '../../public/images/no-imagen.jpg'
import './styles/Gallery.css'
import SliderImagesGallery from './SliderImagesGallery';



const Gallery = ({ fotos }) => {
    console.log(fotos);

    const [gallery, toggleGallery] = useState(false);

    return (
        <>
            {gallery ?
                <div className='overlay'>
                    <SliderImagesGallery fotos={fotos} toggleGallery={toggleGallery} />
                </div>
                : null}
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
                    <button onClick={() => toggleGallery(!gallery)}>Ver más</button>
                </div>
            </div>

        </>
    )
}

export default Gallery