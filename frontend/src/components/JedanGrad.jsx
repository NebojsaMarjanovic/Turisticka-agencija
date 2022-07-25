import React from 'react';

import {IoIosWine } from 'react-icons/io';

import { FiMoreHorizontal } from 'react-icons/fi';
import { VscChromeClose } from 'react-icons/vsc';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


function JedanGrad({ grad, rezervisiGrad }) {
	const [ opisGrada, setOpisGrada ] = useState('');
	const [ i, seti ] = useState(0);
	const cookies = new Cookies();
	const [ podaciGrada, setPodaciGrada ] = useState({
		korisnikId:'',
		gradId:'',
	});



	function prikaziOpis() {
		if (i % 2 == 0) {
			setOpisGrada(grad.opis);
		} else {
			setOpisGrada('');
		}
		seti(i + 1);
		console.log(i);
		console.log(grad);

	}

	

	
	// function rezervisiGrad(grad){

	// 	if(cookies.get(grad.gradId)!=null){
	// 	setPodaciGrada(podaciGrada.korisnikId=window.sessionStorage.getItem('id'),
	// 	podaciGrada.gradId=grad.gradId)
		
	// 	const rezervisani=cookies.get("rezervisani");

	// 	cookies.set(grad.gradId, grad);
	// 	console.log(cookies.getAll());

	// 	}
	// 	else{
	// 		window.alert("Grad je vec rezervisan!");
	// 	}
		

	// 	// axios
	// 	// 	.post('https://localhost:44321/api/Rezervacije', podaciGrada)
	// 	// 	.then((res) => {
	// 	// 		console.log(res.data);
	// 	// 	})
	// 	// 	// .catch((e) => window.alert('Neuspesna registracija, proverite da li uneti kredencijali zadovoljavaju data ogranicenja'));
	// 	}
	

	return (
		<div className="jedanGrad">
			<div>
				
				<img className="slika" src={grad.imgFile}/>
			</div>

			<div className="jedanGradTekst">
				<p className="jedanGradNaslov"><b>{grad.naziv}</b></p>
				<p classname="jedanGradDrzava"><i>{grad.drzava}</i></p>
				<p className="jedanGradCena"><b>{grad.cena}€</b></p>
				{/* <p className="jedanGradOpis">{grad.opis}</p> */}
				<div className="opisGrada">{opisGrada}</div>
			</div>
			<button className="btn3" onClick={() => {rezervisiGrad(grad)}}>
				<IoIosWine />
			</button>


			<button className="btn2" onClick={prikaziOpis}>
				<FiMoreHorizontal />
			</button>
		</div>
	);
}

export default JedanGrad;
