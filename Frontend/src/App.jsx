
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Contact from "./Routes/Contact";
import Favs from "./Routes/Favs";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Detail from "./Components/Detail";
import AddVehicleForm from "./Components/AddVehicleForm";
import { useDentiStates } from "./Context/Context";
import Admin from "./Components/Admin";
import AdminListVehicles from "./Components/AdminListVehicles";




function App() {

  const { state } = useDentiStates();
  const bodyClassName = `body ${state.theme}`
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/ListVehicles" element={<AdminListVehicles />} />
        <Route path="/admin/addproduct" element={<AddVehicleForm />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>


      <Footer />


    </div>
  );
}

export default App;

/*
<Routes>
<Route path="/" element={<Home />}/>
<Route path="/contacto" element={<Contact />} />
<Route path="/favs" element={<Favs />} />
<Route path="/detail/:id" element={<Detail />} />
</Routes>

<Footer/>
*/