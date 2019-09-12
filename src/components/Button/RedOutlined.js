import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: COLOR.red[500],
    '&:hover': {
      backgroundColor: COLOR.red[100],
    },
    borderColor: COLOR.red[500]
  },
}))(props => <Button variant="outlined" {...props} />);

export default function RedOutlined(props){
  return <Btn {...props} />;
}
