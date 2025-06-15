import "./carouselCard.css";

import FirstCarouselCard from "../firstCarouselCard/FirstCarouselCard";
import SecondCarouselCard from "../secondCarouselCard/SecondCarouselCard";
import ThirdCarouselCard from "../thirdCarouselCard/ThirdCarouselCard";

/*Swiper*/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';


import { FreeMode } from 'swiper/modules';

const CarouselCard = () => {
    return(
        <div className="containerCarousel">
            <Swiper
                spaceBetween={20}
                slidesPerView={1} // Cambia in base alla larghezza desiderata
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
            >
                <SwiperSlide>
                    <FirstCarouselCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SecondCarouselCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ThirdCarouselCard />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default CarouselCard;