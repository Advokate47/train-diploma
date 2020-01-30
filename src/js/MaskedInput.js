import React from 'react'
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';

import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const materialTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  
  overrides: {
    MuiFormControl: {
      root: {
       width: '100%',
       display: 'block'
      }
     }, 
     MuiInput: {
      underline: {
        borderRadius: '3px',
        '&:after': {
          display: 'none'
        },
        '&:before': {
          display: 'none'
        },
        '&:hover': {
          borderBottom: 'none !important'
        }
    
      }
     },
    MuiInputBase: {
      root: {
        background: '#fff',
        'borderRadius': '3px',
        boxSizing: 'border-box',
      },
      /* меняем стили инпута */
      input: {
        boxSizing: 'border-box',
        fontSize: '18px',
        fontWeight: '100',
        padding: '3px 0 3px 10px',
        height: '30px',
        width: '100%',
        border: '1px solid #928F94',
        outline: 'none',
        borderRadius: '3px',
          '&$focused': {
            "border": "none"
          }
      }
    },
    MuiOutlinedInput: {
      root: {
        'borderRadius': '3px'
      },
       notchedOutline: {
        border: 'none',
        outline: 'none'
      }
    } 
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={props.mask}
      prefix={props.prefix}
      placeholderChar={'_'}
      showMask
    />
  );
}

export default function FormattedInput(props) {

  const [values, setValues] = React.useState({
    textmask: '    '
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
    props.onChange(event.target.value)
  };

  return (
    <MuiThemeProvider theme={materialTheme}>
      <FormControl>
        <Input
          value={values.textmask}
          onChange={handleChange('textmask')}
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
          inputProps={{
            mask: props.inputmask
          }}
        />
      </FormControl>
      </MuiThemeProvider>
  );
}