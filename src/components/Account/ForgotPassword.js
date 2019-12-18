import React from 'react';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primary, grey } from './../../api/palette'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  margin: {
    width: '100%',
    margin: '4px 0',
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1,0),
    },
  },
  title: {
    textAlign: 'center', color: grey[800],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
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

}));

const GreenButton = withStyles(theme => ({
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

export default function SignInComponent(props){
  const classes = useStyles();
  const { API, COLOR, BTN, token, setCSRFToken, handleSnackBar } = props
  const [ forgotEmail, setForgotEmail ] = React.useState('')

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleForgot()
    }
  }

  async function handleForgot(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'forgotpassword', {
        email: forgotEmail
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status)?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        setForgotState(false)
      }
    })
  }

  return(
    <div style={{ paddingTop: 8 }}>
      <Typography component="div" style={{ marginBottom: 24 }}>
        <Box className={classes.title} fontWeight={600} m={1}>
          Forgot password
        </Box>
      </Typography>
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus={API._isDesktopBrowser()}
            className={classes.margin}
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="email"
            onChange={(e)=>setForgotEmail(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </ThemeProvider>
        <GreenButton variant="contained" color="primary" className={classes.button}
          onClick={handleForgot}>
          Send
        </GreenButton>
      </div>
    </div>
  );
}
