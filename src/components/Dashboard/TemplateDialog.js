import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Portal from '@material-ui/core/Portal';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import { LDCircular } from '../loading/LDCircular'

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
      maxWidth: 600,
    },
    maxHeight: window.innerHeight * .8 , height: '100%'
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
  const { open, handleClose } = props
  const container = React.useRef(null);

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
            {props.children}
          </div>
        </Modal>
      </Portal>
      <div ref={container} />
    </div>
  );
}
