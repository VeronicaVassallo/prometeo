import { useState, useEffect } from "react";
import "./navbarComponent.css";
//redux
import { useDispatch } from "react-redux";
import { getWeatherData, getCityName } from "../../reducers/weatherDataReducer";

//bootstrap
import Button from "react-bootstrap/Button";

const NavbarComponent = () => {
	const [cityResearched, setCityResearched] = useState("");
	const [location, setLocation] = useState(null);
	const [message, setMessage] = useState("");
	const [showNavbar, setShowNavbar] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (location) {
			dispatch(getWeatherData(location));
			dispatch(getCityName(location));
		}
	}, [location]);

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
				if (data.length > 0) {
					setLocation({
						latitude: data[0].lat,
						longitude: data[0].lon,
					});
					setMessage("");
					setShowNavbar(false);
				} else {
					setMessage("Inserire un nome di città esistente");
				}
			} catch (error) {
				setMessage("Errore durante il recupero dei dati");
				console.log("Error during getting Coordinates data from name", error);
			}
		} else {
			setMessage("Inserire una città");
		}
	};

	const handleShow = () => {
		setShowNavbar(!showNavbar);
	};

	return (
		<div>
			{/* Navbar per schermi grandi*/}
			<nav className="d-none d-lg-block">
				<form className="d-flex justify-content-around contanirForm">
					<div className="researchCity">
						<label htmlFor="researchCity" className="pt-2">
							Città
						</label>
						<div className="inputContainer">
							<input
								className="mx-1"
								type="text"
								id="researchCity"
								name="researchCity"
								value={cityResearched}
								placeholder="ex: Roma"
								onChange={(e) => setCityResearched(e.target.value)}
							/>
							<span className="text-danger">{message}</span>
						</div>

						<Button
							className="searchButton"
							type="button"
							onClick={getCoordinate}
						>
							Cerca
						</Button>
					</div>
					<div>
						<label htmlFor="lang">Lingua:</label>
						<select name="lang" id="lang">
							<option value="italian">Italian</option>
							<option value="english">English</option>
						</select>
					</div>

					<div>darkmode</div>
				</form>
			</nav>

			{/*Navbar mobile version */}
			<nav className={`d-block d-lg-none ${showNavbar ? "d-block" : "d-none"}`}>
				<form className="d-flex justify-content-around contanirForm">
					<div className="researchCity">
						<label htmlFor="researchCity" className="pt-2">
							Città
						</label>
						<div className="inputContainer">
							<input
								className="mx-1"
								type="text"
								id="researchCity"
								name="researchCity"
								value={cityResearched}
								placeholder="ex: Roma"
								onChange={(e) => setCityResearched(e.target.value)}
							/>
							<span className="text-danger">{message}</span>
						</div>

						<Button
							className="searchButton"
							type="button"
							onClick={getCoordinate}
						>
							Cerca
						</Button>
					</div>
					<div>
						<label htmlFor="lang">Lingua:</label>
						<select name="lang" id="lang">
							<option value="italian">Italian</option>
							<option value="english">English</option>
						</select>
					</div>

					<div>darkmode</div>
				</form>
			</nav>

			{/* Menu toggle button */}
			<div className="d-block d-lg-none" onClick={handleShow}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-list"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
					/>
				</svg>
			</div>
		</div>
	);
};

export default NavbarComponent;
