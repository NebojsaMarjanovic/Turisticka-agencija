import logo from './logo.svg';
import './App.css';
import Gradovi from "./components/Gradovi";
import FormaPrijava from "./components/FormaPrijava";
import FormaRegistracija from "./components/FormaRegistracija";
import NavigationBar from "./components/NavigationBar";

import { BrowserRouter, Routes, Route,withRoute } from "react-router-dom";
import { useState, useEffect } from "react";
import Rezervacije from './components/Rezervacije';
import FormaPromenaLozinke from './components/FormaPromenaLozinke';
import Kontakt from './components/Kontakt';
import UpravljajRezervacijama from './components/UpravljajRezervacijama';
import UpravljajDestinacijama from './components/UpravljajDestinacijama';
import axios from 'axios';



function App() {

const [rezervisaniGrad, setRezervisaniGrad] = useState([]);
const [ ukupno, setUkupno ] = useState(0);


  const[gradoviBaza, setGradoviBaza] = useState();
  useEffect(() => {
		if(gradoviBaza == null){
			axios.get('https://localhost:44321/Grad').then((res) => {
				setGradoviBaza(res.data);
			});
		}
	}, [gradoviBaza])


  function refresh(){
    let noviGradovi = gradoviBaza.filter((grad) => grad.broj > 0);
    setRezervisaniGrad(noviGradovi);
  }

  function dodajGrad(){
   
    
      
    
    
    // refresh();
  }

  return (
    <BrowserRouter className="App">
    <div className = "Appdiv">
      <Routes>
      <Route
        path = "/"
        element = {
          <FormaPrijava/>
        }
        />


        <Route
          path = "/turistickeDestinacije"
          element ={
            
            <>
    <NavigationBar nav = {1}></NavigationBar>

      <div className="jumbotron">
         <h1 className="display-1">Pronađi grad za sebe!</h1>
        <p className="lead">Sve metropole Evrope i sveta na jednom mestu. Od Srbije do Japana, sa najboljom ekipom i pouzdanim vodičima.</p>
  
      </div>
            <h1 className="naslov">Koji je vaš grad?</h1>
            <Gradovi gradovi = {gradoviBaza} dodaj = {dodajGrad} />
            </>
          }
        />
        <Route
        path = "/pregledRezervacija/*"
        element = {
          <>
          <NavigationBar nav = {1}></NavigationBar>
        
         <Rezervacije gradoviRezervacije = {rezervisaniGrad} ukupno = {ukupno} />
          </>
        }
        />
        <Route
        path = "/upravljajRezervacijama/*"
        element = {
          window.sessionStorage.getItem("userRole")==="Admin" && (
          <>
          <NavigationBar nav = {1}></NavigationBar>
          <UpravljajRezervacijama/>
          </>)
        }
        />

        <Route
        
        path = "/kontakt"
        element = {
          <>
        <NavigationBar nav = {1}></NavigationBar>
          <Kontakt/>
        </>

        }
        />
  
        <Route
        path = "/upravljajDestinacijama/"
        element = {
          window.sessionStorage.getItem("userRole")==="Admin" && (
          <>
        <NavigationBar nav = {1}></NavigationBar>
          <UpravljajDestinacijama/>
          </>)
        }
        />

        <Route
        path = "/prijava/"
        element = {
          <FormaPrijava />
        }
        />
        <Route
        path = "/registracija/"
        element = {
          <FormaRegistracija/>
        }
        />
      </Routes>

    </div>
  </BrowserRouter>
  );


  
}

export default App;
