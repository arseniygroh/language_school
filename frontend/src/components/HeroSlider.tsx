import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const totalImages = 12; 
const imagesArray = Array.from({length: totalImages}, (_, i) => `/slider${i + 1}.avif`);

export default function HeroSlider() {
    return (
        <div className="hero-slider-wrapper">
          <Swiper
            modules={[FreeMode, Pagination, Autoplay]}
            freeMode={true}
            slidesPerView={'auto'}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            grabCursor={true}
            loop={true}
            className='hero-slider'
          >
            {imagesArray.map(src => {
                return (
                    <SwiperSlide key={src} className="hero-slide">
                        <img src={src} alt="slider image" />
                    </SwiperSlide>
                )
            })}
          </Swiper>
        </div>
    );
}