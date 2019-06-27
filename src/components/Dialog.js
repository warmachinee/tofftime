import React from 'react';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Portal from '@material-ui/core/Portal';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import ic_facebook from './img/facebook.png'
import ic_facebook_16 from './img/facebook16px.png'
import ic_google from './img/google.png'
import ic_google_16 from './img/google16px.png'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
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
  close: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  closeIcon: {
    fontSize: '2rem',
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

const Facebook = withStyles(theme => ({
  root: {
    color: '#ebeef4',
    backgroundColor: '#3B5998',
    '&:hover': {
      backgroundColor: "#23355b",
    },
  },
}))(Button);

const Google = withStyles(theme => ({
  root: {
    color: grey[900],
    backgroundColor: grey[50],
    '&:hover': {
      backgroundColor: grey[300],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

export default function Dialog(props) {
  const classes = useStyles();
  const [ modalStyle ] = React.useState(getModalStyle);
  const { open, handleClose } = props
  const container = React.useRef(null);
  const SignIn = (
    <div>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Sign in
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
            className={classes.margin}
            label="Username or Email"
            variant="outlined"
            type="email"
            autoComplete="email"
          />
          <TextField
            className={classes.margin}
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
          />
        </ThemeProvider>
        <SignInButton variant="contained" color="primary" className={classes.button}>
          Sign in
        </SignInButton>
        <div style={{ position: 'relative' }}>
          <Divider variant="middle" className={classes.divider} />
          <div style={{ position: 'absolute', top: -13, width: '100%' }}>
            <div style={{ width: 50, backgroundColor: 'white', color: grey[500], textAlign: 'center', margin: 'auto', fontSize: 18, fontWeight: 600 }}>Or</div>
          </div>
        </div>
        <Facebook variant="contained" color="primary" className={classes.button}>
          <img src={ (window.innerWidth >= 500)?ic_facebook:ic_facebook_16} className={classes.loginWith}/>
          Log in with Facebook
        </Facebook>
        <Google variant="contained" color="primary" className={classes.button}>
          <img src={ (window.innerWidth >= 500)?ic_google:ic_google_16} className={classes.loginWith}/>
          Log in with Google
        </Google>
      </div>
    </div>
  )

  return (
    <div>
      <Portal container={container.current}>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <IconButton className={classes.close} onClick={handleClose}>
              <CloseIcon classes={{ root: classes.closeIcon }}/>
            </IconButton>
            {SignIn}
          </div>
        </Modal>
      </Portal>
      <div ref={container} />
    </div>
  );
}
