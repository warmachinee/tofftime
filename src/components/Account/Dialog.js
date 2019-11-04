import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Portal from '@material-ui/core/Portal';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const SignInComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SignIn" */'./SignInComponent'),
  loading: () => null
});

const SignUpComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SignUp" */'./SignUpComponent'),
  loading: () => null
});

const ForgotPassword = Loadable({
  loader: () => import(/* webpackChunkName: "ForgotPassword" */'./ForgotPassword'),
  loading: () => null
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../Utils/TemplateDialog'),
  loading: () => null
});

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
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    height: '100%',
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    height: 'auto',
    maxHeight: '100%',
    [theme.breakpoints.up(500)]: {
      maxWidth: 450,
    },

  },
  back: {
    position: 'absolute',
    top: 8,
    left: 8,
    [theme.breakpoints.up(500)]: {
      left: 16,
    },
  },
  backIcon: {
    fontSize: '2rem',
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  closeIcon: {
    fontSize: '2rem',
  },

}));

export default function Dialog(props) {
  const classes = useStyles();
  const { API, COLOR, BTN, open, token, handleClose, handleSess, setCSRFToken, handleSnackBar } = props
  const [ modalStyle ] = React.useState(getModalStyle);
  const [ pageState, setPageState ] = React.useState('signin')
  const [ forgotState, setForgotState ] = React.useState(false)
  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')
  const [ actionStatus, handleActionStatus ] = React.useState(null)
  const container = React.useRef(null);

  async function handleGetUserinfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function handleSignIn(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'login', {
        username: username,
        password: password
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleActionStatus(d.status)
      if(/success/.test(d.status)){
        try {
          handleGetUserinfo()
          handleClose()
          handleActionStatus(null)
        }catch(err) { console.log(err.message) }
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status)?'success':'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      }
    })
  }

  async function handleSignUp(d){
    const tempUsername = d.username
    const tempPassword = d.password
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'register', {
        username: d.username,
        password: d.password,
        tel: d.tel,
        fullname: d.fullname,
        lastname: d.lastname,
        gender: d.gender,
        birthdate: d.birthdate
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleActionStatus(d.status)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status)?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        try {
          setUsername(tempUsername)
          setPassword(tempPassword)
          handleActionStatus(null)
          setPageState('signin')
        }catch(err) { console.log(err.message) }
      }
    })
  }

  return (
    <div>
      <Portal container={container.current}>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            { pageState === 'signup' &&
              <IconButton className={classes.back} onClick={()=>setPageState('signin')}>
                <ArrowBackIcon classes={{ root: classes.backIcon }} />
              </IconButton>
            }
            <IconButton className={classes.close} onClick={handleClose}>
              <CloseIcon classes={{ root: classes.closeIcon }} />
            </IconButton>
            { pageState === 'signin' &&
              <SignInComponent
                {...props}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                actionStatus={actionStatus}
                handleSignIn={handleSignIn}
                setPageState={setPageState}
                setForgotState={setForgotState} />
            }
            { pageState === 'signup' &&
              <SignUpComponent
                {...props}
                actionStatus={actionStatus}
                handleSignUp={handleSignUp} />
            }
          </div>
        </Modal>
      </Portal>
      <div ref={container} />
      <TemplateDialog open={forgotState} maxWidth={500} handleClose={()=>setForgotState(!forgotState)}>
        <ForgotPassword setForgotState={setForgotState} {...props} />
      </TemplateDialog>
    </div>
  );
}
