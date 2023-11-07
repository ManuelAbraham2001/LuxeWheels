import { Navigate } from "react-router-dom"
import React, { useEffect } from 'react'

const ProtectedRoute = ({ children, isAdmin }) => {

    if (isAdmin === false) {
        return <Navigate to={"/"} />
    }

    if(isAdmin === true){
        return children
    }

    return children
}

export default ProtectedRoute