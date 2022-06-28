import React from 'react';
import Dugme from './Dugme.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';

//useEffect -> osluskuje promene i izvrsava funkciju u zavisnosti da li su se promenljive unutar komponente promenile ili ne.

function UpravljajRezervacijama() {
	const [ rezervacije, setRezervacije ] = useState();
	const[korisnik,setKorisnik]=useState();

	useEffect(() => {
		if(rezervacije == null){
			axios.get('https://localhost:44321/api/Rezervacije').then((res) => {
				console.log(res.data); // res.data.kakoSeZoveNizKojiKupiPodatkeIzBaze
				setRezervacije(res.data)
			});
		}
	}, [rezervacije])

	useEffect(()=>{
		if(korisnik==null){
			axios.get('https://localhost:44321/api/Korisnik').then((res)=>{
				console.log(res.data);
				setKorisnik(res.data);
			})
		}
	})
	
// 	fetch('https://localhost:44321/Grad')
//   .then(response => response.json())
//   .then(data => setRezervacije(data[0]));




	return (
		

		<div className="rezervacije">
			<input
			
				className="pretraga"
				type="text"
				id="myInput"
				onKeyUp={window['funkcijaZaPretragu']}
				placeholder="🔍 Pretraži rezervacije ..."
			/>
			<div>
				<table className="tabela" id="myTable">
					<tbody>
					<tr>
							<th>Grad</th>
							<th>Korisnik</th>
						</tr>
						{ rezervacije == null ? <></> : rezervacije.map((rezervacija) => (
							<tr key = {rezervacija.rezervacijaId}>
								<td>{rezervacija.grad.naziv}</td>
								<td>{rezervacija.korisnik.ime} {rezervacija.korisnik.prezime}</td>
							</tr>
						))}
						
						
						
						
					</tbody>
				</table>
			</div>
			<div className="dugmeKomponenta">
				<Dugme />
			</div>
		</div>
	);
}


export default UpravljajRezervacijama;
