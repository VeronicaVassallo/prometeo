import { useEffect, useState } from "react";
import "./navbarComponent.css";
//redux
import { useDispatch } from "react-redux";
import { getWeatherData, getCityName } from "../../reducers/weatherDataReducer";

//bootstrap
import Button from "react-bootstrap/Button";

const NavbarComponet = () => {
	const [cityResearched, setCityResearched] = useState("");
	const [location, setLocation] = useState(null);
	const [messagge, setMessage] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		if (cityResearched) {
			dispatch(getWeatherData(location));
			dispatch(getCityName(location));
		}
	}, [cityResearched, location]);

	const getCoordinate = async (e) => {
		e.preventDefault();
		if (cityResearched) {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?q=${cityResearched}&format=json`,
					{
						headers: {
							"User-Agent": "vvassallo@gmail.com",
						},
					}
				);
				const data = await response.json();
				setLocation({
					latitude: data[0].lat,
					longitude: data[0].lon,
				});
				setMessage("");
			} catch (error) {
				setMessage("Inserire un nome di città esistente");
				console.log("Error during getting Coordinates data from name", error);
			}
		} else {
			setMessage("Inserire una città");
		}
	};

	return (
		<form className="navbar">
			<div className="researchCity">
				<label htmlFor="researchCity"> Seleziona Città: </label>
				<div className="inputContainer">
					<input
						type="text"
						id="researchCity"
						name="researchCity"
						value={cityResearched}
						onChange={(e) => setCityResearched(e.target.value)}
					/>
					<span>{messagge}</span>
				</div>

				<Button type="button" onClick={getCoordinate}>
					Cerca
				</Button>
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
