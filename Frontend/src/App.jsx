// App.jsx
import { Route, Routes } from 'react-router-dom';
import { AuthMiddleware } from './Middlewares/AuthMiddleware';
import { GuestMiddleware } from './Middlewares/GuestMiddleware';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import RegisterForm from "./Components/RegisterForm";
import Admin from './Components/Admin';
import AdminListCategories from './Components/AdminListCategories';
import AdminListUsers from './Components/ListUsers';
import AdminListVehicles from './Components/AdminListVehicles';
import AdminAddVehicleForm from './Components/AdminAddVehicleForm';
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Favs from './Routes/Favs';
import { useEffect, useState } from 'react';
import { useRentacarStates } from './Context/Context';
import AdminAddModelForm from './Components/AdminAddModelForm';
import Detail from './Components/Detail';
import AdminAddCaracteristicas from './Components/AdminAddCaracteristicas';
import Politicas from './Routes/Politicas';
import Reserva from './Components/Reserva';
import UserInfo from './Components/UserInfo';
import AdminListModels from './Components/AdminListModels';
import SliderImagesGallery from './Components/SliderImagesGallery';
import WhatsappButton from './Components/WhatsappButton';

const App = () => {
    // const token = localStorage.getItem("jwt")
    const { state, dispatch } = useRentacarStates();

    return (
        <>
            <div className="App">
                <Navbar />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route element={<AuthMiddleware isAuthenticated={state.isAuthenticated} isAdmin={state.isAdmin} />}>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/listusers" element={<AdminListUsers />} />
                        <Route path="/admin/listvehicles" element={<AdminListVehicles />} />
                        <Route path="/admin/addmodel" element={<AdminAddModelForm />} />
                        <Route path="/admin/addvehicle" element={<AdminAddVehicleForm />} />
                        <Route path="/admin/listcategories" element={<AdminListCategories />} />
                        <Route path="/admin/addCaracteristicas" element={<AdminAddCaracteristicas />} />
                        <Route path="/admin/listmodels" element={<AdminListModels />} />
                        <Route path="/favs" element = {<Favs/>}/>
                        <Route path="/reservar" element = {<Reserva/>}/>
                        <Route path="/perfil" element = {<UserInfo/>}/>
                        <Route path='/imagenes' element={<SliderImagesGallery/>}></Route>
                    </Route>
                    <Route path="/detail/:id" element={<Detail/>} />

                    <Route path="/politicas" element = {<Politicas/>}/>
                    <Route element={<GuestMiddleware isAuthenticated={state.isAuthenticated} />}>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Route>
                </Routes>
                <WhatsappButton />
                <Footer />
            </div>
        </>
    )
};

export default App;



/*<Navbar isAuthenticated={isAuthenticated}/>*/