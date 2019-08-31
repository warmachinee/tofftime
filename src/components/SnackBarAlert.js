import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
  close: {
    padding: 8,
    marginRight: 8,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  closeIcon: {
    fontSize: 20,
    opacity: 0.9,
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function SnackBarAlert(props) {
  const classes = useStyles();
  const { open, onClose, autoHideDuration, message, variant } = props;

  const VariantIcon = {
    success: <CheckCircleIcon className={classes.icon} />,
    error: <ErrorIcon className={classes.icon} />,
  };
  return (
    <Snackbar
      key={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
      <SnackbarContent
        className={classes[variant]}
        message={
          <span className={classes.message}>
            {VariantIcon[variant]}
            {message}
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
