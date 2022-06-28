import React from 'react';

function Dugme() {
	return (
		<div className="dugmeKomponenta">
			<button className="dugmeSortiranje" onClick={window['sortirajOpadajuce']}>
				Sortiraj po nazivu
			</button>
		</div>
	);
}

export default Dugme;
