import "./secondCarouselCard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData, getUserLocation, getCityName } from "../../reducers/weatherDataReducer";

const SecondCarouselCard = () => {
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
    console.log("DATAAA: ", weather.weatherCodeList);

    const switcherWeatherCode = (code) => {
		switch (code) {
			case 0:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
					    <p>Sereno</p>
                    </div>
				);
			case 1:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
                        <p>Nuvoloso</p>
                    </div>
				);
			case 2:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nuvoloso</p>
                    </div>
				);
			case 3:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nuvoloso</p>
                    </div>
				);
			case 45:
			case 48:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nebbia</p>
                    </div>
				);
			case 51:
			case 53:
			case 55:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
					    <p>Pioggerella</p>
                    </div>
				);
			case 61:
			case 63:
			case 65:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
					    <p>Pioggerella</p>
                    </div>
				);
			case 71:
			case 73:
			case 75:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/71-75.png`} alt="sunny" />
					    <p>Neve</p>
                    </div>
				);
			case 95:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/95.png`} alt="sunny" />
                        <p>Temporale</p>
                    </div>
				);
			case 96:
			case 99:
				return (
					<div  className={"d-flex weatherSecondCard"}>
						<img src={`${process.env.PUBLIC_URL}/96-99.png`} alt="sunny" />
                        <p>Temporale con grandine</p>
                    </div>
				);
			default:
				return (
					<div  className={"d-flex weatherSecondCard"}>
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
        <div id="secondCard" className="d-flex">
            <div className="d-flex flex-column">
                {weather.weatherCodeList && weather.weatherCodeList.slice(0,5).map((code, i)=>(
                    <div className="d-flex">
                        <div key={i}>{switcherWeatherCode(code.weatherCode)}</div>
                    </div>
                ))}
            </div>
            <div className="d-flex flex-column">
                {weather.temperatureList && weather.temperatureList.slice(0,5).map((t, j)=>(
                <div className="d-flex pb-4 ps-3">
                    <h4 key={j} className="ms-3">{t.temperature}°</h4>
                    <div className="ms-5">{t.time.split("T")[1]}</div>
                </div>
                ))}
            </div>
             
        </div>
    )

}

export default SecondCarouselCard;