import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

import {
  Typography,
  Divider,
  Link as LinkMaterial,

} from '@material-ui/core';

import {
  Search,

} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: COLOR.primary[900],
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundImage: {
    position: 'absolute',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: .075,
    width: '200%',
    height: 'auto',
    minHeight: '100%',
    top: 'auto',
    [theme.breakpoints.up(800)]: {
      width: '100%',
      top: '-50%'
    },
  },
  grid: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    padding: theme.spacing(3, 4),
  },
  category: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  categoryBox: {
    width: '100%',
    height: 'auto',
    marginBottom: 24,
    padding: theme.spacing(1, 4),
    [theme.breakpoints.up(800)]: {
      flex: `0 0 ${100/2}%`,
      maxWidth: `${100/2}%`,
      height: 200,
    },
  },
  title: {
    marginBottom: '.75em',
    fontWeight: 300
  },
  subtitleGrid: {
    display: 'flex',
    flexDirection: 'column'
  },
  whiteText: {
    color: 'white'
  },
  subtitle: {
    color: COLOR.primary[100],
    marginBottom: '.35em',
  },
  bottom: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  bottomText: {
    textAlign: 'center',
    fontFamily: 'Monospace, "Helvetica", "Arial", sans-serif'
  },

}));

export default function Footer(props) {
  const classes = useStyles();
  /*
  <div>
    <div style={{ marginTop: 24, color: 'white', fontSize: 18, fontWeight: 600 }}>Support</div>
    <div style={{ marginTop: 24 }}>
      <a href="http://thai-pga.com/system/manual/TestPDF.pdf"
        target = "_blank"
        style={{ color: 'white', fontWeight: 600 }}>{'Guide.pdf'}</a>
    </div>
  </div>
  */

  /*
  <div>
    <div style={{ marginTop: 24, color: 'white', fontSize: 18, fontWeight: 600 }}>Contact</div>
    <div style={{ marginTop: 24, color: 'white', fontWeight: 600 }}>
      Email : <a href="mailto:support@tofftime.com"
        target = "_top"
        style={{ color: 'white', fontWeight: 600 }}>{'support@tofftime.com'}</a>
    </div>
  </div>
  */

  return (
    <footer className={classes.root}>
      <img className={classes.backgroundImage}
        src="https://file.thai-pga.com/system/image/footer.jpg" />
      <div className={classes.grid}>
        <div className={classes.category}>
          <div className={classes.categoryBox}>
            <Typography
              variant="h5"
              className={classes.title}
              classes={{ root: classes.whiteText }}>Contact Us</Typography>
            <div className={classes.subtitleGrid}>
              <LinkMaterial
                href="mailto:support@tofftime.com"
                target = "_top"
                variant="body1"
                className={classes.subtitle}>
                {'support@tofftime.com'}
              </LinkMaterial>
            </div>
          </div>
          <div className={classes.categoryBox}>
            <Typography
              variant="h5"
              className={classes.title}
              classes={{ root: classes.whiteText }}>Help</Typography>
            <LinkMaterial
              href="https://file.thai-pga.com/system/manual/guide.pdf"
              target = "_blank"
              variant="body1"
              className={classes.subtitle}>
              Manual
            </LinkMaterial>
          </div>
        </div>
        <Divider style={{ backgroundColor: 'white', opacity: .4 }} />
        <div className={classes.bottom}>
          <Typography variant="caption" className={classes.bottomText} classes={{ root: classes.whiteText }}>PDS Co.,Ltd.</Typography>
        </div>
      </div>
    </footer>
  );
}
