import { useState } from "react";
import "./navbarComponent.css";
const NavbarComponet = () => {
	const [cityResearched, setCityResearched] = useState("");

	const showValue = (e) => {
		e.preventDefault();
		console.log("la citta ricercata è:", cityResearched);
	};

	return (
		<form className="navbar">
			<div>
				<label htmlFor="researchCity"> Seleziona Città: </label>
				<input
					type="text"
					id="researchCity"
					name="researchCity"
					value={cityResearched}
					onChange={(e) => setCityResearched(e.target.value)}
				/>
				<button type="button" onClick={showValue}>
					Cerca
				</button>
			</div>
			<div>
				<label htmlFor="cars">Lingua:</label>
				<select name="lang" id="lang">
					<option value="italian">Italian</option>
					<option value="english">English</option>
				</select>
			</div>

			<div>darkmode</div>
		</form>
	);
};

export default NavbarComponet;
