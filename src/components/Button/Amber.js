import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(COLOR.amber[600]),
    backgroundColor: COLOR.amber[600],
    '&:hover': {
      backgroundColor: COLOR.amber[800],
    },
  },
}))(Button);

export default function Amber(props){
  return <Btn {...props} />;
}
