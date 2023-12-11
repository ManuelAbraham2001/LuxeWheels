import React from 'react'
import { Slide } from 'react-slideshow-image';
import "./styles/Gallery.css"
import 'react-slideshow-image/dist/styles.css'
import close from '../../public/images/close.svg'

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    height: '80vh'
}

const SliderImagesGallery = ({ fotos, toggleGallery }) => {
    return (
        <div style={{ width: "95%", margin: "0 auto", background: "white", position: "relative" }} className="slide-container">
            <div style={{position: "absolute", zIndex: "10"}} className="cerrar-galeria">
                <img style={{cursor: "pointer"}} onClick={() => toggleGallery(false)} width={"50px"} src={close} alt="" />
            </div>
            <Slide responsive={true} arrows={true}>
                {fotos.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

export default SliderImagesGallery