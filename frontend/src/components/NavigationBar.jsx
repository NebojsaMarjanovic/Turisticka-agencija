import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import axios from "axios";
function NavigationBar({ nav, token }) {

	function handleLogout(){
		<Link to="/">Prijavi se</Link>
		window.sessionStorage.setItem("auth_token",null);
		
	}



	return (
		<div className={nav === 1 ? 'navigationBar' : 'bottomBar'}>
			{nav === 1 ? 
			(<div className="logo">
				<FaPaperPlane />
			</div>) : (<></>) }
			{/* <div className="logo">
				<MdTravelExplore />
			</div> */}
			<Link to="/turistickeDestinacije" className="stavka">
				Turističke destinacije
			</Link>

			<Link to="/pregledRezervacija" className="stavka">
				Vaše rezervacije
			</Link>
			{window.sessionStorage.getItem("userRole")=="Admin" &&
			<Link to="/upravljajRezervacijama" className="stavka">
				Upravljaj rezervacijama
			</Link>
}
			<Link to="/kontakt" className="stavka" onClick = {window['initMap']} >
				Kontakt
			</Link>

			{window.sessionStorage.getItem("userRole")=="Admin" &&
			<Link to="/upravljajDestinacijama" className="stavka">
				Upravljaj destinacijama
			</Link>}

			{window.sessionStorage.getItem("auth_token") =='' ? '' : (<Link to="/" className="stavka" onClick = {handleLogout}>Odjavi se</Link>)}
			

			
		</div>
	);
}

export default NavigationBar;
