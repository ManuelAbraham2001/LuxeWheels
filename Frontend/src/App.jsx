



// App.jsx
import { Route, Routes } from 'react-router-dom';
import {AuthMiddleware} from './Middlewares/AuthMiddleware';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import RegisterForm from "./Components/RegisterForm";
import Admin from './Components/Admin';
import ListUsers from './Components/ListUsers';
import AdminListVehicles from './Components/AdminListVehicles';
import AddVehicleForm from './Components/AddVehicleForm';
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

const App = () => {


  return (
    <div className="App">
    <Navbar />
    <Routes>
    
      <Route path="/" element={<Home />} />

      <Route element={ <AuthMiddleware />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/listusers" element={<ListUsers />} />
        <Route path="/admin/listvehicles" element={<AdminListVehicles />} />
        <Route path="/admin/addproduct" element={<AddVehicleForm />} />
      </Route>

      
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
    <Footer />
    </div>
  );
};

export default App;



    /*<Navbar isAuthenticated={isAuthenticated}/>*/