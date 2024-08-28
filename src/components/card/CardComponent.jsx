import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getWeatherData,
	getUserLocation,
	setCity,
} from "../../reducers/weatherDataReducer";

const CardComponent = () => {
	//TO DO: impostare la latitudine e la longitudine manualmente
	//TO DO: inegrare Axios per le chiamate API
	const dispatch = useDispatch();
	const weather = useSelector((state) => state.weather);
	const { temperature, city, location } = weather;

	useEffect(() => {
		dispatch(getUserLocation());
	}, [dispatch]);

	useEffect(() => {
		if (location) {
			dispatch(getWeatherData(location));
			getCityName(location);
		}
	}, [location, dispatch]);

	const getCityName = async () => {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&zoom=10`
			);
			const data = await response.json();
			const cityName =
				data.address.city ||
				data.address.town ||
				data.address.village ||
				"Città non trovata";
			dispatch(setCity(cityName));
		} catch (error) {
			console.log("Error during getting the name of the city", error);
		}
	};

	return (
		<div>
			<h3>{city}</h3>
			{temperature ? (
				<div>
					<p>Temperatura ora: {temperature}°C</p>
				</div>
			) : (
				<p>Not found</p>
			)}
		</div>
	);
};

export default CardComponent;
