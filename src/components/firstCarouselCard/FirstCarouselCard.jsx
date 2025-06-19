import "./firstCarouselCard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData, getUserLocation, getCityName } from "../../reducers/weatherDataReducer";

const FirstCarouselCard = () => {
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
    const [filteredData, setFilteredData] = useState([]);

   useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0');

    const datesToMatch = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d.toISOString().split('T')[0];
    });

    const result = weather.weatherCodeList
        .filter(({ time }) => {
        const [date, hour] = time.split('T');
        return datesToMatch.includes(date) && hour.startsWith(currentHour);
        })
        .map((item) => {
            const date = new Date(item.time);
            const weekday = date.toLocaleDateString("it-IT", { weekday: "short" }); 
            return {
                ...item,
                weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1), 
            };
        });

        setFilteredData(result);
    }, [weather]);

    const switcherWeatherCode = (code, weekday) => {
		switch (code) {
			case 0:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
					    <p>Sereno</p>
                    </div>
				);
			case 1:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
                        <p>Nuvoloso</p>
                    </div>
				);
			case 2:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nuvoloso</p>
                    </div>
				);
			case 3:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nuvoloso</p>
                    </div>
				);
			case 45:
			case 48:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nebbia</p>
                    </div>
				);
			case 51:
			case 53:
			case 55:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
					    <p>Pioggerella</p>
                    </div>
				);
			case 61:
			case 63:
			case 65:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
					    <p>Pioggerella</p>
                    </div>
				);
			case 71:
			case 73:
			case 75:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/71-75.png`} alt="sunny" />
					    <p>Neve</p>
                    </div>
				);
			case 95:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/95.png`} alt="sunny" />
                        <p>Temporale</p>
                    </div>
				);
			case 96:
			case 99:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/96-99.png`} alt="sunny" />
                        <p>Temporale con grandine</p>
                    </div>
				);
			default:
				return (
					<div  className={"weatherCard"}>
                        <h5>{weekday}</h5>
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
					    <p>Sereno</p>
                    </div>
				);
		}
	};


    useEffect(() => {
            dispatch(getUserLocation());
        }, [dispatch]);
    
        useEffect(() => {
            if (location) {
                dispatch(getWeatherData(location));
                dispatch(getCityName(location));
            }
        }, [location, dispatch]);

    return(
        <div id="firstCard" className="d-flex justify-content-around flex-wrap">
            {/*Da questa lista  weather.weatherCodeList devo prendermi i weatherCode dei 4 giorni successivi alla data di oggi, della stessa ora corrente.
            Esempio: weatherCode di lunedi alle 16:00, weatherCode di martedi alle 16:00,weatherCode di mercoledi alle 16:00 e weatherCode 
            di giovedi alle 16:00 */}
            {filteredData && filteredData.map((item, i) => (
                <div key={i} className="ps-3">
                    {switcherWeatherCode(item.weatherCode, item.weekday)}
                </div>
            ))}

        </div>
    )

}

export default FirstCarouselCard