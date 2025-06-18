import "./firstCarouselCard.css";
import { useDispatch, useSelector } from "react-redux";

const FirstCarouselCard = () => {
    const dispatch = useDispatch();
    const dataWeather = useSelector((state) => state.dataWeather);
    return(
        <div id="firstCard">
            <p>Card 1</p>
        </div>
    )

}

export default FirstCarouselCard