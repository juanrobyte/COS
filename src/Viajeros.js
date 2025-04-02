import MediaQuery from "react-responsive";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./styles/Viajeros.css";
import { FaChevronLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import useModal from "./hooks/useModal";
import {
  DatePicker,
  Footer,
  Stack,
  Button,
  ButtonToolbar,
  CustomProvider,
} from "rsuite";
import es_ES from "rsuite/locales/es_ES";
import { es } from "date-fns/locale";
import moment from "moment";
import { FaChevronDown } from "react-icons/fa";
import isBefore from "date-fns/isBefore";
import alert from "./static/alert-red.svg";

const Viajeros = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [geol, setGeol] = useState("");
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [formValues, setFormValues] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [nombreEmergencia, setNombreEmergencia] = useState("");
  const [apellidoEmergencia, setApellidoEmergencia] = useState("");
  const [correoEmergencia, setCorreoEmergencia] = useState("");
  const [telefonoEmergencia, setTelefonoEmergencia] = useState("");

  const [nombreError, setNombreError] = useState(false);
  const [apellidoError, setApellidoError] = useState(false);
  const [tipoDocumentoError, setTipoDocumentoError] = useState(false);
  const [numeroDocumentoError, setNumeroDocumentoError] = useState(false);
  const [fechaNacimientoError, setFechaNacimientoError] = useState(false);
  const [nombreEmergenciaError, setNombreEmergenciaError] = useState(false);
  const [apellidoEmergenciaError, setApellidoEmergenciaError] = useState(false);
  const [correoEmergenciaError, setCorreoEmergenciaError] = useState(false);
  const [telefonoEmergenciaError, setTelefonoEmergenciaError] = useState(false);

  const validateNombre = () => setNombreError(nombre.trim() === "");
  const validateApellido = () => setApellidoError(apellido.trim() === "");
  const validateTipoDocumento = () =>
    setTipoDocumentoError(tipoDocumento === "");
  const validateNumeroDocumento = () =>
    setNumeroDocumentoError(numeroDocumento.trim() === "");
  const validateFechaNacimiento = () =>
    setFechaNacimientoError(fechaNacimiento === "");
  const validateNombreEmergencia = () =>
    setNombreEmergenciaError(nombreEmergencia.trim() === "");
  const validateApellidoEmergencia = () =>
    setApellidoEmergenciaError(apellidoEmergencia.trim() === "");
  const validateCorreoEmergencia = () =>
    setCorreoEmergenciaError(correoEmergencia.trim() === "");
  const validateTelefonoEmergencia = () =>
    setTelefonoEmergenciaError(telefonoEmergencia.trim() === "");
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    validateTipoDocumento();
  };
  let location = useLocation();
  const data = location.state;
  console.log(data);
  const handleGoBack = (event) => {
    event.preventDefault();
    window.history.back();
  };
  const handleInputChange = (index, field, value) => {
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        ...updatedValues[index],
        [field]: value,
      };
      return updatedValues;
    });
  };

  const validateFormComplete = () => {
    const allFieldsFilled =
      nombre && apellido && tipoDocumento && numeroDocumento && fechaNacimiento;
    setIsFormComplete(allFieldsFilled);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    validateNombre();
    validateApellido();
    validateTipoDocumento();
    validateNumeroDocumento();
    validateFechaNacimiento();

    validateNombreEmergencia();
    validateApellidoEmergencia();
    validateCorreoEmergencia();
    validateTelefonoEmergencia();

    if (
      !nombreError &&
      !apellidoError &&
      !tipoDocumentoError &&
      !numeroDocumentoError &&
      !fechaNacimientoError &&
      !nombreEmergenciaError &&
      !apellidoEmergenciaError &&
      !correoEmergenciaError &&
      !telefonoEmergenciaError
    ) {
      // Lógica para enviar los datos cuando el formulario esté completo y sin errores
      console.log("Formulario completo y válido.");
    }
  };

  useEffect(() => {
    validateFormComplete();
  }, [nombre, apellido, tipoDocumento, numeroDocumento, fechaNacimiento]);

  useEffect(() => {
    axios.get("https://api.country.is/").then((response) => {
      setGeol(response.data.country);
    });
  }, []);
  const handlePayment = () => {
    var seconds = new Date().getTime() / 1000;

    console.log("reading....");
    axios
      .post(
        "https://api.compara-seguro.com/generatePayment",
        {
          order_id: Math.floor(seconds),
          amount: data.planInfo.tarifa.tarifaventa,
          country: data.countryCode.toUpperCase(),
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
        if (response) {
          // navigate("/", { state: { data: response.data } });
          console.log(response.data);
          window.location.replace(response.data.redirect_url);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Viajeros" id="Viajeros-seccion">
      <Navbar
        section={4}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      ></Navbar>
      <MediaQuery orientation={"landscape"}>
      <div className="volver-btn">
        <a href="#" onClick={handleGoBack}>
          <FaChevronLeft style={{ color: "#009c8c" }} size={25} />
        </a>
      </div>
      </MediaQuery>
      <div className="datos-viajero-section">
        <div className="viajeros-left-section">
          <div className="titulo-datos">
            <p>Complete los datos</p>
          </div>

          {data.viajeros.toReversed().map((viajero, index) => {
            return (
              <div className="card-datos-viajero">
                <div className="titulo-card-viajero">
                  <p>
                    Viajero {viajero.index + 1} de {viajero.age} años
                  </p>
                </div>
                <div className="form-card-datos">
                  <div className="form-datos-sec1">
                    <div className="input-container-datos">
                      <input
                        type="text"
                        id="nombre-pasajero"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        onBlur={validateNombre}
                        autoComplete="given-name"
                        className={nombreError ? "error-input" : ""}
                        required
                      />
                      <label htmlFor="nombre-pasajero">Nombre</label>
                      {nombreError && (
                        <p className="error-message">
                          El nombre es obligatorio
                        </p>
                      )}
                    </div>
                    <div
                      className={`select-container-datos ${
                        isFocused || selectedValue ? "focused" : ""
                      }`}
                    >
                      <label
                        className="floating-label"
                        htmlFor="tipoDeDocumento"
                      >
                        Tipo de Documento
                      </label>
                      <select
                        id="tipoDeDocumento"
                        value={tipoDocumento}
                        onChange={(e) => {
                          setTipoDocumento(e.target.value);
                          setSelectedValue(e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={tipoDocumentoError ? "error-input" : ""}
                      >
                        <option value="" disabled></option>
                        <option value="pasaporte">Pasaporte</option>
                        <option value="documentoIdentidad">
                          Documento de Identidad
                        </option>
                      </select>
                      {tipoDocumentoError && (
                        <p className="error-message">
                          Seleccione un tipo de documento
                        </p>
                      )}
                    </div>
                    <div className="input-container-datos">
                      <Stack
                        spacing={10}
                        direction="column"
                        alignItems="flex-start"
                      >
                        <CustomProvider locale={es_ES}>
                          <DatePicker
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
                              dateLocale: es,
                            }}
                            onChange={(event) =>
                              setFechaNacimiento(
                                moment(event).utc().format("YYYY-MM-DD")
                              )
                            }
                            style={{ fontWeight: "500", color: "#000" }}
                            caretAs={FaChevronDown}
                            placeholder="Fecha de Nacimiento"
                            format="dd/MM/yyyy"
                            cleanable
                            appearance="subtle"
                            showHeader={false}
                            size="lg"
                            id="fecha-nacimiento-pasajero"
                            name="fecha-nacimiento-pasajero"
                          />
                        </CustomProvider>
                      </Stack>
                      {/* <label
                        className="fecha-nacimiento"
                        htmlFor="fecha-nacimiento-pasajero"
                      >
                        Fecha de Nacimiento
                      </label> */}
                    </div>
                  </div>
                  <div className="form-datos-sec2">
                    <div className="input-container-datos">
                      <input
                        type="text"
                        id="apellido-pasajero"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        onBlur={validateApellido}
                        autoComplete="family-name"
                        className={apellidoError ? "error-input" : ""}
                        required
                      />
                      <label htmlFor="apellido-pasajero">Apellido</label>
                      {apellidoError && (
                        <p className="error-message">
                          El apellido es obligatorio
                        </p>
                      )}
                    </div>
                    <div className="input-container-datos">
                      <input
                        type="number"
                        id="numero-documento-pasajero"
                        value={numeroDocumento}
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                        onBlur={validateNumeroDocumento}
                        className={numeroDocumentoError ? "error-input" : ""}
                        required
                      />
                      <label
                        className="documento"
                        htmlFor="numero-documento-pasajero"
                      >
                        Número de Documento
                      </label>
                      {numeroDocumentoError && (
                        <p className="error-message">
                          El número de documento es obligatorio
                        </p>
                      )}
                    </div>
                    <div className="titular-viajero">
                      <label className="custom-checkbox-titular">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        <span className="checkbox-label">
                          Es el titular de la compra
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="card-contacto-emergencia">
            <div className="titulo-card-viajero">
              <p>Contacto de emergencia</p>
            </div>
            <div className="form-card-datos">
              <div className="form-datos-sec1">
                <div className="input-container-datos">
                  <input
                    type="text"
                    id="nombre-emergencia"
                    value={nombreEmergencia}
                    onChange={(e) => setNombreEmergencia(e.target.value)}
                    onBlur={validateNombreEmergencia}
                    className={nombreEmergenciaError ? "error-input" : ""}
                    required
                    autoComplete="given-name"
                  />
                  <label htmlFor="nombre-emergencia">Nombre</label>
                  {nombreEmergenciaError && (
                    <p className="error-message">El nombre es obligatorio</p>
                  )}
                </div>
                <div className="input-container-datos">
                  <input
                    type="email"
                    id="correo-electronico"
                    value={correoEmergencia}
                    onChange={(e) => setCorreoEmergencia(e.target.value)}
                    onBlur={validateCorreoEmergencia}
                    className={correoEmergenciaError ? "error-input" : ""}
                    required
                    autoComplete="email"
                  />
                  <label
                    className="correo-electronico"
                    htmlFor="correo-electronico"
                  >
                    Correo electrónico
                  </label>
                  {correoEmergenciaError && (
                    <p className="error-message">El correo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="form-datos-sec2">
                <div className="input-container-datos">
                  <input
                    type="text"
                    id="apellido-emergencia"
                    value={apellidoEmergencia}
                    onChange={(e) => setApellidoEmergencia(e.target.value)}
                    onBlur={validateApellidoEmergencia}
                    className={apellidoEmergenciaError ? "error-input" : ""}
                    required
                    autoComplete="family-name"
                  />
                  <label htmlFor="apellido-pasajero">Apellido</label>
                  {apellidoEmergenciaError && (
                    <p className="error-message">El apellido es obligatorio</p>
                  )}
                </div>
                <div className="input-container-datos">
                  <input
                    type="tel"
                    id="telefono-emergencia"
                    value={telefonoEmergencia}
                    onChange={(e) => setTelefonoEmergencia(e.target.value)}
                    onBlur={validateTelefonoEmergencia}
                    className={telefonoEmergenciaError ? "error-input" : ""}
                    required
                    autoComplete="tel"
                  />
                  <label className="telefono" htmlFor="numero-telefono">
                    Teléfono
                  </label>
                  {telefonoEmergenciaError && (
                    <p className="error-message">El telefono es obligatorio</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="viajeros-rigth-section">
          <div className="titulo-resumen-compra">
            <p>Resumen de su compra</p>
          </div>
          <div className="card-resumen">
            <div className="plan-contratado">
              <img
                draggable={false}
                src={require("./static/CS color.png")}
                className="img-card-plan-contratado"
              />
              <h1>{data.planInfo.plan.nombre}</h1>
            </div>
            <div className="detalles-plan-contratado">
              <h1>Detalle del servicio</h1>
              <div className="daysDiff">
                <img
                  src={require("./static/calendar-icon.png")}
                  draggable={false}
                  className="calendar-daysDiff"
                />
                <p>
                  {data.fullData !== null && data.fullData.fechaStart} →
                  {data.fullData !== null && data.fullData.fechaEnd}
                </p>
                <p>{data.fullData !== null && data.fullData.daysDiff} días</p>
              </div>
              <div className="destino-plan-contratado">
                <img
                  src={require("./static/icono-mapmarker.png")}
                  draggable={false}
                  className="mapmarker-destino-contratado"
                />
                <p>{data.fullData.destinos2}</p>
              </div>
              <div className="viajeros-plan-contratado">
                <img
                  src={require("./static/avatar.png")}
                  draggable={false}
                  className="avatar-viajeros-contratado"
                />
                <p>{data.viajeros.length} Personas</p>
              </div>
            </div>
            <div className="precio-total">
              <p>TOTAL</p>
              <p>USD {data.planInfo.tarifa.tarifaventa} </p>
            </div>
            <div className="button-continuar">
              <button
                onClick={isFormComplete ? openModal : null}
                className={isFormComplete ? "active" : "disabled"}
                style={{ pointerEvents: isFormComplete ? "auto" : "none" }}
                disabled={!isFormComplete}
              >
                Continuar
              </button>
              <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <div className="redirection-alert">
                  <h1>·ATENCION·</h1>
                  <img src={alert} alt="alerta" className="alert-modal" />
                  <p>
                    VAS A SER REDIRIGIDO AL APARTADO DE PAGO <br />
                    POR FAVOR COMPLETA EL PAGO Y NO CIERRES LA
                    <br />
                    PESTAÑA VOLVERAS A NUESTRA PAGINA AL COMPLETAR EL PAGO.
                  </p>
                  <div className="button-continuar">
                    <button
                      onClick={() => {
                        handlePayment();
                      }}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <MediaQuery orientation={"portrait"}>
        <div className="resumen-compra-box">
          <div className="plan-contratado">
            <img
              draggable={false}
              src={require("./static/CS color.png")}
              className="img-card-plan-contratado"
            />
            <h1>{data.planInfo.plan.nombre}</h1>
          </div>
          <div className="precio-total">
            <p>TOTAL</p>
            <p>USD {data.planInfo.tarifa.tarifaventa} </p>
          </div>
          <div className="ver-mas-detalles-compra">

          </div>
        </div>
        <div className="volver-btn">
        <a href="#" onClick={handleGoBack}>
          <FaChevronLeft style={{ color: "#009c8c" }} size={25} />
        </a>
      </div>
      <div className="datos-viajero-section-mobile">
        
      </div>
      </MediaQuery>
    </div>
  );
};

export default Viajeros;
