import React from 'react';
import Dugme from './Dugme.jsx';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';

function Rezervacije({ gradoviRezervacije, ukupno,token }) {
	const cookies = new Cookies();
	const[rezervacije, setRezervacije] = useState(cookies.get("rezervisaniGradovi"));
	useEffect(() => {
		console.log(cookies.get("rezervisaniGradovi"));

		  if(rezervacije == null){
			setRezervacije(cookies.get("rezervisaniGradovi"));
		  }
	  }, [rezervacije]);

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
							
							<td>{rezervacija.naziv}</td>
							<td>{rezervacija.cena}</td>
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
