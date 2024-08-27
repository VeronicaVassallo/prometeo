import { useEffect, useState } from "react";

const CardComponent = () => {
	//TO DO: impostare la latitudine e la longitudine in maniera dinamica FATTO
	//- dai dati ottenuti ottennere il nome della città
	//TO DO: impostare la latitudine e la longitudine manualmente
	//TO DO: mettere i dati che prendo dall'API nel context o redux
	const [temperature, setTemperature] = useState(0);
	//user location
	const [userLocation, setUserLocation] = useState(null); // {latitudine , longitudine}
	const [city, setCity] = useState("");

	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log("My position", position);
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });
				},
				(error) => {
					console.error("Error getting user location:", error);
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	const getCityName = async () => {
		if (userLocation) {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}&zoom=10`
				);
				const data = await response.json();
				setCity(
					data.address.city ||
						data.address.town ||
						data.address.village ||
						"Città non trovata"
				);
			} catch (error) {
				console.log("Error, during fetching the name of city");
			}
		} else {
			console.log("Error, there aren't latitude and longitude");
		}
	};

	const getWeatherData = async () => {
		if (userLocation) {
			try {
				const response = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&hourly=temperature_2m&temperature_unit=celsius`
				);
				const data = await response.json();
				setTemperature(data);
				console.log("Data from API", data);
			} catch (error) {
				console.log("Error fetching weatherData", error);
			}
		}
	};

	useEffect(() => {
		getUserLocation();
	}, []);

	useEffect(() => {
		if (userLocation) {
			getCityName();
			getWeatherData();
		}
	}, [userLocation]);

	return (
		<div>
			<h3>{city}</h3>
			{temperature ? (
				<div>
					<p>Temperatura ora: {temperature.hourly.temperature_2m[14]}°C</p>
					{/*TO DO: prendere dall'array la  temperatura dell'ora corrente*/}
				</div>
			) : (
				<p>not found</p>
			)}
		</div>
	);
};

export default CardComponent;
