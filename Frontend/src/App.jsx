
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Contact from "./Routes/Contact";
import Favs from "./Routes/Favs";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Detail from "./Routes/Detail";
import { useDentiStates } from "./Context/Context";
import Card from "./Components/Card";



function App() {

  const { state } = useDentiStates(); 
  const bodyClassName = `body ${state.theme}`
  return (
    <html className= {bodyClassName}>
      <div className="App">
        <Navbar/>
        <Home/>
        <Footer/>


      </div>
    </html>  
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