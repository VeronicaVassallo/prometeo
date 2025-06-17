import "./carouselCard.css";

import FirstCarouselCard from "../firstCarouselCard/FirstCarouselCard";
import SecondCarouselCard from "../secondCarouselCard/SecondCarouselCard";
import ThirdCarouselCard from "../thirdCarouselCard/ThirdCarouselCard";

/*Swiper*/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';


import { FreeMode, Pagination } from 'swiper/modules';

const CarouselCard = () => {
    return(
        <div className="containerCarousel">
            <Swiper
                 spaceBetween={20}
                slidesPerView={1}
                grabCursor={true}
                modules={[Pagination]}
                pagination={{clickable: true, dynamicBullets: true,}}
                className="mySwiper"
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