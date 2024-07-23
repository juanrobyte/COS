import React from 'react'
import Navbar from './components/Navbar'
import { useState, useRef, useEffect } from 'react'
import './styles/Home.css'
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { DateRangePicker, Footer, Stack } from 'rsuite';
import { FaChevronDown } from "react-icons/fa";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import Select from 'react-select';
import { color } from '@mui/system';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer2 from './components/Footer.js'
import MediaQuery from 'react-responsive'
import moment from "moment";
import Modal from './Modal.js';
import useModal from './hooks/useModal'

function Home() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [origen, setOrigen] = useState([]);
    const [origenSelected, setOrigenSelected] = useState([]);
    const [origen2Selected, setOrigen2Selected] = useState([]);
    const [destino, setDestino] = useState([]);
    const [destinoSelected, setDestinoSelected] = useState([]);
    const [destino2Selected, setDestino2Selected] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passengersAmount, setPassengerAmount] = useState(0);
    const [passengers, setPassengers] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [visibility, setVisibility] = useState('none')
    const navigate = useNavigate();
    const [fechaIda, setFechaIda] = useState('');
    const [fechaVuelta, setFechaVuelta] = useState('');
    const [email, setEmail] = useState('');
    const [cardOne, setCardOne] = useState(false);
    const [cardTwo, setCardTwo] = useState(true);
    const [cardThree, setCardThree] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [codigoDeArea, setCodigoDeArea] = useState('1')
    const [isOpenModal, openModal, closeModal] = useModal(false)
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
    const changeModal = () => {
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
            if (element.index == indexad) {
                return
            }
            else {
                newPassengers.push(element)
            }
        })
        setPassengers(newPassengers)
    }
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
            });
    }

    useEffect(() => {
    }, [passengers])

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

    return (
        <div className='Home'>
            <div className='seccion-servicios'>
                <Navbar section={1} menuVisible={menuVisible} setMenuVisible={setMenuVisible}></Navbar>
            </div>
            <MediaQuery orientation={'portrait'}>
            <div className='seccion-comparador' onClick={openModal} >
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <div className='form-mobile'>
                <div className='origen' onClick={openModal}>
                        <img src={require('./static/icono-mapmarker.png')} draggable={false} />

                        <Select
                            style={{ fontWeight: 'bold',  }}
                            placeholder='Origen'
                            className="basic-single"
                            classNamePrefix="select"
                            name="origen"
                            options={origen}
                            onChange={(event) => {
                                setOrigenSelected(event.value)
                                setOrigen2Selected(event.label)
                            }}
                        />
                    </div>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                </div>
            </Modal>
                <div className='sec1-form'>
                    <div className='origen' onClick={openModal}>
                        <img src={require('./static/icono-mapmarker.png')} draggable={false} />

                        <Select
                            isDisabled={isDisabled}
                            onClick={openModal}
                            style={{ fontWeight: 'bold', }}
                            placeholder='Origen'
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={origen[0]}
                            name="origen"
                            options={origen}
                            onChange={(event) => {
                                setOrigenSelected(event.value)
                                setOrigen2Selected(event.label)
                            }}
                        />
                    </div>
                    <div className='destino'>
                        <img src={require('./static/icono-mapmarker.png')} draggable={false} />

                        <Select
                            isDisabled={isDisabled}
                            style={{ fontWeight: 'bold', }}
                            placeholder='Destino'
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

                            }}
                        />
                    </div>
                    <div className='fechainit-fechaend'>
                        <img src={require('./static/calendar-icon.png')} draggable={false} />

                        <Stack spacing={10} direction="column" alignItems="flex-start">
                            <DateRangePicker disabled  editable={false} onChange={(event)=>{ setFechaIda(moment(event[0]).utc().format('YYYY-MM-DD')); setFechaVuelta(moment(event[1]).utc().format('YYYY-MM-DD')) }} style={{ fontWeight: 'bold', }} caretAs={FaChevronDown} placeholder="¿Cuándo Viajas?" format="dd.MM.yyyy" />
                        </Stack>
                    </div>
                </div>
                <div className='sec2-form'>

                    <div className='passengersAmount'>
                        <img src={require('./static/avatar.png')} draggable={false} />
                        <a className="buttonhot" onClick={() => changeModal()} >
                            {passengersAmount} viajeros de {passengers.map((x) => {
                                return (<>{x.age}, </>)
                            })} años
                        </a>
                    </div>

                    <div className='email'>
                        <img src={require('./static/Email.png')} draggable={false} />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Correo electronico' />
                    </div>
                    <div className='phoneNumber'>
                        <PhoneInput
                            placeholder='Celular'
                            defaultCountry="co"
                            value={phoneNumber}
                            onChange={(phone) => setPhoneNumber(phone)}
                        />
                    </div>


                    <div className='coupon'>
                        <img src={require('./static/cupon.png')} draggable={false} />
                        <input type="text" placeholder='# Cupon' />
                    </div>
                </div>
                <div className='sec3-form'>
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
                            <input type='submit' className='listo' value='Listo' onClick={() => { changeModal() }} />
                        </div>
                    </div>
                    <div className='checkbox'>
                        <p>Al continuar estás aceptando nuestros</p>
                        <a href='/terms' className='tyc'>
                            Términos y Condiciones
                        </a>
                    </div>
                    <input type="submit" className='submitButton' value="Cotizar" onClick={cotizar} />
                </div>
            </div>
            </MediaQuery>
            <MediaQuery orientation={'landscape'}>
            <div className='seccion-comparador'>
                <div className='sec1-form'>
                    <div className='origen'>
                        <img src={require('./static/icono-mapmarker.png')} draggable={false} />

                        <Select
                            style={{ fontWeight: 'bold', }}
                            placeholder='Origen'
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={origen[0]}
                            name="origen"
                            options={origen}
                            onChange={(event) => {
                                setOrigenSelected(event.value)
                                setOrigen2Selected(event.label)
                            }}
                        />
                    </div>
                    <div className='destino'>
                        <img src={require('./static/icono-mapmarker.png')} draggable={false} />

                        <Select
                            style={{ fontWeight: 'bold', }}
                            placeholder='Destino'
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

                            }}
                        />
                    </div>
                    <div className='fechainit-fechaend'>
                        <img src={require('./static/calendar-icon.png')} draggable={false} />

                        <Stack spacing={10} direction="column" alignItems="flex-start">
                            <DateRangePicker onChange={(event)=>{ setFechaIda(moment(event[0]).utc().format('YYYY-MM-DD')); setFechaVuelta(moment(event[1]).utc().format('YYYY-MM-DD')) }} style={{ fontWeight: 'bold', }} caretAs={FaChevronDown} placeholder="¿Cuándo Viajas?" format="dd.MM.yyyy" />
                        </Stack>
                    </div>
                </div>
                <div className='sec2-form'>

                    <div className='passengersAmount'>
                        <img src={require('./static/avatar.png')} draggable={false} />
                        <a className="buttonhot" onClick={() => changeModal()} >
                            {passengersAmount} viajeros de {passengers.map((x) => {
                                return (<>{x.age}, </>)
                            })} años
                        </a>
                    </div>

                    <div className='email'>
                        <img src={require('./static/Email.png')} draggable={false} />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Correo electronico' />
                    </div>
                    <div className='phoneNumber'>
                        <PhoneInput
                            placeholder='Celular'
                            defaultCountry="co"
                            value={phoneNumber}
                            onChange={(phone) => setPhoneNumber(phone)}
                        />
                    </div>


                    <div className='coupon'>
                        <img src={require('./static/cupon.png')} draggable={false} />
                        <input type="text" placeholder='# Cupon' />
                    </div>
                </div>
                <div className='sec3-form'>
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
                            <input type='submit' className='listo' value='Listo' onClick={() => { changeModal() }} />
                        </div>
                    </div>
                    <div className='checkbox'>
                        <p>Al continuar estás aceptando nuestros</p>
                        <a href='/terms' className='tyc'>
                            Términos y Condiciones
                        </a>
                    </div>
                    <input type="submit" className='submitButton' value="Cotizar" onClick={cotizar} />
                </div>
            </div>
            </MediaQuery>
            
            <MediaQuery orientation={'portrait'}>
                <div className='seccion-promociones'>
                    <div className='titulo-promociones'>
                        <h1>Descubre Nuestra<br />Promociones</h1>
                    </div>
                    <div className='promociones-slide'>
                        <img draggable={false} src={require('./static/promos/promo1.png')} alt='promo1' className='img-promo' />
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'landscape'}>
                <div className='seccion-promociones'>
                    <div className='titulo-promociones'>
                        <h1>Descubre<br />Nuestra<br />Promociones</h1>
                    </div>
                    <div className='promociones-slide'>
                        <img draggable={false} src={require('./static/promos/promo1.png')} alt='promo1' className='img-promo' />
                    </div>
                </div></MediaQuery>
            <div className='seccion-whychooseus'>
                <div style={{ height: '50%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <span className='titleHeadline'>¿Por qué elegirnos?</span>
                </div>

                <div className='content-cards' style={{ height: '50%' }}>

                    <div className='iosCard'>
                        <img className='iconBlue' draggable={false} src={require('./static/planet.png')}></img>
                        <div>
                            <span className='title-card'>Cobertura Global</span>
                            <p className='contain-card'>Comparamos seguros de todo <br />el mundo, asegurándote la <br /> mejor opción, sin importar tu <br /> destino.</p>
                        </div>
                    </div>

                    <div className='iosCard'>
                        <img className='iconBlue' draggable={false} src={require('./static/pig.png')}></img>
                        <div>
                            <span className='title-card'>Ahorro Inteligente</span>
                            <p className='contain-card'>Encuentra las mejores tarifas y <br />coberturas en un solo lugar.<br /> ¡Tu bolsillo lo agradecerá!<br /><br /></p>
                        </div>
                    </div>

                    <div className='iosCard'>
                        <img className='iconBlue' draggable={false} src={require('./static/shakeit.png')}></img>
                        <div>
                            <span className='title-card'>Fácil y Rápido</span>
                            <p className='contain-card'>En Compara Seguro obtienes <br /> cotizaciones en minutos.<br /> ¡Menos estrés, más<br /> vacaciones!</p>
                        </div>
                    </div>

                </div>

            </div>
            <MediaQuery orientation={'landscape'}>
                <div className='seccion-nuestros-seguros'>
                    <div className='titulo-nuestros-seguros'>
                        <h1>Nuestros<br />seguros<br />tienen las<br />coberturas<br />que necesitas</h1>
                    </div>
                    <div className='nuestros-seguros-acordeones'>
                        <div className='accor-1'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-07.png')} alt='Asistencia médica' className='accor-img' />
                                        Asistencia médica internacional
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-2'>
                            <Accordion>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-08.png')} alt='Asistencia médica' className='accor-img' />
                                        Medicamentos
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-3'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-09.png')} alt='Asistencia médica' className='accor-img' />
                                        Cancelación de Vuelos
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-4'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-10.png')} alt='Asistencia médica' className='accor-img' />
                                        Asistencia Médica con Preexistencias
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-5'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-11.png')} alt='Asistencia médica' className='accor-img' />
                                        Odontología
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-6'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-12.png')} alt='Asistencia médica' className='accor-img' />
                                        Pérdida de Equipaje
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'portrait'}>
                <div className='seccion-nuestros-seguros'>
                    <div className='titulo-nuestros-seguros'>
                        <h1>Nuestros seguros<br />tienen las<br />coberturas que<br />necesitas</h1>
                    </div>
                    <div className='nuestros-seguros-acordeones'>
                        <div className='accor-1'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-07.png')} alt='Asistencia médica' className='accor-img' />
                                        Asistencia médica internacional
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-2'>
                            <Accordion>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-08.png')} alt='Asistencia médica' className='accor-img' />
                                        Medicamentos
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-3'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-09.png')} alt='Asistencia médica' className='accor-img' />
                                        Cancelación de Vuelos
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-4'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-10.png')} alt='Asistencia médica' className='accor-img' />
                                        Asistencia Médica con Preexistencias
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-5'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-11.png')} alt='Asistencia médica' className='accor-img' />
                                        Odontología
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accor-6'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-12.png')} alt='Asistencia médica' className='accor-img' />
                                        Pérdida de Equipaje
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'landscape'}>
                <div className='seccion-opinion-clientes'></div>
                <div className='opinion-clientes'>
                    <div className='titulo-opiniones-clientes'>
                        <h1>Lo que nuestros clientes dicen sobre nosotros</h1>
                    </div>
                    <div className='click-opinion'>
                        <div className='opinion-1'>
                            <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-20.png')} alt='opiniones' className='opiniones-img' />
                            <h1>Ana Loaiza</h1>
                            <div className='opnion-textos'>
                                <p>Excelente servicio, siempre están</p>
                                <p>disponibles y me ayudaron</p>
                                <p>rápidamente en una emergencia.</p>
                                <p>Muy recomendable.</p>
                            </div>
                            <div className='calificacion-opiniones'>
                                <img draggable={false} src={require('./static/stars.png')} alt='calificación' className='calificacion-img' />
                            </div>
                        </div>
                        <div className='opinion-2'>
                            <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-22.png')} alt='opiniones' className='opiniones-img' />
                            <h1>Carlos Pelaez</h1>
                            <div className='opnion-textos'>
                                <p>El plan es muy completo y el</p>
                                <p>personal es muy profesional. No</p>
                                <p>he tenido problemas con las</p>
                                <p>autorizaciones ni reembolsos</p>
                            </div>
                            <div className='calificacion-opiniones'>
                                <img draggable={false} src={require('./static/stars.png')} alt='calificación' className='calificacion-img' />
                            </div>
                        </div>
                        <div className='opinion-3'>
                            <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-21.png')} alt='opiniones' className='opiniones-img' />
                            <h1>Juliana Mesa</h1>
                            <div className='opnion-textos'>
                                <p>Muy satisfecha con la cobertura y</p>
                                <p>la atención al cliente. Resolvieron</p>
                                <p>todas mis dudas y el proceso de</p>
                                <p>inscripción fue sencillo.</p>
                            </div>
                            <div className='calificacion-opiniones'>
                                <img draggable={false} src={require('./static/stars.png')} alt='calificación' className='calificacion-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'portrait'}>
                <div className='opinion-clientes'>
                    <div className='titulo-opiniones-clientes'>
                        <h1>Lo que nuestros<br />clientes dicen sobre<br />nosotros</h1>
                    </div>
                    <div className='click-opinion'>
                        <div className='opinion-1'>
                            <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-20.png')} alt='opiniones' className='opiniones-img' />
                            <h1>Ana Loaiza</h1>
                            <div className='opnion-textos'>
                                <p>Excelente servicio, <br />siempre están<br />disponibles y me<br />ayudaron<br />rápidamente en una<br />emergencia. Muy recomendable.</p>
                            </div>
                            <div className='calificacion-opiniones'>
                                <img draggable={false} src={require('./static/stars.png')} alt='calificación' className='calificacion-img' />
                            </div>
                        </div>
                        <div className='opinion-2'>
                            <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-22.png')} alt='opiniones' className='opiniones-img' />
                            <h1>Carlos Pelaez</h1>
                            <div className='opnion-textos'>
                                <p>El plan es muy completo y el</p>
                                <p>personal es muy profesional. No</p>
                                <p>he tenido problemas con las</p>
                                <p>autorizaciones ni reembolsos</p>
                            </div>
                            <div className='calificacion-opiniones'>
                                <img draggable={false} src={require('./static/stars.png')} alt='calificación' className='calificacion-img' />
                            </div>
                        </div>
                        <div className='opinion-3'>
                            <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-21.png')} alt='opiniones' className='opiniones-img' />
                            <h1>Juliana Mesa</h1>
                            <div className='opnion-textos'>
                                <p>Muy satisfecha con la cobertura y</p>
                                <p>la atención al cliente. Resolvieron</p>
                                <p>todas mis dudas y el proceso de</p>
                                <p>inscripción fue sencillo.</p>
                            </div>
                            <div className='calificacion-opiniones'>
                                <img draggable={false} src={require('./static/stars.png')} alt='calificación' className='calificacion-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery orientation={'landscape'}>
                <div className='seccion-blog'>
                    <div className='text-btn-blog'>
                        <div className='textos-blog'>
                            <h1>Consejos<br />únicos te<br />esperan en<br />nuestro blog</h1>
                        </div>
                        <div className='botones-blog'>
                            <a href='#' className='ver-mas-art'>Ver más artículos</a>
                            <a className='iconArrow'><img draggable={false} src={require('./static/leftArrow.png')} /></a>
                            <a className='iconArrow'><img draggable={false} src={require('./static/rightArrow.png')} /></a>
                        </div>
                    </div>
                    <div className='slider-blog'>
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img' />
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img1' />
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img' />
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'portrait'}>
                <div className='seccion-blog'>
                    <div className='text-btn-blog'>
                        <div className='textos-blog'>
                            <h1>Consejos únicos te<br />esperan en nuestro<br />blog</h1>
                        </div>
                        <div className='botones-blog'>
                            <a href='#' className='ver-mas-art'>Ver más artículos</a>
                            <div className='botones-slider'>
                                <a className='iconArrow'><img draggable={false} src={require('./static/leftArrow.png')} /></a>
                                <a className='iconArrow'><img draggable={false} src={require('./static/rightArrow.png')} /></a>
                            </div>

                        </div>
                    </div>
                    <div className='slider-blog'>
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img' />
                        <img draggable={false} src={require('./static/PIEZAS GRAFICAS WEB - COMPARASEGURO-13 mobile.png.png')} alt='slider-img-blog' className='slider-blog-img1' />
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img' />
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'landscape'}>
                <div className='seccion-blog'>
                    <div className='text-btn-blog'>
                        <div className='textos-blog'>
                            <h1>Consejos<br />únicos te<br />esperan en<br />nuestro blog</h1>
                        </div>
                        <div className='botones-blog'>
                            <a href='#' className='ver-mas-art'>Ver más artículos</a>
                            <a className='iconArrow'><img draggable={false} src={require('./static/leftArrow.png')} /></a>
                            <a className='iconArrow'><img draggable={false} src={require('./static/rightArrow.png')} /></a>
                        </div>
                    </div>
                    <div className='slider-blog'>
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img' />
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img1' />
                        <img draggable={false} src={require('./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-13.png')} alt='slider-img-blog' className='slider-blog-img' />
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'landscape'}>
                <div className='sponsors'>
                    <span className='titleHeadline' style={{ textAlign: 'center' }}>Las mejores asistencias son nuestros<br />aliados</span>
                    <div className='iconContent'>
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor1.png')} />
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor2.png')} />
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor3.png')} />
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor4.png')} />
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor5.png')} />
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor6.png')} />
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'portrait'}>
                <div className='sponsors'>
                    <span className='titleHeadline' style={{ textAlign: 'center' }}>Las mejores<br />asistencias son<br />nuestros aliados</span>
                    <div className='iconContent'>
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor1.png')} />
                        <img draggable={false} className='iconSponsor' src={require('./static/sponsor2.png')} />
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery orientation={'landscape'}>
                <div className='seccion-preguntas-frecuentes'>
                    <div className='titulo-preguntas-frecuentes'>
                        <h1>Preguntas<br />Frecuentes</h1>
                    </div>
                    <div className='preguntas-acordeones'>
                        <div className='accord-1'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 1?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-2'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 2?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-3'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 3?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-4'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 4?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-5'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 5?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-6'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 6?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery orientation={'portrait'}>
                <div className='seccion-preguntas-frecuentes'>
                    <div className='titulo-preguntas-frecuentes'>
                        <h1>Preguntas Frecuentes</h1>
                    </div>
                    <div className='preguntas-acordeones'>
                        <div className='accord-1'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 1?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-2'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 2?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-3'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 3?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-4'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 4?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-5'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 5?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className='accord-6'>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        ¿Esta es la pregunta 6?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <Footer2></Footer2>
        </div>
    )
}

export default Home
