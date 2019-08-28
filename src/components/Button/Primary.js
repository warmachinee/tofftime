import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(COLOR.primary[600]),
    backgroundColor: COLOR.primary[600],
    '&:hover': {
      backgroundColor: COLOR.primary[800],
    },
  },
}))(Button);

export default function Primary(props){
  return <Btn {...props} />;
}
