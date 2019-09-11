import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as COLOR from './../../api/palette'

import {
  Button
} from '@material-ui/core';

const Btn = withStyles(theme => ({
  root: {
    color: COLOR.primary[500],
    '&:hover': {
      backgroundColor: COLOR.primary[100],
    },
    borderColor: COLOR.primary[500]
  },
}))(props => <Button variant="outlined" {...props} />);

export default function PrimaryOutlined(props){
  return <Btn {...props} />;
}
