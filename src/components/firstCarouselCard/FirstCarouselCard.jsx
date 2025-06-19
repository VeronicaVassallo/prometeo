import "./firstCarouselCard.css";
import { useEffect } from "react";
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
    //console.log("DATAAA: ", weather.weatherCodeList);

    const switcherWeatherCode = (code) => {
		switch (code) {
			case 0:
				return (
					<div  className={"weatherCard"}>
                        <h4>Lun</h4>
						<img src={`${process.env.PUBLIC_URL}/zero.png`} alt="sunny" />
					    <p>Sereno</p>
                    </div>
				);
			case 1:
				return (
					<div  className={"weatherCard"}>
                        <h4>Lun</h4>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
                        <p>Sereno</p>
                    </div>
				);
			case 2:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Parz. nuvoloso</p>
                    </div>
				);
			case 3:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nuvoloso</p>
                    </div>
				);
			case 45:
			case 48:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/1-2.png`} alt="sunny" />
					    <p>Nebbia</p>
                    </div>
				);
			case 51:
			case 53:
			case 55:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
					    <p>Pioggerella</p>
                    </div>
				);
			case 61:
			case 63:
			case 65:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/51-65.png`} alt="sunny" />
					    <p>Pioggerella</p>
                    </div>
				);
			case 71:
			case 73:
			case 75:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/71-75.png`} alt="sunny" />
					    <p>Neve</p>
                    </div>
				);
			case 95:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/95.png`} alt="sunny" />
                        <p>Temporale</p>
                    </div>
				);
			case 96:
			case 99:
				return (
					<div  className={"weatherCard"}>
						<img src={`${process.env.PUBLIC_URL}/96-99.png`} alt="sunny" />
                        <p>Temporale con grandine</p>
                    </div>
				);
			default:
				return <p>Previsione sconosciuta</p>;
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
        <div id="firstCard" className="d-flex justify-content-around align-items-cente">
            {/*Da questa lista  weather.weatherCodeList devo prendermi i weatherCode dei 4 giorni successivi alla data di oggi, della stessa ora corrente.
            Esempio: weatherCode di lunedi alle 16:00, weatherCode di martedi alle 16:00,weatherCode di mercoledi alle 16:00 e weatherCode 
            di giovedi alle 16:00 */}
            {weather.weatherCodeList && weather.weatherCodeList.slice(0, 4).map((code, i)=>{
                return <div className="p-1 ps-3 mt-2">{code.weatherCode !== null ? switcherWeatherCode(code.weatherCode) : ""}</div>
            }) 

            }

        </div>
    )

}

export default FirstCarouselCard