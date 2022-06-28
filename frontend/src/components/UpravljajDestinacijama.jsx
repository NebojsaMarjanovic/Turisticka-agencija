import React from 'react';
import { useState, useEffect } from 'react';
import FloatingLabel  from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap-floating-label'
import axios from "axios";

function UpravljajDestinacijama() {

	// const[grad, setGrad] = useState({
	// 	id:
	// })

	const[destinacije, setDestinacije] = useState();
	useEffect(()=> {
		if(destinacije == null){
			axios.get('https://localhost:44321/Grad').then((res) => {
				setDestinacije(res.data);
			})
		}
	}, [])


	const deleteGrad=(id)=>{
		axios.delete('https://localhost:44321/Grad/'+id);
		setDestinacije(
			destinacije.filter((destinacija)=>{
				return destinacija.id!==id;
			})
		);
	};



	const [show, setShow] = useState(false)

	return (
	

        <>
		<div className="upravljajDestinacijama">
			<div className="tabelaUpravljanjeDestinacijama">
				<table className="tabelaDestinacije">
					<tbody>
						<tr>
							<th>Grad</th>
							<th>Drzava</th>
							<th>Cena</th>
							<th>Admin akcija</th>
						</tr>

					
							
							{ destinacije == null ? <></> : destinacije.map((destinacija) => (
							<tr key = {destinacija.gradId}>
								<td>{destinacija.naziv}</td>
								<td>{destinacija.drzava}</td>
								<td>{destinacija.cena}</td>
								<td><button className="dugmeObrisi" onClick={() =>deleteGrad(destinacija.gradId)}>Obrisi</button></td>
				
							</tr>
						))}
						
					</tbody>
				</table>
			</div>
		</div>
		



		</>
	);
}

export default UpravljajDestinacijama;
