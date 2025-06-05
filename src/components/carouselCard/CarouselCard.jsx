import "./carouselCard.css";

import FirstCarouselCard from "../firstCarouselCard/FirstCarouselCard";
import SecondCarouselCard from "../secondCarouselCard/SecondCarouselCard";
import ThirdCarouselCard from "../thirdCarouselCard/ThirdCarouselCard";

const CarouselCard = () => {
    return(
        <div className="containerCarousel">
            <FirstCarouselCard/>
            <SecondCarouselCard/>
            <ThirdCarouselCard/>
        </div>
    )
}

export default CarouselCard;