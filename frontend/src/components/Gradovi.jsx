import React from 'react';
import JedanGrad from './JedanGrad.jsx';
// import 'bootstrap/dist/css/bootsrtap.min.css';
import { Jumbotron, Container } from 'react-bootstrap';

function Gradovi({ gradovi, dodaj}) {
	return (
<>
		<div className="gradovi">
			{gradovi?.map((g) => <JedanGrad grad={g} key={g.id} dodaj={dodaj}  />)}
		</div>
		</>
	);
}

export default Gradovi;
