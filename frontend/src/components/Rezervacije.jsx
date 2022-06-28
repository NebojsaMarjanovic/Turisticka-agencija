import React from 'react';
import Dugme from './Dugme.jsx';
import axios from 'axios';
import { useState,useEffect } from 'react';

function Rezervacije({ gradoviRezervacije, ukupno,token }) {
	
	const[rezervacije, setRezervacije] = useState();
	useEffect(() => {
		  if(rezervacije == null){
			  axios.get('https://localhost:44321/api/Rezervacije/'+window.sessionStorage.getItem('id')).then((res) => {
				  console.log(res.data);
				  setRezervacije(res.data);
			  });
		  }
	  }, [rezervacije])

	return (
		
		<div className="rezervacije">
			<div>
				{/* <h3>Ovo je pregled filmova</h3> */}

				<table className="tabela" id="myTable">
					<tbody>
						<tr>
							<th>Naziv grada</th>
							<th>Cena</th>
	
		</tr>
		
							
						{ rezervacije == null ? <></> : rezervacije.map((rezervacija) => (
						<tr>
							
							<td>{rezervacija.grad.naziv}</td>
							<td>{rezervacija.grad.cena}</td>
						</tr>
						))}
							
						
					</tbody>
				</table>
			</div>
			<div className="dugmeKomponenta">
				<Dugme />
			</div>
			{/* <div className="dugmeKomponentaPotvrda">
				<button className="dugmePotvrdaRezervacije" onClick={dodajRezervacije}>
					Potvrdi rezervacije
				</button>
			</div> */}
		</div>
	);
}

export default Rezervacije;
