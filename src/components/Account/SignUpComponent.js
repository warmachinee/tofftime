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

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ic_facebook from '../img/facebook.png'
import ic_facebook_16 from '../img/facebook16px.png'
import ic_google from '../img/google.png'
import ic_google_16 from '../img/google16px.png'

const useStyles = makeStyles(theme => ({
  margin: {
    width: '100%',
    margin: 4,
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1),
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

const SignInButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
    },
  },
}))(Button);

const datePicker = createMuiTheme({
  palette: {
    primary: teal,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: teal,
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
  const { setUsername, setPassword, handleSignIn } = props
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());
  const [ phoneNumber, setPhoneNumber ] = React.useState('');
  const [ labelWidth, setLabelWidth ] = React.useState(0);
  const labelRef = React.useRef(null);

  function handlePhoneNumber(num){
    setPhoneNumber( num.substring(1,4) + num.substring(6,9) + num.substring(12,16) )
  }
  function handleDateChange(d){
    const day = (d.getDate() > 9) ? d.getDate():'0' + d.getDate()
    const month = (d.getMonth() + 1 > 9) ? d.getMonth() + 1:'0' + ( d.getMonth() + 1 )
    const dateStr = day + '/' + month + '/' + d.getFullYear()
    console.log(dateStr);
    setSelectedDate(d)
  }

  React.useEffect(()=>{
    setLabelWidth(labelRef.current.offsetWidth);
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
        <AccountCircleIcon classes={{ root: classes.accountCircle }} />
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            required
            className={classes.margin}
            label="Email"
            variant="outlined"
          />
          <TextField
            required
            className={classes.margin}
            label="Username"
            variant="outlined"
            type="email"
          />
          <TextField
            required
            className={classes.margin}
            label="Password"
            variant="outlined"
            type="password"
          />
          <FormControl className={classes.margin} variant="outlined">
            <InputLabel ref={labelRef} htmlFor="component-outlined">
              Phone number
            </InputLabel>
            <OutlinedInput
              labelWidth={labelWidth}
              inputComponent={TextMaskCustom}
              onChange={e =>handlePhoneNumber(e.target.value)}
            />
          </FormControl>
        </ThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={datePicker}>
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
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
        <SignInButton variant="contained" color="primary" className={classes.button}
          onClick={handleSignIn}>
          Sign in
        </SignInButton>
      </div>
    </div>
  );
}
