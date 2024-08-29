import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
	getWeatherData,
	getUserLocation,
	getCityName,
} from "../../reducers/weatherDataReducer";

const CardComponent = () => {
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
			dispatch(getCityName(location));
		}
	}, [location, dispatch]);

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
