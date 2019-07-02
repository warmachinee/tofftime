import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/Close';

import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
  close: {
    padding: 8,
    marginRight: 8,
  },
  snackbarContent: {
    backgroundColor: green[500],
  },
  closeIcon: {
    fontSize: 20,
    opacity: 0.9,
  },
  messageGrid: {
    display: 'flex', flexDirection: 'column', marginLeft: 16
  },
  messageGridTop: {
    display: 'flex', marginBottom: 8
  },
  messageGridBottom: {
    display: 'flex'
  },
  messageLabel: {
    width: '100%',
    textAlign: 'center',
  },
  messageShort: {
    width: '100%',
    textAlign: 'center',
  },
  messageLong: {
    minWidth: 100,
    width: '100%',
    textAlign: 'left',
  },
  divider: {
    margin: '12px 0',
    backgroundColor: 'white',
    height: 1.5
  }
}))

export default function SnackBarLong(props) {
  const classes = useStyles();
  const { open, onClose, autoHideDuration,
    sFULLNAME, sLASTNAME, sOUT, sIN, sTOTAL, sPAR
  } = props;

  return (
    <Snackbar
      key={sFULLNAME+sLASTNAME}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
      <SnackbarContent
        className={classes.snackbarContent}
        message={
          <span className={classes.message}>
            <div className={classes.messageGrid}>
              <div className={classes.messageGridTop}>
                <div className={classes.messageLong}>{sFULLNAME}</div>
                <div className={classes.messageLong}>{sLASTNAME}</div>
              </div>
              <Divider classes={{ root: classes.divider }}/>
              <div className={classes.messageGridBottom}>
                <div className={classes.messageLabel}>OUT</div>
                <div className={classes.messageLabel}>IN</div>
                <div className={classes.messageLabel}>{'='}</div>
                <div className={classes.messageLabel}>Total</div>
                <div style={{ flex: 1 }}></div>
                <div className={classes.messageLabel} style={{ marginLeft: 48 }}>PAR</div>
              </div>
              <div className={classes.messageGridBottom}>
                <div className={classes.messageShort}>{sOUT}</div>
                <div className={classes.messageShort}>{sIN}</div>
                <div className={classes.messageLabel}></div>
                <div className={classes.messageShort}>{sTOTAL}</div>
                <div className={classes.messageShort} style={{ marginLeft: 48 }}>{sPAR}</div>
              </div>
            </div>
          </span>
        }
        action={[
          <IconButton
            key="close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
