import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Menu,
} from '@material-ui/core'

import {
  AccountCircle,

} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  avatar: {
    fontSize: 120
  },
  avatarImage: {
    width: 120,
    height: 120,
  },

}));


export default function NotiOverview(props) {
  const classes = useStyles();
  const {
    API, BTN, COLOR, isSupportWebp, anchorEl, handleClose,
  } = props

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <div style={{ padding: 16, width: 250 }}>
        Noti overview
      </div>
    </Menu>
  );
}
