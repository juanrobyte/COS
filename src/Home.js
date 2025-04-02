import Navbar from "./components/Navbar";
import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import "./styles/Home.css";
import "rsuite/dist/rsuite.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DateRangePicker,
  Footer,
  Stack,
  Button,
  ButtonToolbar,
  CustomProvider,
} from "rsuite";
import es_ES from "rsuite/locales/es_ES";
import { es } from "date-fns/locale";
import { FaChevronDown } from "react-icons/fa";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import Select from "react-select";
import { components } from "react-select";
import { border, styled, width } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer2 from "./components/Footer.js";
import MediaQuery from "react-responsive";
import moment from "moment";
import "moment/locale/es";
import Modal from "./Modal.js";
import useModal from "./hooks/useModal";
import "@egjs/react-flicking/dist/flicking.css";
import SliderSponsors from "./components/SliderSponsors.js";
import MyCarousel from "./components/CarouselPromos.js";
import trash from "./static/ICON-TRASH.svg";
import "./styles/CarouselBlog.css";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const {
  allowedMaxDays,
  allowedDays,
  allowedRange,
  beforeToday,
  afterToday,
  combine,
} = DateRangePicker;

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    border: "1px solid #E0E0E0",
    boxShadow: "none",
    minHeight: "50px", // Altura por defecto
    padding: "0px 10px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "250px",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: 600,
    color: "#000",
    // Añadir media query para portrait mode
    "@media (orientation: portrait)": {
      minHeight: "30px", // Altura para portrait
      width: "100%",
      justifyContent: "space-between",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: "hidden", // Oculta el contenido que se desborde
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
    fontWeight: 600,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000", // Color del placeholder
    fontWeight: 600, // Espesor de fuente 500 en el placeholder
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: "0px",
  }),
  multiValue: (provided) => ({
    ...provided,
    maxWidth: "100%", // Asegura que los valores seleccionados no se salgan del contenedor
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%", // Asegura que el menú ocupe todo el ancho del contenedor
    borderRadius: "20px",
    marginTop: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px 0",
    zIndex: 9999, // Asegura que el menú se superponga a otros elementos
    fontFamily: "Montserrat", // Establece la fuente Montserrat
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999, // Asegura que el menú se superponga a otros elementos
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Montserrat", // Establece la fuente Montserrat
    fontSize: "14px",
    fontWeight: 800, // Espesor de fuente 800 para las opciones
    color: state.isSelected
      ? "#009C8C" // Color del texto para la opción seleccionada
      : state.isFocused
      ? "#009C8C" // Color del texto en hover
      : "#959999", // Color de texto por defecto
    backgroundColor: state.isSelected
      ? "#FFFFFF" // Fondo para la opción seleccionada
      : state.isFocused
      ? "#F5F7F8" // Fondo en hover
      : "#FFFFFF", // Fondo por defecto
    padding: "10px 15px",
    cursor: "pointer",
  }),
};

const customComponents = {
  DropdownIndicator: (props) => (
    <components.DropdownIndicator {...props}>
      <FaAngleDown size={14} />
    </components.DropdownIndicator>
  ),
  IndicatorSeparator: () => null, // Eliminar el separador
  MultiValueContainer: ({ selectProps, data, children, ...props }) => {
    const { value } = selectProps;
    const index = value.indexOf(data);

    // Mostrar solo el primer valor seleccionado, con "más n" si hay otros
    if (index === 0) {
      return (
        <components.MultiValueContainer {...props}>
          {children}
        </components.MultiValueContainer>
      );
    }

    if (index === 1) {
      return (
        <components.MultiValueContainer {...props}>
          {value.length - 1}+
        </components.MultiValueContainer>
      );
    }

    // No mostrar los valores adicionales
    return null;
  },
};

function Home() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [origen, setOrigen] = useState([]);
  const [origenSelected, setOrigenSelected] = useState([]);
  const [origen2Selected, setOrigen2Selected] = useState([]);
  const [destino, setDestino] = useState([]);
  const [destinoSelected, setDestinoSelected] = useState([]);
  const [destino2Selected, setDestino2Selected] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passengersAmount, setPassengersAmount] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibility, setVisibility] = useState("none");
  const [showDefaultText, setShowDefaultText] = useState(true);
  const navigate = useNavigate();
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");
  const [email, setEmail] = useState("");
  const [entries, setEntries] = useState([]);
  const [cardTwo, setCardTwo] = useState(true);
  const [cardThree, setCardThree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [codigoDeArea, setCodigoDeArea] = useState("1");
  const [isOpenModal, openModal, closeModal] = useModal(false);
  // const [turnAround, setTurnAround] = useState(0);
  const origenRef = useRef(null);
  const destinoRef = useRef(null);
  const dateRef = useRef(null);
  const passengerRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const couponRef = useRef(null);
  const modalRef = useRef(null);

  const StyledInputRoot = styled("div")`
    font-family: "Montserrat", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const StyledInput = styled("input")`
    font-size: 0.875rem;
    font-family: inherit;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px 12px;
    width: 4rem;
    outline: 0;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;

  const CustomNumberInput = ({ value, onChange, min, max }) => (
    <StyledInputRoot>
      <StyledInput
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </StyledInputRoot>
  );

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setVisibility("none");
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  const changeModal = () => {
    if (modalOpen === true) {
      setVisibility("none");
      setModalOpen(false);
    } else {
      setVisibility("flex");
      setModalOpen(true);
      setShowDefaultText(false); // Cambia el texto cuando se abre el modal
    }
  };

  const handleDoneClick = () => {
    changeModal();
  };

  const handlePassengers = (age, indexad) => {
    const newPassengers = [];
    const card = { age: age, index: indexad };
    newPassengers.push(card);
    passengers.forEach((element) => {
      if (element.index == indexad) {
        return;
      } else {
        newPassengers.push(element);
      }
    });
    setPassengers(newPassengers);
  };

  const handleDeletePassenger = (indexToRemove) => {
    const newPassengers = passengers.filter(
      (_, index) => index !== indexToRemove
    );
    setPassengers(newPassengers);
    setPassengersAmount(newPassengers.length);
  };

  const cotizar = () => {
    if (
      [
        origenSelected,
        destinoSelected,
        fechaIda,
        fechaVuelta,
        phoneNumber,
        email,
      ].includes("")
    ) {
      alert("Introduce los valores requeridos");
      return;
    }

    axios
      .post(
        "https://api.compara-seguro.com/cotizar",
        {
          origen: origenSelected,
          destinos: destinoSelected,
          fechaStart: fechaIda,
          fechaEnd: fechaVuelta,
          correo: email,
          telefono: phoneNumber,
          viajeros: passengers,
          destinos2: destino2Selected,
          origen2: origen2Selected,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            crossorigin: true,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          navigate("/planes", {
            state: { data: response.data, countryCode: countryCode },
          });
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    axios
      .get("https://api.compara-seguro.com/paises")
      .then((res) => {
        const destinox = [];
        const paisex = [];
        const paises = res.data.paises;
        const destinos = res.data.destinos;
        for (var x in paises) {
          paisex.push({
            value: paises[x].id,
            label: paises[x].nombre,
          });
        }
        for (var x in destinos) {
          destinox.push({
            value: destinos[x].id,
            label: destinos[x].nombre,
          });
        }

        setDestino(destinox);
        setOrigen(paisex);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        "https://blog.compara-seguro.com/wp-json/wp/v2/posts/?filter[posts_per_page]=5"
      )
      .then((response) => {
        setEntries(response.data);
      });
  }, []);

  // Estado para manejar el índice actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para rotar hacia la izquierda
  const rotateLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? entries.length - 1 : prevIndex - 1
    );
  };

  // Función para rotar hacia la derecha
  const rotateRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === entries.length - 1 ? 0 : prevIndex + 1
    );
  };

  const inputRef = useRef(null);
  const [countryCode, setCountryCode] = useState("us"); // Colombia como país por defecto

  useEffect(() => {
    // Obtener la ubicación del usuario para determinar el país
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const detectedCountryCode = response.data.country_code.toLowerCase();
        setCountryCode(detectedCountryCode);
      })
      .catch((error) => {
        console.error(
          "No se pudo obtener la ubicación, usando el país por defecto:",
          error
        );
      });

    const iti = intlTelInput(inputRef.current, {
      initialCountry: countryCode,
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Necesario para formateo y validación
    });

    return () => {
      if (iti) {
        iti.destroy();
      }
    };
  }, [countryCode]);

  return (
    <div className="Home">
      <div className="seccion-servicios">
        <Navbar
          section={1}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
        ></Navbar>
        <div className="titulo-servicios">
          <h1>ASISTENCIA MÉDICA</h1>
        </div>
      </div>
      <MediaQuery orientation={"portrait"}>
        <div id="inicio" className="seccion-comparador" onClick={openModal}>
          <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <div className="form-mobile">
              <div className={"origen"} ref={origenRef}>
                <img
                  src={require("./static/icono-mapmarker.png")}
                  draggable={false}
                />

                <Select
                  styles={customStyles}
                  components={customComponents}
                  placeholder="Origen"
                  className="basic-single"
                  classNamePrefix="select"
                  name="origen"
                  options={origen}
                  onChange={(event) => {
                    setOrigenSelected(event.value);
                    setOrigen2Selected(event.label);
                  }}
                />
              </div>

              <div className="destino" ref={destinoRef}>
                <img
                  src={require("./static/icono-mapmarker.png")}
                  draggable={false}
                />

                <Select
                  styles={customStyles}
                  components={customComponents}
                  placeholder="Destino(s)"
                  isMulti
                  name="destino"
                  options={destino}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(event) => {
                    var orix = [];
                    var orix2 = [];
                    for (var x in event) {
                      orix.push(event[x].value);
                      orix2.push(event[x].label);
                    }
                    setDestinoSelected(orix);
                    setDestino2Selected(orix2);
                  }}
                  menuPortalTarget={document.body}
                />
              </div>

              <div className="fechainit-fechaend">
                <img
                  src={require("./static/calendar-icon.png")}
                  draggable={false}
                />

                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <CustomProvider locale={es_ES}>
                    <DateRangePicker
                      locale={{
                        sunday: "Dom",
                        monday: "Lun",
                        tuesday: "Mar",
                        wednesday: "Mié",
                        thursday: "Jue",
                        friday: "Vie",
                        saturday: "Sáb",
                        ok: "Aplicar",
                        today: "Hoy",
                        yesterday: "Ayer",
                        last7Days: "Últimos 7 días",
                        dateLocale: es, // Aplicando el locale de date-fns
                      }}
                      onChange={(event) => {
                        setFechaIda(
                          moment(event[0]).utc().format("YYYY-MM-DD")
                        );
                        setFechaVuelta(
                          moment(event[1]).utc().format("YYYY-MM-DD")
                        );
                      }}
                      style={{ fontWeight: "500", color: "#000" }}
                      caretAs={FaChevronDown}
                      placeholder="¿Cuándo Viajas?"
                      format="dd/MM/yyyy"
                      character=" - "
                      cleanable
                      appearance="subtle"
                      shouldDisableDate={beforeToday()}
                      showHeader={false}
                      showOneCalendar
                      size="lg"
                    />
                  </CustomProvider>
                </Stack>
              </div>

              <div className="passengersAmount Mobile" ref={passengerRef}>
                <img src={require("./static/avatar.png")} draggable={false} />
                <a className="buttonhot" onClick={changeModal}>
                  {modalOpen
                    ? `${passengersAmount} viajeros`
                    : `¿Cuántos viajan? ${passengersAmount}`}
                </a>
              </div>

              <div className="email Mobile" ref={emailRef}>
                <img src={require("./static/Email.png")} draggable={false} />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electronico"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Por favor, ingresa una dirección de correo válida"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  autoComplete="email"
                />
              </div>

              <div className="phoneNumber Mobile">
                <input
                  ref={inputRef}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phoneNumber}
                  onInput={(phone) => {
                    setPhoneNumber(phone.target.value);
                  }}
                  placeholder="Teléfono"
                  style={{ width: "100%" }}
                  autoComplete="tel"
                />
              </div>

              <div className="coupon Mobile" ref={couponRef}>
                <img src={require("./static/cupon.png")} draggable={false} />
                <input type="text" placeholder="# Cupon" />
              </div>
            </div>
            <div className="buttonContainer">
              <a className="clear" onClick={() => {}}>
                Borrar todo
              </a>
              <a className="comparar" onClick={cotizar}>
                Cotizar
              </a>
            </div>
            <div
              style={{ display: visibility }}
              className="modalPassenger mobilex"
            >
              <div className="columna1">
                <span>Numero de viajeros</span>
                <CustomNumberInput
                  value={passengersAmount}
                  onChange={(e) => setPassengersAmount(e.target.value)}
                  min={1}
                  max={14}
                />
              </div>
              <div className="columna2">
                {passengersAmount !== 0 &&
                  Array.from(Array(passengersAmount), (e, index) => {
                    return (
                      <div className="ageCard" key={index}>
                        <span>Edad viajero {index + 1}</span>
                        <input
                          type="number"
                          className="edad-viajero"
                          onChange={(e) => {
                            handlePassengers(e.target.value, index);
                          }}
                          min="1"
                          max="90"
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="columna3">
                <input
                  type="submit"
                  className="listo"
                  value="Listo"
                  onClick={() => {
                    changeModal();
                  }}
                />
              </div>
            </div>
          </Modal>
          <div className="sec1-form">
            <div className="origen" onClick={openModal}>
              <img
                src={require("./static/icono-mapmarker.png")}
                draggable={false}
              />

              <Select
                isDisabled={isDisabled}
                onClick={openModal}
                styles={customStyles}
                components={customComponents}
                placeholder="Origen"
                className="basic-single"
                classNamePrefix="select"
                name="origen"
                options={origen}
                onChange={(event) => {
                  setOrigenSelected(event.value);
                  setOrigen2Selected(event.label);
                }}
              />
            </div>
            <div className="destino">
              <img
                src={require("./static/icono-mapmarker.png")}
                draggable={false}
              />

              <Select
                isDisabled={isDisabled}
                styles={customStyles}
                components={customComponents}
                placeholder="Destino(s)"
                isMulti
                name="destino"
                options={destino}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(event) => {
                  var orix = [];
                  var orix2 = [];
                  for (var x in event) {
                    orix.push(event[x].value);
                    orix2.push(event[x].label);
                  }
                  setDestinoSelected(orix);
                  setDestino2Selected(orix2);
                }}
              />
            </div>
            <div className="fechainit-fechaend">
              <img
                src={require("./static/calendar-icon.png")}
                draggable={false}
              />

              <Stack spacing={10} direction="column" alignItems="flex-start">
                <CustomProvider locale={es_ES}>
                  <DateRangePicker
                    locale={{
                      sunday: "Dom",
                      monday: "Lun",
                      tuesday: "Mar",
                      wednesday: "Mié",
                      thursday: "Jue",
                      friday: "Vie",
                      saturday: "Sáb",
                      ok: "Aplicar",
                      today: "Hoy",
                      yesterday: "Ayer",
                      last7Days: "Últimos 7 días",
                      dateLocale: es, // Aplicando el locale de date-fns
                    }}
                    onChange={(event) => {
                      setFechaIda(moment(event[0]).utc().format("YYYY-MM-DD"));
                      setFechaVuelta(
                        moment(event[1]).utc().format("YYYY-MM-DD")
                      );
                    }}
                    style={{ fontWeight: "500" }}
                    caretAs={FaChevronDown}
                    placeholder="¿Cuándo Viajas?"
                    format="dd/MM/yyyy"
                    character=" - "
                    cleanable
                    appearance="subtle"
                    shouldDisableDate={beforeToday()}
                    showHeader={false}
                  />
                </CustomProvider>
              </Stack>
            </div>
          </div>
          <div className="sec2-form">
            <div className="passengersAmount">
              <img src={require("./static/avatar.png")} draggable={false} />
              <a className="buttonhot" onClick={changeModal}>
                {modalOpen
                  ? `${passengersAmount} viajeros`
                  : `¿Cuántos viajan? ${passengersAmount}`}
              </a>
            </div>

            <div className="email">
              <img src={require("./static/Email.png")} draggable={false} />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electronico"
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Por favor, ingresa una dirección de correo válida"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                autoComplete="email"
              />
            </div>
            <div className="phoneNumber">
              <input
                ref={inputRef}
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                onInput={(phone) => {
                  setPhoneNumber(phone.target.value);
                }}
                placeholder="Teléfono"
                style={{ width: "100%" }}
                autoComplete="tel"
              />
            </div>

            <div className="coupon">
              <img src={require("./static/cupon.png")} draggable={false} />
              <input type="text" placeholder="# Cupon" />
            </div>
          </div>
          <div className="sec3-form">
            <div ref={modalRef} style={{ display: visibility }} className="modalPassenger">
              <div className="columna1">
                <span>Numero de viajeros</span>
                <CustomNumberInput
                  value={passengersAmount}
                  onChange={(e) => setPassengersAmount(e.target.value)}
                  min={1}
                  max={14}
                />
              </div>
              <div className="columna2">
                {passengersAmount !== 0 &&
                  Array.from(Array(passengersAmount), (e, index) => {
                    return (
                      <div className="ageCard" key={index}>
                        <span>Edad viajero {index + 1}</span>
                        <input
                          type="number"
                          className="edad-viajero"
                          onChange={(e) => {
                            handlePassengers(e.target.value, index);
                          }}
                          min="1"
                          max="90"
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="columna3">
                <input
                  type="submit"
                  className="listo"
                  value="Listo"
                  onClick={() => {
                    changeModal();
                  }}
                />
              </div>
            </div>
            <div className="checkbox">
              <p>Al continuar estás aceptando nuestros</p>
              <a href="/terms" className="tyc">
                Términos y Condiciones
              </a>
            </div>
            <input
              type="submit"
              className="submitButton"
              value="Cotizar"
              onClick={cotizar}
            />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="seccion-comparador" id="inicio">
          <div className="sec1-form">
            <div className="origen">
              <img
                src={require("./static/icono-mapmarker.png")}
                draggable={false}
              />

              <Select
                styles={customStyles}
                components={customComponents}
                placeholder="Origen"
                className="basic-single"
                classNamePrefix="select"
                defaultValue={origen[0]}
                name="origen"
                options={origen}
                onChange={(event) => {
                  setOrigenSelected(event.value);
                  setOrigen2Selected(event.label);
                }}
              />
            </div>
            <div className="destino">
              <img
                src={require("./static/icono-mapmarker.png")}
                draggable={false}
              />

              <Select
                styles={customStyles}
                components={customComponents}
                placeholder="Destino(s)"
                defaultValue={[destino[0]]}
                isMulti
                name="destino"
                options={destino}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(event) => {
                  var orix = [];
                  var orix2 = [];
                  for (var x in event) {
                    orix.push(event[x].value);
                    orix2.push(event[x].label);
                  }
                  setDestinoSelected(orix);
                  setDestino2Selected(orix2);
                }}
                menuPortalTarget={document.body}
              />
            </div>
            <div className="fechainit-fechaend">
              <img
                src={require("./static/calendar-icon.png")}
                draggable={false}
              />

              <Stack spacing={10} direction="column" alignItems="flex-start">
                <CustomProvider locale={es_ES}>
                  <DateRangePicker
                    locale={{
                      sunday: "Dom",
                      monday: "Lun",
                      tuesday: "Mar",
                      wednesday: "Mié",
                      thursday: "Jue",
                      friday: "Vie",
                      saturday: "Sáb",
                      ok: "Aplicar",
                      today: "Hoy",
                      yesterday: "Ayer",
                      last7Days: "Últimos 7 días",
                      dateLocale: es, // Aplicando el locale de date-fns
                    }}
                    onChange={(event) => {
                      setFechaIda(moment(event[0]).utc().format("YYYY-MM-DD"));
                      setFechaVuelta(
                        moment(event[1]).utc().format("YYYY-MM-DD")
                      );
                    }}
                    style={{ fontWeight: "500" }}
                    caretAs={FaChevronDown}
                    placeholder="¿Cuándo Viajas?"
                    format="dd/MM/yyyy"
                    character=" - "
                    cleanable
                    appearance="subtle"
                    shouldDisableDate={beforeToday()}
                    showHeader={false}
                  />
                </CustomProvider>
              </Stack>
            </div>
          </div>
          <div className="sec2-form">
            <div className="passengersAmount">
              <img src={require("./static/avatar.png")} draggable={false} />
              <a className="buttonhot" onClick={changeModal}>
                {showDefaultText
                  ? "¿Cuántos viajan?"
                  : `${passengersAmount} viajeros`}
              </a>
            </div>

            <div className="email">
              <img src={require("./static/Email.png")} draggable={false} />
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electronico"
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Por favor, ingresa una dirección de correo válida"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                autoComplete="email"
              />
            </div>
            <div className="phoneNumber">
              <input
                ref={inputRef}
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                onInput={(phone) => {
                  setPhoneNumber(phone.target.value);
                }}
                placeholder="Teléfono"
                style={{ width: "100%" }}
                autoComplete="tel"
              />
            </div>

            <div className="coupon">
              <img src={require("./static/cupon.png")} draggable={false} />
              <input type="text" placeholder="# Cupon" />
            </div>
          </div>
          <div className="sec3-form">
            <div ref={modalRef} style={{ display: visibility }} className="modalPassenger">
              <div className="columna1">
                <span>Numero de viajeros</span>
                <input
                  value={passengersAmount}
                  onChange={(e) => {
                    const newAmount = parseInt(e.target.value);
                    setPassengersAmount(newAmount);
                    const newPassengers = Array.from(
                      { length: newAmount },
                      (_, index) => {
                        return passengers[index] || { age: 1, index };
                      }
                    );
                    setPassengers(newPassengers);
                  }}
                  min={1}
                  max={14}
                  className="cantidad-viajero"
                  type="number"
                />
              </div>
              <div className="columna2">
                {passengersAmount !== 0 &&
                  Array.from(Array(passengersAmount), (e, index) => {
                    return (
                      <div className="ageCard" key={index}>
                        <span>Edad viajero {index + 1}</span>
                        <div className="ageCard-sec1">
                          <input
                            type="number"
                            className="edad-viajero"
                            onChange={(e) => {
                              handlePassengers(e.target.value, index);
                            }}
                            min="1"
                            max="90"
                          />
                          <a
                            className="borrar-viajero"
                            onClick={() => handleDeletePassenger(index)}
                          >
                            <img
                              src={trash}
                              alt="papelera"
                              className="icon-trash"
                            ></img>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="columna3">
                <input
                  type="submit"
                  className="listo"
                  value="Listo"
                  onClick={() => {
                    changeModal();
                  }}
                />
              </div>
            </div>
            <div className="checkbox">
              <p>Al continuar estás aceptando nuestros</p>
              <a href="/terms" className="tyc">
                Términos y Condiciones
              </a>
            </div>
            <input
              type="submit"
              className="submitButton"
              value="Cotizar"
              onClick={cotizar}
            />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="seccion-promociones">
          <div className="titulo-promociones">
            <h1>
              Descubre Nuestra
              <br />
              Promociones
            </h1>
          </div>
          <div className="promociones-slide">
            <MyCarousel />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="seccion-promociones">
          <div className="titulo-promociones">
            <h1>
              Descubre
              <br />
              Nuestra
              <br />
              Promociones
            </h1>
          </div>
          <div className="promociones-slide">
            <MyCarousel />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="seccion-whychooseus">
          <div
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <span className="titleHeadline">¿Por qué elegirnos?</span>
          </div>

          <div className="content-cards" style={{ height: "50%" }}>
            <div className="iosCard">
              <img
                className="iconBlue"
                draggable={false}
                src={require("./static/planet.png")}
              ></img>
              <div>
                <span className="title-card">Cobertura Global</span>
                <p className="contain-card">
                  Comparamos seguros de todo <br />
                  el mundo, asegurándote la <br /> mejor opción, sin importar tu{" "}
                  <br /> destino.
                </p>
              </div>
            </div>

            <div className="iosCard">
              <img
                className="iconBlue"
                draggable={false}
                src={require("./static/pig.png")}
              ></img>
              <div>
                <span className="title-card">Ahorro Inteligente</span>
                <p className="contain-card">
                  Encuentra las mejores tarifas y <br />
                  coberturas en un solo lugar.
                  <br /> ¡Tu bolsillo lo agradecerá!
                  <br />
                  <br />
                </p>
              </div>
            </div>

            <div className="iosCard">
              <img
                className="iconBlue"
                draggable={false}
                src={require("./static/shakeit.png")}
              ></img>
              <div>
                <span className="title-card">Fácil y Rápido</span>
                <p className="contain-card">
                  En Compara Seguro obtienes <br /> cotizaciones en minutos.
                  <br /> ¡Menos estrés, más
                  <br /> vacaciones!
                </p>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="seccion-whychooseus">
          <div
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <span className="titleHeadline">¿Por qué elegirnos?</span>
          </div>

          <div className="content-cards" style={{ height: "50%" }}>
            <div className="iosCard">
              <img
                className="iconBlue"
                draggable={false}
                src={require("./static/planet.png")}
              ></img>
              <div>
                <span className="title-card">Cobertura Global</span>
                <p className="contain-card">
                  Comparamos seguros de todo <br />
                  el mundo, asegurándote la <br /> mejor opción, sin importar tu{" "}
                  <br /> destino.
                </p>
              </div>
            </div>

            <div className="iosCard">
              <img
                className="iconBlue"
                draggable={false}
                src={require("./static/pig.png")}
              ></img>
              <div>
                <span className="title-card">Ahorro Inteligente</span>
                <p className="contain-card">
                  Encuentra las mejores tarifas y <br />
                  coberturas en un solo lugar.
                  <br /> ¡Tu bolsillo lo agradecerá!
                  <br />
                  <br />
                </p>
              </div>
            </div>

            <div className="iosCard">
              <img
                className="iconBlue"
                draggable={false}
                src={require("./static/shakeit.png")}
              ></img>
              <div>
                <span className="title-card">Fácil y Rápido</span>
                <p className="contain-card">
                  En Compara Seguro obtienes <br /> cotizaciones en minutos.
                  <br /> ¡Menos estrés, más
                  <br /> vacaciones!
                </p>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="seccion-nuestros-seguros">
          <div className="titulo-nuestros-seguros">
            <h1>
              Nuestros
              <br />
              seguros
              <br />
              tienen las
              <br />
              coberturas
              <br />
              que necesitas
            </h1>
          </div>
          <div className="nuestros-seguros-acordeones">
            <div className="accor-1">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-07.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Asistencia médica internacional
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-08.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Medicamentos
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-09.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Cancelación de Vuelos
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-10.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Asistencia Médica con Preexistencias
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-11.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Odontología
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-12.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Pérdida de Equipaje
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="seccion-nuestros-seguros">
          <div className="titulo-nuestros-seguros">
            <h1>
              Nuestros seguros
              <br />
              tienen las
              <br />
              coberturas que
              <br />
              necesitas
            </h1>
          </div>
          <div className="nuestros-seguros-acordeones">
            <div className="accor-1">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-07.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Asistencia médica internacional
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="accor-2">
              <Accordion>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-08.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Medicamentos
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="accor-3">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-09.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Cancelación de Vuelos
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="accor-4">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-10.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Asistencia Médica con Preexistencias
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="accor-5">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-11.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Odontología
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="accor-6">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img
                      draggable={false}
                      src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-12.png")}
                      alt="Asistencia médica"
                      className="accor-img"
                    />
                    Pérdida de Equipaje
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="seccion-opinion-clientes"></div>
        <div className="opinion-clientes">
          <div className="titulo-opiniones-clientes">
            <h1>
              Lo que nuestros
              <br />
              clientes dicen sobre
              <br />
              nosotros
            </h1>
          </div>
          <div className="click-opinion">
            <div className="opinion-1">
              <img
                draggable={false}
                src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-20.png")}
                alt="opiniones"
                className="opiniones-img"
              />
              <h1>Ana Loaiza</h1>
              <div className="opnion-textos">
                <p>
                  Excelente servicio, <br />
                  siempre están
                  <br />
                  disponibles y me
                  <br />
                  ayudaron
                  <br />
                  rápidamente en una
                  <br />
                  emergencia. Muy recomendable.
                </p>
              </div>
              <div className="calificacion-opiniones">
                <img
                  draggable={false}
                  src={require("./static/stars.png")}
                  alt="calificación"
                  className="calificacion-img"
                />
              </div>
            </div>
            <div className="opinion-2">
              <img
                draggable={false}
                src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-22.png")}
                alt="opiniones"
                className="opiniones-img"
              />
              <h1>Carlos Pelaez</h1>
              <div className="opnion-textos">
                <p>El plan es muy completo y el</p>
                <p>personal es muy profesional. No</p>
                <p>he tenido problemas con las</p>
                <p>autorizaciones ni reembolsos</p>
              </div>
              <div className="calificacion-opiniones">
                <img
                  draggable={false}
                  src={require("./static/stars.png")}
                  alt="calificación"
                  className="calificacion-img"
                />
              </div>
            </div>
            <div className="opinion-3">
              <img
                draggable={false}
                src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-21.png")}
                alt="opiniones"
                className="opiniones-img"
              />
              <h1>Juliana Mesa</h1>
              <div className="opnion-textos">
                <p>Muy satisfecha con la cobertura y</p>
                <p>la atención al cliente. Resolvieron</p>
                <p>todas mis dudas y el proceso de</p>
                <p>inscripción fue sencillo.</p>
              </div>
              <div className="calificacion-opiniones">
                <img
                  draggable={false}
                  src={require("./static/stars.png")}
                  alt="calificación"
                  className="calificacion-img"
                />
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="seccion-opinion-clientes"></div>
        <div className="opinion-clientes">
          <div className="titulo-opiniones-clientes">
            <h1>Lo que nuestros clientes dicen sobre nosotros</h1>
          </div>
          <div className="click-opinion">
            <div className="opinion-1">
              <img
                draggable={false}
                src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-20.png")}
                alt="opiniones"
                className="opiniones-img"
              />
              <h1>Ana Loaiza</h1>
              <div className="opnion-textos">
                <p>
                  Excelente servicio, <br />
                  siempre están
                  <br />
                  disponibles y me
                  <br />
                  ayudaron
                  <br />
                  rápidamente en una
                  <br />
                  emergencia. Muy recomendable.
                </p>
              </div>
              <div className="calificacion-opiniones">
                <img
                  draggable={false}
                  src={require("./static/stars.png")}
                  alt="calificación"
                  className="calificacion-img"
                />
              </div>
            </div>
            <div className="opinion-2">
              <img
                draggable={false}
                src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-22.png")}
                alt="opiniones"
                className="opiniones-img"
              />
              <h1>Carlos Pelaez</h1>
              <div className="opnion-textos">
                <p>El plan es muy completo y el</p>
                <p>personal es muy profesional. No</p>
                <p>he tenido problemas con las</p>
                <p>autorizaciones ni reembolsos</p>
              </div>
              <div className="calificacion-opiniones">
                <img
                  draggable={false}
                  src={require("./static/stars.png")}
                  alt="calificación"
                  className="calificacion-img"
                />
              </div>
            </div>
            <div className="opinion-3">
              <img
                draggable={false}
                src={require("./static/piezas/PIEZAS GRAFICAS WEB - COMPARASEGURO-21.png")}
                alt="opiniones"
                className="opiniones-img"
              />
              <h1>Juliana Mesa</h1>
              <div className="opnion-textos">
                <p>Muy satisfecha con la cobertura y</p>
                <p>la atención al cliente. Resolvieron</p>
                <p>todas mis dudas y el proceso de</p>
                <p>inscripción fue sencillo.</p>
              </div>
              <div className="calificacion-opiniones">
                <img
                  draggable={false}
                  src={require("./static/stars.png")}
                  alt="calificación"
                  className="calificacion-img"
                />
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="seccion-blog">
          <div className="sec1-blog">
            <div className="text-btn-blog">
              <div className="textos-blog">
                <h1>
                  Consejos
                  <br />
                  únicos te
                  <br />
                  esperan en
                  <br />
                  nuestro blog
                </h1>
              </div>
              <div className="botones-blog">
                <a
                  href="https://blog.compara-seguro.com"
                  className="ver-mas-art"
                  target="_blank"
                >
                  Ver más artículos
                </a>
                <a className="iconArrow" onClick={rotateLeft}>
                  <img
                    draggable={false}
                    src={require("./static/leftArrow.png")}
                  />
                </a>
                <a className="iconArrow" onClick={rotateRight}>
                  <img
                    draggable={false}
                    src={require("./static/rightArrow.png")}
                  />
                </a>
              </div>
            </div>
            {entries.length > 0 && (
              <div className="slider-blog">
                <div className="card-blog">
                  <div
                    alt="slider-img-blog"
                    className="slider-blog-img"
                    style={{
                      backgroundImage:
                        "url(" +
                        entries[currentIndex].better_featured_image
                          .media_details.sizes.thumbnail.source_url +
                        ")",
                    }}
                  >
                    <a href={entries[currentIndex].link} target="_blank">
                      {entries[currentIndex].title.rendered}
                    </a>
                    <p>{entries[currentIndex].date}</p>
                  </div>
                </div>

                <div className="card-blog1">
                  <div
                    alt="slider-img-blog"
                    className="slider-blog-img1"
                    style={{
                      backgroundImage:
                        "url(" +
                        entries[(currentIndex + 1) % entries.length]
                          .better_featured_image.media_details.sizes.thumbnail
                          .source_url +
                        ")",
                    }}
                  >
                    <a
                      href={entries[(currentIndex + 1) % entries.length].link}
                      target="_blank"
                    >
                      {
                        entries[(currentIndex + 1) % entries.length].title
                          .rendered
                      }
                    </a>
                    <p>{entries[(currentIndex + 1) % entries.length].date}</p>
                  </div>
                </div>

                <div className="card-blog">
                  <div
                    alt="slider-img-blog"
                    className="slider-blog-img"
                    style={{
                      backgroundImage:
                        "url(" +
                        entries[(currentIndex + 2) % entries.length]
                          .better_featured_image.media_details.sizes.thumbnail
                          .source_url +
                        ")",
                    }}
                  >
                    <a
                      href={entries[(currentIndex + 2) % entries.length].link}
                      target="_blank"
                    >
                      {
                        entries[(currentIndex + 2) % entries.length].title
                          .rendered
                      }
                    </a>
                    <p>{entries[(currentIndex + 2) % entries.length].date}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="curva-blog"></div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="seccion-blog">
          <div className="text-btn-blog">
            <div className="textos-blog">
              <h1>
                Consejos únicos te
                <br />
                esperan en nuestro
                <br />
                blog
              </h1>
            </div>
            <div className="botones-blog">
              <a
                href="https://blog.compara-seguro.com"
                className="ver-mas-art"
                target="_blank"
              >
                Ver más artículos
              </a>
              <div className="botones-slider">
                <a className="iconArrow" onClick={rotateLeft}>
                  <img
                    draggable={false}
                    src={require("./static/leftArrow.png")}
                  />
                </a>
                <a className="iconArrow" onClick={rotateRight}>
                  <img
                    draggable={false}
                    src={require("./static/rightArrow.png")}
                  />
                </a>
              </div>
            </div>
          </div>
          {entries.length > 0 && (
            <div className="slider-blog">
              <div className="card-blog">
                <div
                  alt="slider-img-blog"
                  className="slider-blog-img"
                  style={{
                    backgroundImage:
                      "url(" +
                      entries[currentIndex].better_featured_image.media_details
                        .sizes.thumbnail.source_url +
                      ")",
                  }}
                >
                  <a href={entries[currentIndex].link} target="_blank">
                    {entries[currentIndex].title.rendered}
                  </a>
                  <p>{entries[currentIndex].date}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </MediaQuery>
      <MediaQuery orientation={"landscape"}>
        <div className="sponsors">
          <span className="titleHeadline" style={{ textAlign: "center" }}>
            Las mejores asistencias son nuestros
            <br />
            aliados
          </span>
          <SliderSponsors />
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="sponsors">
          <span className="titleHeadline" style={{ textAlign: "center" }}>
            Las mejores
            <br />
            asistencias son
            <br />
            nuestros aliados
          </span>
          <SliderSponsors />
        </div>
      </MediaQuery>

      <MediaQuery orientation={"landscape"}>
        <div className="seccion-preguntas-frecuentes">
          <div className="titulo-preguntas-frecuentes">
            <h1>
              Preguntas
              <br />
              Frecuentes
            </h1>
          </div>
          <div className="preguntas-acordeones">
            <div className="accord-1">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>¿Esta es la pregunta 1?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Esta es la pregunta 2?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Esta es la pregunta 3?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>¿Esta es la pregunta 4?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>¿Esta es la pregunta 5?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>¿Esta es la pregunta 6?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery orientation={"portrait"}>
        <div className="seccion-preguntas-frecuentes">
          <div className="titulo-preguntas-frecuentes">
            <h1>Preguntas Frecuentes</h1>
          </div>
          <div className="preguntas-acordeones">
            <div className="accord-1">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>¿Esta es la pregunta 1?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Esta es la pregunta 2?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Esta es la pregunta 3?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>¿Esta es la pregunta 4?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>¿Esta es la pregunta 5?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>¿Esta es la pregunta 6?</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </MediaQuery>
      <Footer2 />
    </div>
  );
}

export default Home;
