import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import swipeImage from "../../../assets/img/swipe.png";

import "swiper/css";
import styles from "./TopProduct.module.scss";

const TopProduct = ({ items }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [activeIndex, setActiveIndex] = useState(0);

  // Отслеживаем изменение ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.root}>
      <h3>Top of the season</h3>
      <div className={styles.wrap}>
        {activeIndex < 2 && (
          <img src={swipeImage} className={styles.swipe_img} alt="" />
        )}
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={isMobile ? 2 : 5} // 2 слайда на мобильных, 5 на больших экранах
          spaceBetween={isMobile ? 20 : 10} // 20px между слайдами на мобильных
          centeredSlides={isMobile} // Включаем центрирование только на мобильных
          breakpoints={{
            1200: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            800: { slidesPerView: 3 },
            200: { slidesPerView: 2 },
          }}
        >
          {items.map((item, id) =>
            item.rating > 4 ? (
              <SwiperSlide key={id} className={styles.slide}>
                <Link to="#" className={styles.item}>
                  <div className={styles.img}>
                    <picture>
                      <source
                        srcSet={item.imageUrl}
                        media="(min-width: 900px)"
                      />
                      <img src={item.imageUrl} alt="" />
                    </picture>
                  </div>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.desc}>
                    <p>26 см</p>
                    <p>традиционное</p>
                  </div>
                </Link>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default TopProduct;
