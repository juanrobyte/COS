import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import aliado1 from '../static/sponsor1.png'
import aliado2 from '../static/sponsor2.png'
import aliado3 from '../static/sponsor3.png'
import aliado4 from '../static/sponsor4.png'
import aliado5 from '../static/sponsor5.png'
import aliado6 from '../static/sponsor6.png'

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
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };

  return (
    <Slider {...settings}>
      <div>
        <img src={aliado1} alt="Imagen 1" style={{width: '200px', height: '100px',}} />
      </div>
      <div>
        <img src={aliado2} alt="Imagen 1" style={{width: '200px', height: '100px',}} />
      </div>
      <div>
        <img src={aliado3} alt="Imagen 1" style={{width: '200px', height: '100px',}} />
      </div>
      <div>
        <img src={aliado4} alt="Imagen 1" style={{width: '200px', height: '100px',}} />
      </div>
      <div>
        <img src={aliado5} alt="Imagen 1" style={{width: '200px', height: '100px',}} />
      </div>
      <div>
        <img src={aliado6} alt="Imagen 1" style={{width: '200px', height: '100px',}} />
      </div>
    </Slider>
  );
};

export default MySlider;
