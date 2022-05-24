import { Swiper } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = ({ children, settings, collection }) => {
  return (
    <Swiper
      slidesPerView={collection ? 1 : 2}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      centeredSlides = {true}
      grabCursor={true}
      breakpoints={settings}
      modules={[Pagination]}
      className="mySwiper">
      {children}
    </Swiper>
  );
};

export default Slider;
