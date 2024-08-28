import { useEffect, useState } from "react";
import "./navbarComponent.css";
//redux
import { useDispatch } from "react-redux";
import { getWeatherData, getCityName } from "../../reducers/weatherDataReducer";

const NavbarComponet = () => {
	const [cityResearched, setCityResearched] = useState("");
	const [location, setLocation] = useState(null);
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
				console.log(
					"Coordinate sono, latitudine" +
						data[0].lat +
						" longitugine " +
						data[0].lon
				);
			} catch (error) {
				console.log("Error during getting Coordinates data from name", error);
			}
		} else {
			alert("Inserire il nome di una città");
		}
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
				<button type="button" onClick={getCoordinate}>
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
