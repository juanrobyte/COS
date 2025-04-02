import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/MyCarousel.css";
import promo1 from "../static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-02.png";
import promo2 from "../static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-03.png";
import promo1Mobile from "../static/piezas/PIEZAS-GRAFICAS-MOBILE-02.png";
import promo2Mobile from "../static/piezas/PIEZAS-GRAFICAS-MOBILE-03.png";
import promo1Tablet from "../static/piezas/PIEZAS-GRAFICAS-TABLET-02.png";
import promo2Tablet from "../static/piezas/PIEZAS-GRAFICAS-TABLET-03.png";

const MyCarousel = () => {
  const [screenType, setScreenType] = useState("desktop"); // mobile, tablet, desktop

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      if (window.innerWidth <= 768 && isPortrait) {
        setScreenType("mobile");
      } else if (window.innerWidth > 768 && window.innerWidth <= 1024 && isPortrait) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event('resize')); // Fuerza un recalculo del layout
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000); // Retrasa el recalculo
  }, []);

  return (
    <Slider {...settings}>
      <div className="carousel-item">
        <img
          src={
            screenType === "mobile" 
              ? promo1Mobile 
              : screenType === "tablet" 
              ? promo1Tablet 
              : promo1
          }
          alt="Vacaciones de Invierno"
          className="carousel-image"
        />
      </div>
      <div className="carousel-item">
        <img
          src={
            screenType === "mobile" 
              ? promo2Mobile 
              : screenType === "tablet" 
              ? promo2Tablet 
              : promo2
          }
          alt="Fiestas Patrias"
          className="carousel-image"
        />
      </div>
      {/* Puedes agregar más slides aquí */}
    </Slider>
  );
};

// Componente para la flecha siguiente
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={className}
      style={{
        ...style,
        display: "block !important",
        color: "#CDCDCD !important",
        fontSize: "30px !important!",
        transition: "color 0.3s ease !important",
        margin: "0 !important",
        padding: "0 !important",
        width: "30px !important",
        height: "30px !important",
        boxShadow: "none !important"
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#CDCDCD")}
    />
  );
};

// Componente para la flecha anterior
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={className}
      style={{
        ...style,
        display: "block !important",
        color: "#CDCDCD !important" ,
        fontSize: "30px !important",
        transition: "color 0.3s ease !important",
        width: "30px !important",
        height: "30px !important",
        boxShadow: "none !important"
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#CDCDCD")}
    />
  );
};

export default MyCarousel;
