import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Portal from '@material-ui/core/Portal';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { LDAccountDialog } from '../loading/LDAccountDialog'

const SignInComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SignIn" */'./SignInComponent'),
  loading: () => <LDAccountDialog />
});

const SignUpComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SignUp" */'./SignUpComponent'),
  loading: () => <LDAccountDialog />
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
    [theme.breakpoints.up(500)]: {
      height: 'auto',
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
  const [ modalStyle ] = React.useState(getModalStyle);
  const [ pageState, setPageState ] = React.useState('signin')
  const { open, handleClose, setResponse } = props
  const container = React.useRef(null);

  async function handleSignIn(d){
    await API.xhrPost(
      props.token,
      'login', {
        username: d.username,
        password: d.password
    }, (csrf, d) =>{
      console.log(d);
      props.setCSRFToken(csrf)
      props.handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success'?'success':'error'
      })
      setResponse(d)
    })
  }

  async function handleSignInWith(d){
    //const token = await API.xhrGet(d)
    await API.xhrPost(
      props.token,
      d, {}, (csrf, d) =>{
      console.log(d);
      props.setCSRFToken(csrf)
      props.handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success'?'success':'error'
      })
      setResponse(d)
    })
  }

  async function handleSignUp(d){
    await API.xhrPost(
      props.token,
      'register', {
        username: d.username,
        password: d.password,
        tel: d.tel,
        fullname: d.fullname,
        lastname: d.lastname,
        gender: d.gender,
        birthdate: d.birthdate
    }, (csrf, d) =>{
      console.log(d);
      props.setCSRFToken(csrf)
      props.handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success'?'success':'error'
      })
      setResponse(d)
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
                <ArrowBackIcon classes={{ root: classes.backIcon }}/>
              </IconButton>
            }
            <IconButton className={classes.close} onClick={handleClose}>
              <CloseIcon classes={{ root: classes.closeIcon }}/>
            </IconButton>
            { pageState === 'signin' &&
              <SignInComponent
                handleSignIn={handleSignIn}
                handleSignInWith={handleSignInWith}
                setPageState={setPageState}/>
            }
            { pageState === 'signup' &&
              <SignUpComponent
                handleSignUp={handleSignUp}
                setPageState={setPageState}/>
            }
          </div>
        </Modal>
      </Portal>
      <div ref={container} />
    </div>
  );
}
