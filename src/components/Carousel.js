import React from 'react'
import '../styles/Carousel.css'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ccarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={require('../static/promos/promo1.png')} alt='promo1'/>
        <img src={require('../static/promos/promo2.png')} alt='promo2'/>
      </Carousel.Item>
      <Carousel.Item>
      <img src={require('../static/promos/promo2.png')} alt='promo2'/>
      </Carousel.Item>
    </Carousel>
  )
}

// h

export default Ccarousel;
