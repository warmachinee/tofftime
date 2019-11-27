import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(COLOR.green[600]),
    backgroundColor: COLOR.green[600],
    '&:hover': {
      backgroundColor: COLOR.green[800],
    },
  },
}))(props => <Button variant="contained" {...props} />);

export default function Green(props){
  return <Btn {...props} />;
}
