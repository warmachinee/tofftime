import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Portal from '@material-ui/core/Portal';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

const SignInComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SignIn" */'./SignInComponent'),
  loading: () => null
});

const SignUpComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SignUp" */'./SignUpComponent'),
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
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    height: '100%',
    [theme.breakpoints.up(500)]: {
      height: 'auto'
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
  const [ username, setUsername ] = React.useState(null)
  const [ password, setPassword ] = React.useState(null)
  const [ response, setResponse ] = React.useState(null)
  const { open, handleClose } = props
  const container = React.useRef(null);

  async function handleSignIn(){
    await API.xhrPost(
      props.token,
      'login', {
        username: username,
        password: password
    }, (csrf, d) =>{
      console.log(d);
      props.setCSRFToken(csrf)
      props.handleSnack({
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
            <IconButton className={classes.close} onClick={handleClose}>
              <CloseIcon classes={{ root: classes.closeIcon }}/>
            </IconButton>
            {/*
              <SignInComponent
                response={response}
                setUsername={setUsername}
                setPassword={setPassword}
                handleSignIn={handleSignIn}/>
            */}
            <SignUpComponent />
          </div>
        </Modal>
      </Portal>
      <div ref={container} />
    </div>
  );
}
