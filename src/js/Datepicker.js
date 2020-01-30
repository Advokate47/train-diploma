import { InlineDatePicker,  MuiPickersUtilsProvider } from "material-ui-pickers";
import React, { useState } from "react";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const materialTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  
  overrides: {
    MuiPickersCalendarHeader: {
      daysHeader: {
        display: 'none'
      },
    },
    MuiPickersDay: {
      day: {
        fontFamily: 'Roboto',
      },
      isSelected: {
        backgroundColor: 'rgba(255, 168, 0, 0.31)',
        border: '2px solid #FFA800',
        borderRadius: '5px',
        color: 'black',
        '&:hover': {backgroundColor: 'rgba(255, 168, 0, 0.31)'}
      },
    
      current: {
        color: 'orange',
        background: 'inherit',
        border: 'none'
      },
    },
    MuiIconButton: {
      label: {
        color: 'inherit'
      },
      root: {
        padding: 0,
      }
    },
   MuiFormControl: {
     root: {
      width: '100%',
      display: 'block'
     }
    }, 
    MuiInputBase: {
      root: {
        background: '#fff',
        'borderRadius': '3px',
        width: '100%',
        boxSizing: 'border-box',
        height: '50px'
      },
      /* меняем стили инпута */
      input: {
        fontSize: '16px',
        fontWeight: '100',
        padding: '0 0 0 10px',
        width: '100%',
        border: 0,
        outline: 'none',
        borderRadius: '3px',
    
          '&$focused': {
            "border": "none"
          }
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '3px',
        lineHeight: '1em'
      },
      input: {
        padding: '15.5px'
      },
  
       notchedOutline: {
        border: 'none',
        outline: 'none'
      },
      adornedEnd: {
        paddingRight: '5px',
      }
    },
    MuiSvgIcon: {
      root: {
        fill: '#c4c4c4',
        width: '36px',
        height: '36px'
      }
    },
    MuiIconButton: {
      root: {
        padding: '6px',
        '&:hover': {
          backgroundColor:  'rgba(0, 0, 0, 0.05)'
        }
      }
    } 
  },
});


const Datepicker = (props) => {
  const [selectedDate, handleDateChange] = useState(props.defaultDate);
  const {disablePast, disableFuture, adornment, onDateSelect} = props;

  const handleSelect = date => {
    handleDateChange(date);
    onDateSelect(date)
  }
  return (
    <MuiThemeProvider theme={materialTheme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <div className="picker" style={props.style}>
        <InlineDatePicker
          keyboard
          clearable
          onlyCalendar
          disableOpenOnEnter
          disablePast={disablePast}
          disableFuture={disableFuture}
          placeholder="ДД/ММ/ГГГГ"
          invalidDateMessage="Неверный формат"
          minDateMessage={props.minDateMessage || "Выберете не прошедшую дату"}
          maxDateMessage="Введите корректную дату рождения"
          variant="outlined"
          InputAdornmentProps={adornment}
          value={selectedDate}
          onChange={handleSelect}
          format="dd/MM/yyyy"
          mask={value => value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []}
        />
      </div>
      </MuiPickersUtilsProvider>
      </MuiThemeProvider>
  );
}

export { Datepicker };
