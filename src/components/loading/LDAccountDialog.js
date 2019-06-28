import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

import teal from '@material-ui/core/colors/teal';

const ColorCircularProgress = withStyles({
  root: {
    color: teal[800],
    margin: '36px auto'
  },
})(CircularProgress);

export function LDAccountDialog() {
  let wd = window.innerWidth

  const grid = {
    display: 'flex',
    padding: '24px 16px',
    width: '100%',
    height: 'auto',
  }

  return (
    <div style={grid}>
      <div style={{ flexGrow: 1 }}></div>
      <ColorCircularProgress size={48}/>
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}
