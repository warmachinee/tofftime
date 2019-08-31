import React from 'react';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../api'
import { primary, grey } from './../api/palette'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ic_facebook from './../components/img/facebook.png'
import ic_facebook_16 from './../components/img/facebook16px.png'
import ic_google from './../components/img/google.png'
import ic_google_16 from './../components/img/google16px.png'

const useStyles = makeStyles(theme => ({
  margin: {
    width: '100%',
    margin: '4px 0',
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1,0),
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
  title: {
    textAlign: 'center', color: grey[800],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  accountCircle: {
    fontSize: '5rem',
    color: grey[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '10rem',
    },
  },
  button: {
    width: '100%',
    padding: 8,
    margin: theme.spacing(1,0),
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

const SignInButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
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
    primary: primary,
  },
});


export default function SignInComponent(props){
  const classes = useStyles();
  const {
    handleSignIn, setPageState, actionStatus,
    username, password, setUsername, setPassword, setForgotState
  } = props

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSignIn()
    }
  }

  return(
    <div>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Sign in
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
            autoFocus
            error={actionStatus === 'wrong email'}
            className={classes.margin}
            label="Username or Email"
            helperText={actionStatus === 'wrong email'? 'Wrong email' : null}
            variant="outlined"
            type="email"
            autoComplete="email"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
          <TextField
            error={actionStatus === 'wrong password'}
            className={classes.margin}
            label="Password"
            helperText={actionStatus === 'wrong password'? 'Wrong password' : null}
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </ThemeProvider>
        <SignInButton variant="contained" color="primary" className={classes.button}
          onClick={handleSignIn}>
          Sign in
        </SignInButton>
        <div style={{ position: 'relative' }}>
          <Divider variant="middle" className={classes.divider} />
          <div style={{ position: 'absolute', top: -13, width: '100%' }}>
            <div style={{ width: 50, backgroundColor: 'white', color: grey[500], textAlign: 'center', margin: 'auto', fontSize: 18, fontWeight: 600 }}>Or</div>
          </div>
        </div>
        <Facebook variant="contained" color="primary" className={classes.button}
          onClick={()=>window.location.pathname = '/session/auth/facebook'}>
          <img src={ (window.innerWidth >= 500)?ic_facebook:ic_facebook_16} className={classes.loginWith}/>
          Sign in with Facebook
        </Facebook>
        <Google variant="contained" color="primary" className={classes.button}
          onClick={()=>window.location.pathname = '/session/auth/google'}>
          <img src={ (window.innerWidth >= 500)?ic_google:ic_google_16} className={classes.loginWith}/>
          Sign in with Google
        </Google>
        <div style={{ display: 'flex' }}>
          <Button color="primary" className={classes.textButton} onClick={()=>setPageState('signup')}>
            Join us?
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="primary" className={classes.textButton} onClick={()=>setForgotState(true)}>
            Forgot?
          </Button>
        </div>
      </div>
    </div>
  );
}
