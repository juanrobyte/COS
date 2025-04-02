import React, { useEffect, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import axios from 'axios';

const PhoneInput = () => {
  const inputRef = useRef(null);
  const [countryCode, setCountryCode] = useState('us'); // Colombia como país por defecto

  useEffect(() => {
    // Obtener la ubicación del usuario para determinar el país
    axios.get('https://ipapi.co/json/')
      .then((response) => {
        const detectedCountryCode = response.data.country_code.toLowerCase();
        setCountryCode(detectedCountryCode);
      })
      .catch((error) => {
        console.error("No se pudo obtener la ubicación, usando el país por defecto:", error);
      });

    const iti = intlTelInput(inputRef.current, {
      initialCountry: countryCode,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Necesario para formateo y validación
    });

    return () => {
      if (iti) {
        iti.destroy();
      }
    };
  }, [countryCode]);

  return (
    <input ref={inputRef} type="tel" id="phone" name="phone" />
  );
};

export default PhoneInput;
