import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { primary } from './../../api/palette'
import pdf_guide from './../file/Guide.pdf'
import * as COLOR from './../../api/palette'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 200,
    height: 'auto',
    width: '100%',
    padding: '16px 20%',
    boxSizing: 'border-box',
    backgroundColor: COLOR.primary[800]
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(600)]: {
      flexDirection: 'row',
    },
  },

}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <div>
          <div style={{ marginTop: 24, color: 'white', fontSize: 18, fontWeight: 600 }}>Contact</div>
          <div style={{ marginTop: 24, color: 'white', fontWeight: 600 }}>
            Email : <a href="mailto:support@tofftime.com"
              target = "_top"
              style={{ color: 'white', fontWeight: 600 }}>{'support@tofftime.com'}</a>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div>
          <div style={{ marginTop: 24, color: 'white', fontSize: 18, fontWeight: 600 }}>Support</div>
          <div style={{ marginTop: 24 }}>
            <a href={pdf_guide}
              target = "_blank"
              style={{ color: 'white', fontWeight: 600 }}>{'Guide.pdf'}</a>
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ color: 'white', fontFamily: 'monospace',
        fontWeight: 600, width: '100%', textAlign: 'center', marginBottom: 24, marginTop: 24
      }}>PDS Co.,Ltd.</div>
    </div>
  );
}
