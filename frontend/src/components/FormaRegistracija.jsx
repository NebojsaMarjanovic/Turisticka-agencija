import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function FormaRegistracija() {
	let navigatePrijava = useNavigate();

	const [ podaciKorisnika, setPodaciKorisnika ] = useState({
		ime: '',
		prezime:'',
		username: '',
		email: '',
		password: '',
		brTelefona:''
	});

	function handleInput(e) {
		let noviPodaciKorisnika = podaciKorisnika;
		noviPodaciKorisnika[e.target.name] = e.target.value;
		setPodaciKorisnika(noviPodaciKorisnika);
	}

	function handleRegister(e) {
		e.preventDefault();
		axios
			.post('https://localhost:44321/api/Authenticate/register', podaciKorisnika)
			.then((res) => {
				console.log(res.data);
				navigatePrijava(`/prijava`);
			})
			// .catch((e) => window.alert('Neuspesna registracija, proverite da li uneti kredencijali zadovoljavaju data ogranicenja'));
			.catch((e)=>console.log(e));
		}


	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//////////////////////////////////////////////////

	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/prijava`;
		navigate(path);
	};

	return (
		<div>
			<form className="forma" onSubmit={handleRegister}>
				<h2 className="prijavaforma" for="forma">
					Registracija
				</h2>
				<div className="form-group">
					<label for="formGroupExampleInput2">Ime</label>
					<input
						type="name"
						class="form-control"
						id="formGroupExampleInput3"
						placeholder="Ime"
						name="ime"
						onInput={handleInput}
					/>
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput2">Prezime</label>
					<input
						type="surname"
						class="form-control"
						id="formGroupExampleInput3"
						placeholder="Prezime"
						name="prezime"
						onInput={handleInput}
					/>
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput3">Username</label>
					<input
						type="surname"
						class="form-control"
						id="formGroupExampleInput4"
						placeholder="Username"
						name="username"
						onInput={handleInput}
					/>
				</div>
				
				<div className="form-group">
					<label for="formGroupExampleInput">Email</label>
					<input
						type="email"
						className="form-control"
						id="formGroupExampleInput1"
						placeholder="Email"
						name="email"
						onInput={handleInput}
					/>
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput1">Lozinka </label>
					<p class="passwordHelper">*mora sadržati velika i mala slova, bar jedan broj i znak interpunkcije</p>
					<input
						type="password"
						className="form-control"
						id="formGroupExampleInput2"
						placeholder="Lozinka"
						name="password"
						onInput={handleInput}
					/>
				</div>
				
				<div className="form-group">
					<label for="formGroupExampleInput4">Broj telefona</label>
					<input
						type="surname"
						class="form-control"
						id="formGroupExampleInput4"
						placeholder="Broj telefona"
						name="brTelefona"
						onInput={handleInput}
					/>
				</div>
				<div className="btnForma">
					<button className="dugme1" type="submit">
						Registracija
					</button>
				</div>

				<div className="btnForma1">
					<button className="dugme3" type="submit" onClick={routeChange}>
						Prijavi se
					</button>
				</div>
			</form>
		</div>
	);
}

export default FormaRegistracija;
