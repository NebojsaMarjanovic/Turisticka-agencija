import React from 'react';

function FormaPromenaLozinke() {
	return (
		<div>
			<form className="forma">
				<h2 className="prijavaforma" for="forma">
					Promena lozinke
				</h2>
				<div className="form-group">
					<label for="formGroupExampleInput">Email</label>
					<input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email" />
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput2">Stara lozinka</label>
					<input
						type="password"
						className="form-control"
						id="formGroupExampleInput2"
						placeholder="Stara lozinka"
					/>
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput2">Nova lozinka</label>
					<input
						type="password"
						className="form-control"
						id="formGroupExampleInput2"
						placeholder="Nova lozinka"
					/>
				</div>
				<div className="btnForma">
					<button className="dugme1" type="submit">
						Promeni
					</button>
				</div>
			</form>
		</div>
	);
}

export default FormaPromenaLozinke;
