import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    backgroundColor: '#0d47a1',
    height: 200,
    width: '100%',
    marginTop: 16,
    padding: '16px 20%'
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>Contact</div>
      <div>Email</div>
      <div style={{ color: 'white', fontFamily: 'monospace', fontWeight: 600, position: 'absolute', right: 8, bottom: 8 }}>PDS Co.,Ltd.</div>
    </div>
  );
}
