import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

//redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./reducers/weatherDataReducer";

const store = configureStore({
	reducer: {
		weather: weatherDataReducer,
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
