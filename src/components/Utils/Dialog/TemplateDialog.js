import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,

} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4),
    overflow: 'auto',
    overflowX: 'hidden',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2
  },
  closeIcon: {
    fontSize: '2rem',
  },
  dialogActions: {
    padding: '16px 24px'
  },

}));

export default function TemplateDialog(props) {
  const classes = useStyles();
  const {
    open, scroll = 'paper', maxWidth = 'sm', fullWidth = true,
    handleClose, getRef, fullScreen, titleDivider, elementId
  } = props

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
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      scroll={scroll}>
      <DialogTitle disableTypography>
        <IconButton className={classes.close} onClick={handleClose}>
          <CloseIcon classes={{ root: classes.closeIcon }} />
        </IconButton>
        <div>
          {props.title}
        </div>
      </DialogTitle>
      <DialogContent id={ elementId ? elementId : "template-dialog"} dividers={titleDivider}>
        <div style={{ marginTop: 16 }}>
          {props.children}
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {props.action}
      </DialogActions>
    </Dialog>
  );
}
