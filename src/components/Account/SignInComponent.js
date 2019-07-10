import React from 'react';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

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
    margin: theme.spacing(1,0),
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


export default function SignInComponent(props){
  const classes = useStyles();
  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')
  const { handleSignIn, handleSignInWith, setPageState,  } = props

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSignIn({
        username: username,
        password: password
      })
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
            error={status === 'wrong email'}
            className={classes.margin}
            label="Username or Email"
            helperText={status === 'wrong email'?status:null}
            variant="outlined"
            type="email"
            autoComplete="email"
            onChange={(e)=>setUsername(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
          <TextField
            error={status === 'wrong password'}
            className={classes.margin}
            label="Password"
            helperText={status === 'wrong password'?status:null}
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </ThemeProvider>
        <SignInButton variant="contained" color="primary" className={classes.button}
          onClick={()=>handleSignIn({
            username: username,
            password: password
          })}>
          Sign in
        </SignInButton>
        <div style={{ position: 'relative' }}>
          <Divider variant="middle" className={classes.divider} />
          <div style={{ position: 'absolute', top: -13, width: '100%' }}>
            <div style={{ width: 50, backgroundColor: 'white', color: grey[500], textAlign: 'center', margin: 'auto', fontSize: 18, fontWeight: 600 }}>Or</div>
          </div>
        </div>
        <Facebook variant="contained" color="primary" className={classes.button}
          onClick={()=>handleSignInWith('facebooklogin')}>
          <img src={ (window.innerWidth >= 500)?ic_facebook:ic_facebook_16} className={classes.loginWith}/>
          Log in with Facebook
        </Facebook>
        <Google variant="contained" color="primary" className={classes.button}
          onClick={()=>handleSignInWith('googlelogin')}>
          <img src={ (window.innerWidth >= 500)?ic_google:ic_google_16} className={classes.loginWith}/>
          Log in with Google
        </Google>
        <div style={{ display: 'flex' }}>
          <Button color="primary" className={classes.textButton} onClick={()=>setPageState('signup')}>
            Join us?
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="primary" className={classes.textButton}>
            Forgot?
          </Button>
        </div>
      </div>
    </div>
  );
}
