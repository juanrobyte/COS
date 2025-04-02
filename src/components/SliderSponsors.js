import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import aliado1 from '../static/sponsor1.png';
import aliado2 from '../static/sponsor2.png';
import aliado3 from '../static/sponsor3.png';
import aliado4 from '../static/sponsor4.png';
import aliado5 from '../static/sponsor5.png';
import aliado6 from '../static/sponsor6.png';

const MySlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1,
        cssEase: "linear",
        nextArrow: null,
        prevArrow: null,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          }
        ]
      };

  return (
    <Slider {...settings}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', padding: '0 10px' }}>
        <img src={aliado1} alt="Imagen 1" style={{width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain'}} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', padding: '0 10px' }}>
        <img src={aliado2} alt="Imagen 2" style={{width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain'}} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', padding: '0 10px' }}>
        <img src={aliado3} alt="Imagen 3" style={{width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain'}} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', padding: '0 10px' }}>
        <img src={aliado4} alt="Imagen 4" style={{width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain'}} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', padding: '0 10px' }}>
        <img src={aliado5} alt="Imagen 5" style={{width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain'}} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', padding: '0 10px' }}>
        <img src={aliado6} alt="Imagen 6" style={{width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain'}} />
      </div>
    </Slider>
  );
};

export default MySlider;
