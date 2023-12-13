import React, { useEffect, useState } from 'react'
import wpLogo from '../../public/images/whatsapp.svg'
import Swal from 'sweetalert2';

const WhatsappButton = () => {

    const message = encodeURIComponent('Hola, quisiera saber más información sobre...');

    const phoneNumber = '+5491154593727';

    const [errorMessage, setErrorMessage] = useState(null);


    const handleWhatsappButtonClick = async () => {
        try {
            const confirmResult = await Swal.fire({
                title: "¿Deseas comunicarte a través de WhatsApp?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
                reverseButtons: true,
            });

            if (confirmResult.isConfirmed) {
                const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
                window.open(whatsappLink, '_blank', 'noopener noreferrer');
            }
        } catch (error) {
            setErrorMessage('Error al intentar abrir WhatsApp. Por favor, inténtalo nuevamente.');
            console.error(error);
        }
    };

    return (
        <div>
            <button id='wpButton' onClick={handleWhatsappButtonClick}>
                <img style={{ width: '70px' }} src={wpLogo} alt="WhatsApp" />
            </button>
            {errorMessage &&
                Swal.fire({
                    title: errorMessage,
                    icon: "error"
                })
            }
        </div>
    );
}

export default WhatsappButton