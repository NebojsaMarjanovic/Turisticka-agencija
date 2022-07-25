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
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';



function App() {

const [rezervisaniGrad, setRezervisaniGrad] = useState([]);
const [ ukupno, setUkupno ] = useState(0);
const [decodedToken, setDecodedToken] = useState();
const cookies = new Cookies();

console.log(cookies.get("rezervisaniGradovi"));
cookies.set("rezervisaniGradovi", cookies.get("rezervisaniGradovi"));



  const[gradoviBaza, setGradoviBaza] = useState();
  useEffect(() => {
		if(gradoviBaza == null){
			axios.get('https://localhost:44321/Grad').then((res) => {
				setGradoviBaza(res.data);
        console.log(res.data);
			});
		}
	}, [gradoviBaza])

  const refresh = (grad) => {
   
  };
 

function upisiUCookie(){
  let noviGradovi = gradoviBaza.filter((grad) => grad.jeRezervisan === true);
  cookies.set('rezervisaniGradovi', noviGradovi, {    maxAge: 1000000  });
  console.log(cookies.get('rezervisaniGradovi')); 

}

  function dodajRezervisanGrad(grad){
    if(grad.jeRezervisan===false){
    grad.jeRezervisan=true;
    }
    upisiUCookie();
  }


  // function rezervisiGrad(grad){
  //    setRezervisaniGrad(oldArray => [...oldArray,grad]);

  // }

function decodeJwt(){
    var token = window.sessionStorage.getItem("auth_token");
    var decoded = jwt_decode(token);
    setDecodedToken(decoded);
    console.log(decodedToken);

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
            <Gradovi gradovi = {gradoviBaza} rezervisiGrad = {dodajRezervisanGrad}/>
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
          <Kontakt decodeJwt={decodeJwt}/>
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
          <FormaPrijava  />
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
