import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {FiPhoneCall}  from "react-icons/fi";

function Kontakt() {
	// const [ isLoaded ] = useLoadScript({ googleMapsApiKey: 'AIzaSyCp2TeN4jSXWRV1JHlwiP6cbj-jiikvR9M' });

	// function Map() {
	// 	// return <GoogleMap zoom = {10} center = {} ></GoogleMap>;
	// }
	const position = [44.7992, 20.4695];

	return (
		<div className="kontaktInformacije">
			<div className="kontaktTekst">
				<p className="kontaktPrviParagraf">
					Ukoliko imate bilo kakvih pitanja ili vam je potrebna pomoć oko putovanja, kontaktirajte nas:
					<br />
					<br />
					☎ +381 11 555 333
					<br />
					<br />
					📧 rezervacije@citytravel.rs
					<br />
					<br />
					<br />
					Možete posetiti našu poslovnicu:
					<br/><br/>
					📌Katanićeva 15, Beograd
					<br/><br/>
					Radno vreme:
					<br/><br/>
					ponedeljak - petak : 9:00 - 18:00
					<br/>
					subota: 9:00 - 14:00
				</p>
			
			</div>
			<div id="map" className="mapa" >
				{
					<MapContainer
					style={{ height: "110%" }}
					center={position}
					zoom={17}
					scrollWheelZoom={false}
				  >
					<TileLayer
					  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={position}>
					  <Popup>
						City travel <br /> Katanićeva 15.
					  </Popup>
					</Marker>
				  </MapContainer>
				}
			</div>
		</div>
	);
}

export default Kontakt;
