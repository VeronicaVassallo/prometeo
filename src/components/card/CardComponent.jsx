import { useEffect, useState } from "react";
import "./cardComponent.css";
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
					<div id="weather">
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
						<h2 className="text-center title-under-temperature">Sereno</h2>
					</div>
				);
			case 1:
				return (
					<div id="weather">
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						<h2 className="text-center title-under-temperature">
							Prevalentemente sereno
						</h2>
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
		<div className="card-weather">
			<div id="headCard">
				<h3>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-geo-alt ms-0 svg"
						viewBox="0 0 16 16"
					>
						<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
						<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
					</svg>
					{city}
				</h3>
				<p className="text-center">Mon 20 March</p>
			</div>
			<div>{weatherCode !== null ? switcherWeatherCode(weatherCode) : ""}</div>

			{temperature ? (
				<div id="temperature">
					<p>{temperature}°</p>
				</div>
			) : (
				<p>Not found</p>
			)}
			{/*humidity ? (
				<div>
					<p>Umidità: {humidity}%</p>
				</div>
			) : (
				<p>Not found</p>
			)*/}
			{wind ? (
				<div>
					<p className="text-center">Vento: {wind}km/h</p>
				</div>
			) : (
				<p>Not found</p>
			)}
		</div>
	);
};

export default CardComponent;
