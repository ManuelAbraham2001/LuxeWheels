import React from 'react'
import { Oval } from 'react-loader-spinner'

const LoadingSpinner = () => {
  return (
    <div style={{zIndex: 100}} className="spinner-container overlaySpinner">
    <Oval
        height={80}
        width={80}
        color="#FFBE3F"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#ffbe3fd4"
        strokeWidth={2}
        strokeWidthSecondary={2}
    />
</div>
  )
}

export default LoadingSpinner