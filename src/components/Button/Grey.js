import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(COLOR.grey[600]),
    backgroundColor: COLOR.grey[600],
    '&:hover': {
      backgroundColor: COLOR.grey[800],
    },
  },
}))(props => <Button variant="contained" {...props} />);

export default function Grey(props){
  return <Btn {...props} />;
}
