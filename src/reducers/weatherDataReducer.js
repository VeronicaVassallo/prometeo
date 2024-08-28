import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWeatherData = createAsyncThunk(
	"weather/getWeatherData",
	async (location) => {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&temperature_unit=celsius`
		);
		const data = await response.json();
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
		temperature: null, //Temperatura corrente
		temperatureList: [], //Lista di oggetti, tipo "dizionario" {time + temperature}
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
				state.temperatureList = action.payload.hourly.time.map(
					(time, index) => ({
						time: time,
						temperature: action.payload.hourly.temperature_2m[index],
					})
				);

				const now = new Date();
				now.setMinutes(0, 0, 0); //azzero i minuti, cosi da arrotondate la data per difetto
				const currentHour = now.toISOString().slice(0, 16); //ex: 12:32 --> 12:00 cosi mi considera che temperatura c'è in quell'ora
				const currentItemList = state.temperatureList.find(
					(item) => item.time === currentHour
				);

				if (currentItemList) {
					state.temperature = currentItemList.temperature;
				} else {
					console.log("Ora corrente non trovata");
				}
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
