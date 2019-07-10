import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import MaskedInput from 'react-text-mask';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

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

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

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
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  accountCircle: {
    fontSize: '5rem',
    color: teal[900],
    [theme.breakpoints.up(500)]: {
      fontSize: '10rem',
    },
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
    color: teal[900]
  },
  loginWith: {
    position: 'absolute',
    left: 16
  }
}));

const SignUpButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

const datePickers = createMuiTheme({
  palette: {
    primary: teal,
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
  const { handleSignUp } = props
  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')
  const [ phoneNumber, setPhoneNumber ] = React.useState('');
  const [ fullname, setFullName ] = React.useState('')
  const [ lastname, setLastName ] = React.useState('')
  const [ gender, setGender ] = React.useState('')
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());

  const [ phoneWidth, setPhoneWidth ] = React.useState(0);
  const [ genderWidth, setGenderWidth ] = React.useState(0);

  const phoneRef = React.useRef(null);
  const genderRef = React.useRef(null);

  function handlePhoneNumber(num){
    setPhoneNumber( num.substring(1,4) + num.substring(6,9) + num.substring(12,16) )
  }
  function handleDateChange(d){
    //console.log(handleConvertDate(d));
    setSelectedDate(d)
  }
  function handleConvertDate(d){
    const day = (selectedDate.getDate() > 9) ? selectedDate.getDate():'0' + selectedDate.getDate()
    const month = (selectedDate.getMonth() + 1 > 9) ? selectedDate.getMonth() + 1:'0' + ( selectedDate.getMonth() + 1 )
    const dateStr = selectedDate.getFullYear() + '-' + month + '-' + day
    //const dateSp = dateStr.split('/')
    //const dateConvert = dateSp[1] + '/' + dateSp[0] + '/' + dateSp[2]

    //setSelectedDate(new Date(dateConvert))
    return dateStr
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSignUp({
        username: username,
        password: password,
        tel: phoneNumber,
        fullname: fullname,
        lastname: lastname,
        gender: gender,
        birthdate: handleConvertDate(selectedDate)
      })
    }
  }

  React.useEffect(()=>{
    setPhoneWidth(phoneRef.current.offsetWidth);
    setGenderWidth(genderRef.current.offsetWidth);
  },[ ])

  return(
    <div>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Sign up
        </Box>
      </Typography>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <div style={{ flexGrow: 1 }}></div>
        { window.innerHeight >= 500 &&
          <AccountCircleIcon classes={{ root: classes.accountCircle }} />
        }
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            required
            className={classes.margin}
            label="Email"
            variant="outlined"
            onChange={e => setUsername(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
          <TextField
            required
            className={classes.margin}
            label="Password"
            variant="outlined"
            type="password"
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
          <TextField
            required
            className={classes.margin}
            label="First name"
            variant="outlined"
            onChange={e => setFullName(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
          <TextField
            required
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
                input={<OutlinedInput labelWidth={genderWidth}/>}
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
              label="Birthday"
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
          onClick={()=>handleSignUp({
            username: username,
            password: password,
            tel: phoneNumber,
            fullname: fullname,
            lastname: lastname,
            gender: gender,
            birthdate: handleConvertDate(selectedDate)
          })}>
          Confirm
        </SignUpButton>
      </div>
    </div>
  );
}
