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
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
						<p>Sereno</p>
					</div>
				);
			case 1:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						<p>Prevalentemente sereno</p>
					</div>
				);
			case 2:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						<p>Parzialmente nuvoloso</p>
					</div>
				);
			case 3:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						<p>Nuvoloso</p>
					</div>
				);
			case 45:
			case 48:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						<p>Nebbia</p>
					</div>
				);
			case 51:
			case 53:
			case 55:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
						<p>Pioggerella</p>
					</div>
				);
			case 61:
			case 63:
			case 65:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
						<p>Pioggerella</p>
					</div>
				);
			case 71:
			case 73:
			case 75:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/71-75.png`} alt="sunny" />
						<p>Neve</p>
					</div>
				);
			case 95:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/95.png`} alt="sunny" />
						<p>Temporale</p>
					</div>
				);
			case 96:
			case 99:
				return (
					<div>
						<img src={`${process.env.PUBLIC_URL}/96-99.png`} alt="sunny" />
						<p>Temporale con grandine</p>
					</div>
				);
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
