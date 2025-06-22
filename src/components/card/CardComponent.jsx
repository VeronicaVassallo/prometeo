import { useEffect, useState, useRef } from "react";
import "./cardComponent.css";
//redux/
import { useDispatch, useSelector } from "react-redux";
import {
	getWeatherData,
	getUserLocation,
	getCityName,
} from "../../reducers/weatherDataReducer";
import { useGetCurrentInfo } from "../../hooks/useGetCurrentInfo";

const CardComponent = ({setBKColor, handleScrolling, isScrolling}) => {
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
	const [DayDate, setDayDate] = useState(null);
	//animation during scrolling page
	// AAAAA const [isScrolling, setIsScrollingDown] = useState(false);
    const cardRef = useRef(null);
    const lastScrollY = useRef(0); // Per memorizzare la posizione precedente

	//Bkcolor
	const listBKColr = ["sunny", "rainy", "cloudy", "night"];

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

	//data corrente
	const getDate = () => {
		const date = new Date();
		const options = { weekday: 'short', day: 'numeric', month: 'long' };
		const formattedDate = date.toLocaleDateString('it-IT', options);
        setDayDate(formattedDate);

	}
	useEffect(() => {
			getDate()
		}, 
		[]
	)


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

	//animation scrolling logic

    useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY; //Legge la posizione dello scroll globale
	
			if (currentScroll > lastScrollY.current) {
				// Scroll verso il basso
				handleScrolling(true);
			} else {
				//Scroll verso l'alto
				handleScrolling(false);
			}
	
			lastScrollY.current = currentScroll;
		};
	
		window.addEventListener("scroll", handleScroll);
	
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const switcherWeatherCode = (code) => {
		switch (code) {
			case 0:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
						{temperature ? (
							<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
								<p>{temperature}°</p>
							</div>
							) : (
									<p>Not found</p>
								)}
						<p>Sereno</p>
					</div>
				);
			case 1:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>
							Prevalentemente sereno
						</p>
					</div>
				);
			case 2:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Parzialmente nuvoloso</p>
					</div>
				);
			case 3:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Nuvoloso</p>
					</div>
				);
			case 45:
			case 48:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Nebbia</p>
					</div>
				);
			case 51:
			case 53:
			case 55:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Pioggerella</p>
					</div>
				);
			case 61:
			case 63:
			case 65:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Pioggerella</p>
					</div>
				);
			case 71:
			case 73:
			case 75:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/71-75.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Neve</p>
					</div>
				);
			case 95:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/95.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Temporale</p>
					</div>
				);
			case 96:
			case 99:
				return (
					<div  className={isScrolling ? "weather-scrolling" : "weather"}>
						<img src={`${process.env.PUBLIC_URL}/96-99.png`} alt="sunny" />
						{temperature ? (
								<div id={isScrolling ? "temperatureScrolling" : "temperature"}>
									<p>{temperature}°</p>
								</div>
								) : (
										<p>Not found</p>
						)}
						<p>Temporale con grandine</p>
					</div>
				);
			default:
				return <p>Previsione sconosciuta</p>;
		}
	};

	useEffect(() => {
	if (weatherCode !== null) {
		switch (weatherCode) {
			case 0:
			case 1:
				setBKColor(listBKColr[0]);
				break;
			case 2:
			case 3:
			case 45:
			case 48:
				setBKColor(listBKColr[2]);
				break;
			case 51:
			case 53:
			case 55:
			case 61:
			case 63:
			case 65:
			case 71:
			case 73:
			case 75:
			case 95:
			case 96:
			case 99:
				setBKColor(listBKColr[1]);
				break;
			default:
				break;
		}
	}
}, [weatherCode]);



	return (
		<div className={isScrolling ? "card-weather-scrolling" : "card-weather"}>
			
			<div  ref={cardRef} id={isScrolling ? "animationScrolling" : "headCard"}>
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
				<span  className={isScrolling ? "ms-4 pb-2" : "text-center"}>{DayDate}</span>
			</div>
			<div>{weatherCode !== null ? switcherWeatherCode(weatherCode) : ""}</div>
			<div class="d-none d-md-flex justify-content-around containerHumidityWindMd">
				<div className="m-2 ms-4">
					<p>Umidità:</p>
					<p>{humidity}%</p>
				 </div>
				<div className="m-2 ms-4">
					<p>Vento:</p>
					<p>{wind} km/h</p>
				</div>
			</div>
			<div className={isScrolling ? "d-flex  justify-content-end c-humidity-wind d-block d-md-none" : "text-center d-block d-md-none"}>
				{humidity ? (
					<div>
						<div className={isScrolling ? "mx-3" : "d-none"}>
							<p>Umidità:</p>	
							<p className={isScrolling ? "fw-bolder" : ""}>{humidity}%</p>	
						</div>
					</div>
				) : (
					<p>Not found</p>
				)}
				{wind ? (
					<div>
						<div className={isScrolling ? "mx-3" : "text-center"}>
							<p>Vento:</p>
							<p className={isScrolling ? "fw-bolder" : ""}>{wind} km/h</p>
						</div>
					</div>
				) : (
					<p>Not found</p>
				)}
			</div>
		</div>
	);
};

export default CardComponent;
