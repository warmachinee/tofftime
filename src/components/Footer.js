import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { primary } from './../api/palette'
import pdf_guide from './file/Guide.pdf'
import * as COLOR from './../api/palette'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 200,
    height: 'auto',
    width: '100%',
    padding: '16px 20%',
    boxSizing: 'border-box'
  },

}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}
      style={{ backgroundColor: COLOR.primary[800] }}>
      <div style={{ display: 'flex', flexDirection: window.innerWidth >600 ? 'row' : 'column' }}>
        <div>
          <div style={{ marginTop: 24, color: 'white', fontSize: 18, fontWeight: 600 }}>Contact</div>
          <div style={{ marginTop: 24, color: 'white', fontWeight: 600 }}>Email : support@tofftime.com</div>
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
