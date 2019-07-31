import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Portal from '@material-ui/core/Portal';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    scrollBehavior: 'smooth'
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    overflow: 'auto',
    overflowX: 'hidden',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: 'calc(100% - 16px)'
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

export default function TemplateDialog(props) {
  const classes = useStyles();
  const [ modalStyle ] = React.useState(getModalStyle);
  const { open, handleClose, getRef } = props
  const container = React.useRef(null);

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div>
      <Portal container={container.current}>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div id="template-dialog" style={{ ...modalStyle, maxWidth: props.maxWidth? props.maxWidth : 600, }} className={classes.paper}>
            <IconButton className={classes.close} onClick={handleClose}>
              <CloseIcon classes={{ root: classes.closeIcon }}/>
            </IconButton>
            {props.children}
          </div>
        </Modal>
      </Portal>
      <div ref={container} />
    </div>
  );
}
