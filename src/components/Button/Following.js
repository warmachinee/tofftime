import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(COLOR.grey[600]),
    backgroundColor: COLOR.grey[500],
    '&:hover': {
      backgroundColor: COLOR.grey[500],
    },
  },
}))(Button);

export default function Following(props){
  return <Btn {...props} />;
}
