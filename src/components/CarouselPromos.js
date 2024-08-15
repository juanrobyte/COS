import React, {useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/MyCarousel.css";
import promo1 from "../static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-02.png";
import promo2 from "../static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-03.png";



const MyCarousel = () => {
  const settings = {
    dots: false, // Mostrar puntos de navegación
    infinite: true, // Loop infinito
    speed: 500, // Velocidad de la transición
    slidesToShow: 2, // Mostrar 2 slides por defecto
    slidesToScroll: 1, // Desplazar un slide a la vez
    autoplay: true, // Habilitar autoplay
    autoplaySpeed: 3000, // 3 segundos entre transiciones
    pauseOnHover: false, // No pausar al hacer hover
    nextArrow: <SampleNextArrow />, // Flecha personalizada para siguiente
    prevArrow: <SamplePrevArrow />, // Flecha personalizada para anterior
    responsive: [
      {
        breakpoint: 768, // Pantallas con ancho menor o igual a 768px (móvil)
        settings: {
          slidesToShow: 1, // Mostrar 1 slide en modo portrait/móvil
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Pantallas con ancho menor o igual a 1024px (tablets y portrait en landscape)
        settings: {
          slidesToShow: 2, // Mostrar 2 slides en modo landscape
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      <div className="carousel-item" style={{ backgroundColor: '#000', height: '300px' }}>
      <img
          src={promo1}
          alt="Vacaciones de Invierno"
          className="carousel-image"
        />
      </div>
      <div className="carousel-item" style={{ backgroundColor: '#000', height: '300px' }}>
      <img
          src={promo2}
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
        display: "block",
        color: "#CDCDCD", // Color predeterminado de las flechas
        fontSize: "30px",
        transition: "color 0.3s ease", // Transición suave al cambiar el color
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")} // Cambia a negro en hover
      onMouseLeave={(e) => (e.currentTarget.style.color = "#CDCDCD")} // Vuelve al color predeterminado al salir del hover
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
        display: "block",
        color: "#CDCDCD", // Color predeterminado de las flechas
        fontSize: "30px",
        transition: "color 0.3s ease", // Transición suave al cambiar el color
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")} // Cambia a negro en hover
      onMouseLeave={(e) => (e.currentTarget.style.color = "#CDCDCD")} // Vuelve al color predeterminado al salir del hover
    />
  );
};

export default MyCarousel;
