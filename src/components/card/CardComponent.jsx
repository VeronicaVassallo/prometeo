import { useEffect, useState } from "react";

const CardComponent = () => {
	//TO DO: impostare la latitudine e la longitudine manualmente
	//TO DO: mettere i dati che prendo dall'API nel context o redux
	//TO DO: inegrare Axios per le chiamate API
	const [temperature, setTemperature] = useState(null);
	const [currentTemperature, setCurrentTemperature] = useState(null);
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
				getMomentaryWeatherData(data.hourly.time, data.hourly.temperature_2m);
				console.log("Data from API", data);
			} catch (error) {
				console.log("Error fetching weatherData", error);
			}
		}
	};
	//Dall'Api ottengo un oggetto con due liste (ore e temperature corrispondenti) devo prendere l'indice
	//dell'ora attuale corrispondete per poter prendere la temperatura corrispondente
	const getMomentaryWeatherData = (timeList, temperatureList) => {
		const now = new Date();

		//Arrotonda l'orario corrente all'ora più bassa (es. 12:35 diventa 12:00)
		now.setMinutes(0, 0, 0); //imposta tutti i minuti,secondi e millisecondi a 0, altrimenti quando lo cerco non mi ritorna niente
		const currentHour = now.toISOString().slice(0, 16); //Formatta la data e ora in YYYY-MM-DDTHH:MM
		const index = timeList.indexOf(currentHour);

		if (index !== -1) {
			setCurrentTemperature(temperatureList[index]);
		} else {
			console.log("Hour current not found");
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
					<p>Temperatura ora: {currentTemperature}°C</p>
				</div>
			) : (
				<p>Not found</p>
			)}
		</div>
	);
};

export default CardComponent;
