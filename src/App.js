import './App.css';
import logo from "./static/icon.png"
import logo_iso from "./static/CS alternativo2 blanco.png"
import login from "./static/login3.svg"
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParallax } from 'react-scroll-parallax';
import { useNavigate } from "react-router-dom";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Footer from './components/Footer';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input'
import Navbar from './components/Navbar'


function App() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [origen, setOrigen] = useState([]);
  const [passengers, setPassengers] = useState([])
  const [destino, setDestino] = useState([]);
  const [fechaIda, setFechaIda] = useState('');
  const [fechaVuelta, setFechaVuelta] = useState('');
  const [passengersAmount, setPassengerAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardOne, setCardOne] = useState(false);
  const [cardTwo, setCardTwo] = useState(true);
  const [cardThree, setCardThree] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [origenSelected, setOrigenSelected] = useState([]);
  const [origen2Selected, setOrigen2Selected] = useState([]);
  const [destinoSelected, setDestinoSelected] = useState([]);
  const [destino2Selected, setDestino2Selected] = useState([]);
  const [codigoDeArea, setCodigoDeArea] = useState('1')
  const [modalOpen, setModalOpen] = useState(false)
  const [visibility, setVisibility] = useState('none')
  const { ref } = useParallax < HTMLDivElement > ({
    rotate: [0, 360],
  });

  const blue = {
    100: '#daecff',
    200: '#b6daff',
    300: '#66b2ff',
    400: '#3399ff',
    500: '#007fff',
    600: '#0072e5',
    700: '#0059B2',
    800: '#004c99',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };


  const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `,
  );

  const StyledInput = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
      };
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 4rem;
    text-align: center;

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }

    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;

    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
      color: ${grey[50]};
    }

    &:focus-visible {
      outline: 0;
    }

    &.increment {
      order: 1;
    }
  `,
  );


  useEffect(() => {
    axios.get('http://compara-seguro.com:5000/paises')
      .then((res) => {
        const destinox = []
        const paisex = []
        const paises = res.data.paises
        const destinos = res.data.destinos
        for (var x in paises) {
          paisex.push({
            value: paises[x].id,
            label: paises[x].nombre
          })
        }
        for (var x in destinos) {
          destinox.push({
            value: destinos[x].id,
            label: destinos[x].nombre
          })
        }

        setDestino(destinox)
        setOrigen(paisex)

      })
      .catch((err) => console.log(err))
  }, [])
  const cotizar = () => {
    if ([origenSelected, destinoSelected, fechaIda, fechaVuelta, phoneNumber, email].includes("")) {
      alert("Introduce los valores requeridos")
      return
    }
    axios.post('http://compara-seguro.com:5000/cotizar', {
      origen: origenSelected,
      destinos: destinoSelected,
      fechaStart: fechaIda,
      fechaEnd: fechaVuelta,
      correo: email,
      telefono: phoneNumber,
      viajeros: passengers,
      destinos2: destino2Selected,
      origen2: origen2Selected
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'crossorigin': true
      }
    }
    )
      .then((response) => {
        if (response.data.status === 200) {
          navigate("/planes", { state: { data: response.data } });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const changeModal = () => {
    console.log(modalOpen)
    if (modalOpen === true) {
      setVisibility('none')
      setModalOpen(false)
    }
    else {
      setVisibility('flex')
      setModalOpen(true)
    }
  }
  const handlePassengers = (age, indexad) => {

    const newPassengers = []
    const card = { age: age, index: indexad }
    newPassengers.push(card)
    passengers.forEach((element) => {
      console.log(element.index === indexad)
      if (element.index == indexad) {
        console.log(indexad)
        console.log('passed')
        return
      }
      else {
        newPassengers.push(element)
      }
    })
    setPassengers(newPassengers)
  }

  useEffect(() => {
    console.log(passengers)
  }, [passengers])

  const handleWork = (id) => {

  }
  return (
    <div className='home'>
      <div className={`App ${isOpen && "openz"}`}>
        <div id='cotizar' className='form'>
          <div className='columna-1'>
            <div className='origen'>
              Origen:
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={origen[0]}
                name="origen"
                options={origen}
                onChange={(event) => {
                  setOrigenSelected(event.value)
                  setOrigen2Selected(event.label)
                  console.log(event.value)
                }}
              />
            </div>
            <div className='destino'>
              Destino:
              <Select
                defaultValue={[destino[0]]}
                isMulti
                name="destino"
                options={destino}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(event) => {
                  var orix = []
                  var orix2 = []
                  for (var x in event) {
                    orix.push(event[x].value)
                    orix2.push(event[x].label)
                  }
                  setDestinoSelected(orix)
                  setDestino2Selected(orix2)
                  console.log(orix)
                }}

              />

            </div>
            <div className='fechaIda'>
              Fecha ida:
              <input type="date" value={fechaIda} onChange={(e) => console.log(e.target.value)} />
            </div>
            <div className='fechaVuelta'>
              Fecha vuelta:
              <input type="date" value={fechaVuelta} onChange={(e) => setFechaVuelta(e.target.value)} />
            </div>
          </div>
          <div className='columna-2'>
            <div className='passengersAmount'>
              ¿Quiénes viajarán?
              <a className="buttonhot" onClick={() => changeModal()} >
                {passengersAmount} viajeros de {passengers.map((x) => {
                  return (<>{x.age}, </>)
                })} años
              </a>
            </div>

            <div className='email'>
              Email:
              <input type="email" placeholder='example@mail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='codigodearea'>
              <PhoneInput
                defaultCountry="RU"
                value={phoneNumber}
                onChange={setPhoneNumber} /> 
            </div>
            <div className='phoneNumber'>
              Número celular:
              <input type="tel" placeholder='8548677' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>
          <div className='columna-3'>
            <div style={{ display: visibility }} className='modalPassenger' >
              <div className="columna1">
                <span>Numero de viajeros</span>
                <NumberInput
                  onChange={(event, inputValue) => {
                    setPassengerAmount(inputValue)
                  }}
                  slots={{
                    root: StyledInputRoot,
                    input: StyledInput,
                    incrementButton: StyledButton,
                    decrementButton: StyledButton,
                  }}
                  max={14}
                  min={1}
                  slotProps={{
                    incrementButton: {
                      children: <AddIcon fontSize="small" />,
                      className: 'increment',
                    },
                    decrementButton: {
                      children: <RemoveIcon fontSize="small" />,
                    },
                  }}
                />

              </div>
              <div className="columna2">
                {passengersAmount !== 0 && Array.from(Array(passengersAmount), (e, index) => {
                  return (
                    <div className="ageCard" key={index}>
                      <span>Edad actual viajero {index + 1}</span>
                      <input type='number' className='edad-viajero' onChange={(e) => { handlePassengers(e.target.value, index) }} min='1' max='90' />
                    </div>
                  )
                })}

              </div>
              <div className="columna3">
                <input type='submit' className='listo' value='Listo' onClick={() => {
                  changeModal()
                }} />
              </div>
            </div>
            <div className='checkbox'>
              Al continuar estás aceptando nuestros
              <a href='/terms' className='tyc'>
                Términos y Condiciones
              </a>
            </div>
            <input type="submit" className='submitButton' value="Cotizar" onClick={cotizar} />
          </div>
        </div>
        <div className='sec-1'>
          <Navbar section={2} menuVisible={menuVisible} setMenuVisible={setMenuVisible}></Navbar>

          {/* <div className='content-Slider'>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="slider"
          containerClass="container"
          dotListClass=""
          draggable
          customTransition="all .5"
          transitionDuration={500}
          focusOnSelect={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={true}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1020,
              },
              items: 5,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 430,
                min: 932,
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 820,
                min: 1180,
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          rewind={true}
          rewindWithAnimation={true}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable={true}
          infinite={true}
          

        >
          <div className='card'>
          <img draggable={false} src={require("./static/slider/boton-asistencia.png")} className='img_slider' alt='Asistencia Médica'/>
       
            </div>
          <div className='card'>
          <img draggable={false} src={require("./static/slider/boton-ticketes.png")} className='img_slider' alt='Asistencia Médica'/>
        
            </div>
          <div className='card'>
          <img draggable={false} src={require("./static/slider/boton-vehiculos.png")} className='img_slider' alt='Asistencia Médica'/>
           
            </div>
          <div className='card'>
          <img draggable={false} src={require("./static/slider/boton-hoteles.png")} className='img_slider' alt='Asistencia Médica'/>
          
            </div>
          <div className='card'>
          <img draggable={false} src={require("./static/slider/boton-beneficios.png")} className='img_slider' alt='Asistencia Médica'/>
      
            </div>
          
        </Carousel>
          </div> */}
        </div>
        <div className='sec-2'>
          <div className='content-carousel'>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className="slider"
              containerClass="container"
              dotListClass=""
              draggable
              customTransition="all .5"
              transitionDuration={500}
              focusOnSelect={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={true}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1020,
                  },
                  items: 1,
                  partialVisibilityGutter: 40
                },
                mobile: {
                  breakpoint: {
                    max: 430,
                    min: 932,
                  },
                  items: 1,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: {
                    max: 820,
                    min: 1180,
                  },
                  items: 1,
                  partialVisibilityGutter: 30
                }
              }}
              rewind={true}
              rewindWithAnimation={true}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable={true}
              infinite={true}
            >
              <div className='card-sec-2'>
                <img src={require('./static/Promociones asistencias.png')} />
              </div>
              <div className='card-sec-2'>
                <img src={require('./static/Promociones alojamiento.png')} />
              </div>

            </Carousel>
          </div>
        </div>


      </div>
      <div className='section-why'>
        <div className='why-contain'>
          <img src={require('./static/why text.png')} className='img-why' />
          <div className='text-why'>
            <h1 className='why-title'>¿Por qué elegirnos?</h1>
            <p className='why-text'>· Nos apasiona asesorar a nuestros clientes. Más de 20.000 personas han confiado en nosotros para obtener información detallada y precisa que mejora su experiencia en viaje.</p>
            <p className='why-text'>· Nos obsesionamos con la experiencia de nuestros clientes, asegurándonos de que cada interacción supere sus expeculaciones.</p>
            <p className='why-text'>· Colaboramos con las compañías de servicios más serias y reconocidas del mercado, para nosotros la confianza y respaldo es importante. </p>
            <p className='why-text'>· Nos importa porque nosostros también somos clientes, entendemos tus necesidades y expectativas.</p>
          </div>
        </div>
      </div>

      <div className='sec-4'>

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="slider"
          containerClass="container"
          dotListClass=""
          draggable
          customTransition="all .5"
          transitionDuration={500}
          focusOnSelect={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={true}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1020,
              },
              items: 3,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 430,
                min: 932,
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 820,
                min: 1180,
              },
              items: 1,
              partialVisibilityGutter: 30
            }
          }}
          rewind={true}
          rewindWithAnimation={true}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable={true}
          infinite={true}
          afterChange={(previousSlide, _ref) => {
            var currentSlide = _ref.currentSlide;
            if ([2, 5].includes(currentSlide)) {
              setCardOne(true)
              setCardTwo(false)
              setCardThree(false)
            }
            if ([0, 3, 6].includes(currentSlide)) {
              setCardOne(false)
              setCardTwo(true)
              setCardThree(false)
            }
            if ([1, 4].includes(currentSlide)) {
              setCardOne(false)
              setCardTwo(false)
              setCardThree(true)
            }
          }}
        >
          <div className='cardOpinions' >
            <div className={`cardOp ${cardOne ? "focus" : ""}`} id="1" >
              <span className='opinionText'>¿Qué es y por qué debo <br /> tener un seguro de viajes?</span>
              <div className='imageContainer'>
                <img src={require('./static/familia.png')} className="opinionImage" draggable={false} />
                {cardOne ? (<>
                  <span className="descriptionOpinion">En Comparaseguro, somos más que una simple compañía de seguros. Somos un equipo de expertos...</span>
                  <a className='descriptionCTA'>Ver más</a>
                </>) : (<></>)}

              </div>
            </div>
          </div>

          <div className='cardOpinions'>
            <div className={`cardOp ${cardTwo ? "focus" : ""}`} id="1" >
              <span className='opinionText'>¿Por qué elegir<br /> Comparaseguro?</span>
              <div className='imageContainer'>
                <img src={require('./static/group.png')} className="opinionImage" draggable={false} />
                {cardTwo ? (<>
                  <span className="descriptionOpinion">En Comparaseguro, somos más que una simple compañía de seguros. Somos un equipo de expertos...</span>
                  <a className='descriptionCTA'>Ver más</a>
                </>) : (<></>)}

              </div>
            </div>
          </div>

          <div className='cardOpinions'>
            <div className={`cardOp ${cardThree ? "focus" : ""}`} id="1" >
              <span className='opinionText'>¿Qué cubre un seguro <br /> de viaje y cómo se usa?</span>
              <div className='imageContainer'>
                <img src={require('./static/chica 1.png')} className="opinionImage" draggable={false} />
                {cardThree ? (<>
                  <span className="descriptionOpinion">En Comparaseguro, somos más que una simple compañía de seguros. Somos un equipo de expertos...</span>
                  <a className='descriptionCTA'>Ver más</a>
                </>) : (<></>)}

              </div>
            </div>
          </div>

        </Carousel>
      </div>
      <Footer />
    </div>




  );
}

export default App;
