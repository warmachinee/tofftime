import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(COLOR.red[600]),
    backgroundColor: COLOR.red[600],
    '&:hover': {
      backgroundColor: COLOR.red[800],
    },
  },
}))(Button);

export default function Red(props){
  return <Btn {...props} />;
}
