import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const totalImages = 10; 
const imagesArray = Array.from({length: totalImages}, (_, i) => `/slider${i + 1}.avif`);

export default function HeroSlider() {
    return (
        <div className="hero-slider-wrapper">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                grabCursor={true}
                pagination={{ 
                    clickable: true, 
                    dynamicBullets: true 
                }}
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false 
                }}
                className="hero-slider"
            >
                {imagesArray.map(src => (
                    <SwiperSlide key={src} className="hero-slide">
                        <img src={src} alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}