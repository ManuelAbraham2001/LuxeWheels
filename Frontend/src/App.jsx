



// App.jsx
import { Route, Routes } from 'react-router-dom';
import { AuthMiddleware } from './Middlewares/AuthMiddleware';
import { GuestMiddleware } from './Middlewares/GuestMiddleware';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import RegisterForm from "./Components/RegisterForm";
import Admin from './Components/Admin';
import ListUsers from './Components/ListUsers';
import AdminListVehicles from './Components/AdminListVehicles';
import AddVehicleForm from './Components/AddVehicleForm';
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from 'react';
import { useRentacarStates } from './Context/Context';
import ProtectedRoute from './Middlewares/ProtectedRoute';

const App = () => {
    // const token = localStorage.getItem("jwt")
    const { state, dispatch } = useRentacarStates();
    console.log(state.isAdmin);

    return (
        <>
            {state.isAuthenticated ?
                <div className="App">
                    <Navbar />

                    <Routes>

                        <Route path="/" element={<Home />} />

                        <Route path="/admin" element={
                            <ProtectedRoute isAdmin={state.isAdmin}>
                                <Admin />
                            </ProtectedRoute>
                        } />

                        <Route element={<AuthMiddleware isAuthenticated={state.isAuthenticated} isAdmin={state.isAdmin} />}>
                            {/* <Route path="/admin" element={<Admin />} /> */}
                            <Route path="/admin/listusers" element={<ListUsers />} />
                            <Route path="/admin/listvehicles" element={<AdminListVehicles />} />
                            <Route path="/admin/addproduct" element={<AddVehicleForm />} />
                        </Route>
                    </Routes>
                </div>
                :
                <div className="App">
                    <Navbar />
                    <Routes>

                        <Route path="/" element={<Home />} />

                        <Route element={<AuthMiddleware />}>
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/admin/listusers" element={<ListUsers />} />
                            <Route path="/admin/listvehicles" element={<AdminListVehicles />} />
                            <Route path="/admin/addproduct" element={<AddVehicleForm />} />
                        </Route>

                        <Route element={<GuestMiddleware />}>
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/login" element={<LoginForm />} />
                        </Route>

                    </Routes>
                    <Footer />
                </div>
            }
        </>
    )
};

export default App;



/*<Navbar isAuthenticated={isAuthenticated}/>*/