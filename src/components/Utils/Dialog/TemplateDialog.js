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
    top: 0,
    right: 0,
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
    open, scroll = 'paper', maxWidth = 'sm', maxHeight = 'calc(100% - 64px)', fullWidth = true,
    handleClose, getRef, fullScreen = window.innerWidth <= 600, titleDivider, elementId
  } = props

  const dialogStyle = makeStyles(theme => ({
    paperScrollPaper: {
      maxHeight: maxHeight,
    },

  }))()

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      classes={{ paperScrollPaper: dialogStyle.paperScrollPaper }}>
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
