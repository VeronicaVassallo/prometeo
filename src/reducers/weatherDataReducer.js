import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWeatherData = createAsyncThunk(
	"weather/getWeatherData",
	async (location) => {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`
		);
		const data = await response.json();
		console.log("DATI API METEO", data);
		return data;
	}
);

export const getUserLocation = createAsyncThunk(
	"weather/getUserLocation",
	async () => {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						resolve({ latitude, longitude });
					},
					(error) => {
						reject(error.message);
					}
				);
			} else {
				reject("Geolocalizzazione non supportata dal browser");
			}
		});
	}
);

export const getCityName = createAsyncThunk(
	"city/getCityName",
	async (location) => {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&zoom=10`
		);
		const data = await response.json();
		const cityName =
			data.address.city ||
			data.address.town ||
			data.address.village ||
			"Città non trovata";
		return cityName;
	}
);

const weatherSlice = createSlice({
	name: "weather",
	initialState: {
		temperatureList: [], //Lista di oggetti, tipo "dizionario" {time + temperature}
		weatherCodeList: [], //Lista con i codici della previsione del tempo
		windList: [],
		humidityList: [],
		city: "",
		location: null,
		status: "idle", // idle (stato iniziale), loading, succeeded, failed --> traccia lo stato della richiesta asincrona
		error: null,
	},
	reducers: {
		setCity: (state, action) => {
			state.city = action.payload;
		},
		setCurrentTemperature: (state, action) => {
			state.currentTemperature = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserLocation.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getUserLocation.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.location = action.payload;
			})
			.addCase(getUserLocation.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getWeatherData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getWeatherData.fulfilled, (state, action) => {
				state.status = "succeeded";

				state.temperatureList = action.payload.hourly.time.map((time, i) => ({
					time: time,
					temperature: action.payload.hourly.temperature_2m[i],
				}));

				state.weatherCodeList = action.payload.hourly.weather_code.map(
					(code, i) => ({
						time: action.payload.hourly.time[i],
						weatherCode: code,
					})
				);

				state.windList = action.payload.hourly.wind_speed_10m.map(
					(windValue, i) => ({
						time: action.payload.hourly.time[i],
						wind: windValue,
					})
				);

				state.humidityList = action.payload.hourly.relative_humidity_2m.map(
					(humidityValue, index) => ({
						time: action.payload.hourly.time[index],
						humidity: humidityValue,
					})
				);
			})
			.addCase(getWeatherData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getCityName.fulfilled, (state, action) => {
				state.city = action.payload;
			});
	},
});

export const { setCity, setCurrentTemperature } = weatherSlice.actions;
export default weatherSlice.reducer;
