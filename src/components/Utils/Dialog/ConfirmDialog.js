import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as API from './../../../api'
import * as COLOR from './../../../api/palette'
import * as BTN from './../../Button'

import {
  Typography,
  Dialog,
  IconButton,
  Divider,
  Avatar,

} from '@material-ui/core';

import {
  Close as CloseIcon,
  Photo,
  Delete as DeleteIcon,
  Lock as LockIcon,
  ExitToApp,

} from '@material-ui/icons';

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
  iconGrid: {
    marginBottom: 24
  },
  iconBackground: {
    padding: 16,
  },

}));

export default function ConfirmDialog(props) {
  const classes = useStyles();
  const stylesTheme = useTheme();
  const {
    sess,
    fullWidth = true,
    maxWidth = 'xs',
    open,
    onClose,
    onSubmit,
    onCancel,
    elementId,
    title,
    content,
    submitText,
    cancelText,
    submitButton,
    cancelButton,
    cancelStyle,
    submitStyle,
    icon,
    iconColor,

  } = props

  const IconComp = typeof(icon) !== 'object' && {
    delete: DeleteIcon,
    photo: Photo,
    lock: LockIcon,
    exittoapp: ExitToApp,

  }[icon.toLowerCase() || photo]
  const SubmitButton = BTN[ submitButton ? submitButton : 'Primary']
  const CancelButton = BTN[ cancelButton ? cancelButton : 'PrimaryOutlined']

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}>
      <div id={ elementId ? elementId : "confirm-dialog" } className={classes.paper}>
        <IconButton className={classes.close} onClick={onClose}>
          <CloseIcon classes={{ root: classes.closeIcon }} />
        </IconButton>
        <div id={ (elementId ? elementId : "confirm-dialog") + "-children" }>
          <div className={classes.iconGrid} style={{ display: 'flex', justifyContent: 'center' }}>
            { icon && typeof(icon) === 'object' ?
              <Avatar
                style={{ width: icon.width ? icon.width : 64, height: icon.height ? icon.height : 64 }}
                src={icon.src ? icon.src : "https://file.thai-pga.com/system/image/logoX2.png"} />
              :
              <Avatar className={classes.iconBackground}
                style={{ backgroundColor: iconColor ? iconColor : COLOR.primary[600] }}>
                { IconComp ?
                  <IconComp style={{ color: stylesTheme.palette.getContrastText(iconColor ? iconColor : COLOR.primary[600]), fontSize: 48 }} />
                  :
                  <Photo style={{ color: stylesTheme.palette.getContrastText(iconColor ? iconColor : COLOR.primary[600]), fontSize: 48 }} />
                }
              </Avatar>
            }
          </div>
          <Typography gutterBottom variant="h5" align="center">
            { title ? title : API._getWord(sess && sess.language).Title }
          </Typography>
          { content &&
            <Typography variant="body1" component="div">
              {content}
            </Typography>
          }
          <Divider style={{ marginTop: 24, marginBottom: 24 }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CancelButton onClick={onCancel ? onCancel : onClose} style={{ marginRight: 8, width: 100, padding: '6px 24px', ...cancelStyle }}>
              { cancelText ? cancelText : API._getWord(sess && sess.language).Cancel }
            </CancelButton>
            <SubmitButton onClick={onSubmit} style={{ width: 100, padding: '6px 24px', ...submitStyle }}>
              { submitText ? submitText : API._getWord(sess && sess.language).Delete }
            </SubmitButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
