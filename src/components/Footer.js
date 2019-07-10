import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#0d47a1',
    height: 200,
    width: '100%',
    padding: '16px 20%'
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div style={{ margin: '24px 5% 0 5%', color: 'white', fontSize: 18, fontWeight: 600 }}>Contact</div>
      <div style={{ margin: '24px 5% 0 5%', color: 'white', fontWeight: 600 }}>Email : support@tofftime.com</div>
      <div style={{ flex: 1 }}></div>
      <div style={{ color: 'white', fontFamily: 'monospace',
        fontWeight: 600, width: '100%', textAlign: 'center', marginBottom: 24
      }}>PDS Co.,Ltd.</div>
    </div>
  );
}