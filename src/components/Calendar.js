import React, { useState } from 'react';
import { LocalizationProvider, DesktopDateRangePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import '../styles/Calendar.css';

const CustomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '20px',
  padding: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '& .MuiCalendarPicker-root': {
    width: '100%',
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '50px',
    padding: '0 15px',
  },
});

const CustomCalendar = () => {
  const [value, setValue] = useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <CustomBox>
        <DesktopDateRangePicker
          startText="Fecha de inicio"
          endText="Fecha de fin"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <CustomTextField {...startProps} />
              <Box sx={{ mx: 2 }}> a </Box>
              <CustomTextField {...endProps} />
            </>
          )}
          calendars={2} // Mostrar dos meses
        />
        <div className="button-wrapper">
          <button className="apply-button">Aplicar</button>
          <button className="clear-button" onClick={() => setValue([null, null])}>Borrar</button>
        </div>
      </CustomBox>
    </LocalizationProvider>
  );
};

export default CustomCalendar;
