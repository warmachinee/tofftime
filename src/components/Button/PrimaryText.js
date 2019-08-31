import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: COLOR.primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: COLOR.primary[100],
    },
  },
}))(Button);

export default function PrimaryText(props){
  return <Btn {...props} variant="text"/>;
}
