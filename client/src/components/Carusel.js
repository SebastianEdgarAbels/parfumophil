import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carusel.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { PerfumesContext } from "../context/perfumesContext";

export default function Carusel() {
  const { perfumes } = useContext(PerfumesContext);
  // console.log('perfumes :>> ', perfumes);
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {perfumes &&
          perfumes.map((perfume, i) => {
            return (
              <SwiperSlide key={i}>
                <img src={perfume.img} alt={perfume.name} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
