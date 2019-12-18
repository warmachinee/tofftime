import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import MaskedInput from 'react-text-mask';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  margin: {
    width: '100%',
    margin: 4,
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1),
    },
  },
  space: {
    width: 8,
    [theme.breakpoints.up(500)]: {
      width: theme.spacing(2),
    },
  },
  divider: {
    margin: "24px 0",
  },
  button: {
    width: '100%',
    padding: 8,
    margin: theme.spacing(1),
    [theme.breakpoints.up(500)]: {
      padding: 16,
    },
  },
  textButton: {
    color: primary[900]
  },
  loginWith: {
    position: 'absolute',
    left: 16
  },

}));

const SignUpButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

const datePickers = createMuiTheme({
  palette: {
    primary: primary,
  },
  overrides: {
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: 'calc(100% - 24px)'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        display: window.innerHeight >= 520? 'flex' : 'none',
      }
    },
    MuiPickersModal: {
      dialog: {
        overflow: 'auto'
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
      mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ',/\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

export default function SignUpComponent(props){
  const classes = useStyles();
  const { handleSignUp, actionStatus } = props
  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')
  const [ phoneNumber, setPhoneNumber ] = React.useState('');
  const [ firstname, setFullName ] = React.useState('')
  const [ lastname, setLastName ] = React.useState('')
  const [ gender, setGender ] = React.useState('male')
  const [ selectedDate, setSelectedDate ] = React.useState(null);

  const [ phoneWidth, setPhoneWidth ] = React.useState(0);
  const [ genderWidth, setGenderWidth ] = React.useState(0);

  const phoneRef = React.useRef(null);
  const genderRef = React.useRef(null);

  function handlePhoneNumber(num){
    setPhoneNumber( num.substring(1,4) + num.substring(6,9) + num.substring(12,16) )
  }

  function handleDateChange(d){
    setSelectedDate(d)
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      if(
        username !== '' &&
        password !== '' &&
        firstname !== '' &&
        lastname !== '' &&
        isPhoneNumberComplete() &&
        selectedDate !== null
      ){
        handleSignUp({
          username: username,
          password: password,
          tel: phoneNumber,
          fullname: firstname,
          lastname: lastname,
          gender: gender,
          birthdate: API._dateSendToAPI(selectedDate)
        })
      }
    }
  }

  function isPhoneNumberComplete(){
    if(phoneNumber.length === 10){
      for(var i = 0;i < 10;i++){
        if(phoneNumber.substring(i, i + 1) === " "){
          return false
        }
      }
      return true
    }else{
      return false
    }
  }

  React.useEffect(()=>{
    setPhoneWidth(phoneRef.current.offsetWidth);
    setGenderWidth(genderRef.current.offsetWidth);
  },[ ])

  return(
    <div>
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus={API._isDesktopBrowser()}
          error={actionStatus === 'email is used' || actionStatus === 'invalid email'}
          className={classes.margin}
          label="Email"
          helperText={
            ( actionStatus === 'email is used' || actionStatus === 'invalid email' )?
            ( actionStatus === 'email is used'? 'Email is used' : 'Invalid email' )
            :
            null
          }
          variant="outlined"
          onChange={e => setUsername(e.target.value)}
          onKeyPress={e =>handleKeyPress(e)}
        />
        <TextField
          className={classes.margin}
          label="Password"
          variant="outlined"
          type="password"
          onChange={e => setPassword(e.target.value)}
          onKeyPress={e =>handleKeyPress(e)}
        />
        <TextField
          className={classes.margin}
          label="First name"
          variant="outlined"
          onChange={e => setFullName(e.target.value)}
          onKeyPress={e =>handleKeyPress(e)}
        />
        <TextField
          className={classes.margin}
          label="Last name"
          variant="outlined"
          onChange={e => setLastName(e.target.value)}
          onKeyPress={e =>handleKeyPress(e)}
        />
        <div style={{ display: 'flex' }} className={classes.margin}>
          <FormControl style={{ width: '40%' }} variant="outlined">
            <InputLabel ref={genderRef} htmlFor="age-customized-select">Gender</InputLabel>
            <Select
              value={gender}
              onChange={e =>setGender(e.target.value)}
              input={<OutlinedInput labelWidth={genderWidth} />}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.space}></div>
          <FormControl style={{ width: '60%' }} variant="outlined">
            <InputLabel ref={phoneRef} htmlFor="component-outlined">
              { ( window.innerWidth >= 500 )? "Phone number" : "Phone" }
            </InputLabel>
            <OutlinedInput
              labelWidth={phoneWidth}
              inputComponent={TextMaskCustom}
              onChange={e =>handlePhoneNumber(e.target.value)}
              onKeyPress={e =>handleKeyPress(e)}
            />
          </FormControl>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={datePickers}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            disableFuture
            className={classes.margin}
            label="Birthday (D/M/Y)"
            openTo="year"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={date => handleDateChange(date)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
      <SignUpButton variant="contained" color="primary" className={classes.button}
        disabled={!(
          username !== '' &&
          password !== '' &&
          firstname !== '' &&
          lastname !== '' &&
          isPhoneNumberComplete() &&
          selectedDate !== null
        )}
        onClick={()=>handleSignUp({
          username: username,
          password: password,
          tel: phoneNumber,
          fullname: firstname,
          lastname: lastname,
          gender: gender,
          birthdate: API._dateSendToAPI(selectedDate)
        })}>
        Confirm
      </SignUpButton>
    </div>
  );
}
