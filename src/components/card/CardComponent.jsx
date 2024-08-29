import { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
	getWeatherData,
	getUserLocation,
	getCityName,
} from "../../reducers/weatherDataReducer";
import { useGetCurrentInfo } from "../../hooks/useGetCurrentInfo";

const CardComponent = () => {
	const dispatch = useDispatch();
	const weather = useSelector((state) => state.weather);
	const {
		temperatureList,
		city,
		location,
		weatherCodeList,
		humidityList,
		windList,
	} = weather;
	const [temperature, setTemperature] = useState(null);
	const [weatherCode, setWeatherCode] = useState(null);
	const [humidity, setHumidiy] = useState(null);
	const [wind, setWind] = useState(null);

	useEffect(() => {
		dispatch(getUserLocation());
	}, [dispatch]);

	useEffect(() => {
		if (location) {
			dispatch(getWeatherData(location));
			dispatch(getCityName(location));
		}
	}, [location, dispatch]);

	//temperatura corrente
	const currentTemperatureinfo = useGetCurrentInfo(temperatureList);

	useEffect(() => {
		if (currentTemperatureinfo) {
			setTemperature(currentTemperatureinfo.temperature);
		}
	}, [currentTemperatureinfo]);

	//Weather code corrente
	const currentWeatherInfo = useGetCurrentInfo(weatherCodeList);

	useEffect(() => {
		if (currentWeatherInfo) {
			setWeatherCode(currentWeatherInfo.weatherCode);
		}
	}, [currentWeatherInfo]);

	//Umidita corrente
	const currentHumidityInfo = useGetCurrentInfo(humidityList);

	//Vento corrente
	const currentWindInfo = useGetCurrentInfo(windList);

	useEffect(() => {
		if (currentWindInfo) {
			setWind(currentWindInfo.wind);
		}
	}, [currentWindInfo]);

	useEffect(() => {
		if (currentHumidityInfo) {
			setHumidiy(currentHumidityInfo.humidity);
		}
	}, [currentHumidityInfo]);

	const switcherWeatherCode = (code) => {
		switch (code) {
			case 0:
				return <p>Sereno</p>;
			case 1:
				return <p>Prevalentemente sereno</p>;
			case 2:
				return <p>Parzialmente nuvoloso</p>;
			case 3:
				return <p>Nuvoloso</p>;
			case 45:
			case 48:
				return <p>Nebbia</p>;
			case 51:
			case 53:
			case 55:
				return <p>Pioggerella</p>;
			case 61:
			case 63:
			case 65:
				return <p>Pioggia</p>;
			case 71:
			case 73:
			case 75:
				return <p>Neve</p>;
			case 95:
				return <p>Temporale</p>;
			case 96:
			case 99:
				return <p>Temporale con grandine</p>;
			default:
				return <p>Previsione sconosciuta</p>;
		}
	};

	return (
		<div>
			<h3>{city}</h3>
			{weatherCode !== null ? switcherWeatherCode(weatherCode) : ""}
			{temperature ? (
				<div>
					<p>Temperatura ora: {temperature}°C</p>
				</div>
			) : (
				<p>Not found</p>
			)}
			{humidity ? (
				<div>
					<p>Umidità: {humidity}%</p>
				</div>
			) : (
				<p>Not found</p>
			)}
			{wind ? (
				<div>
					<p>Vento: {wind}km/h</p>
				</div>
			) : (
				<p>Not found</p>
			)}
		</div>
	);
};

export default CardComponent;
