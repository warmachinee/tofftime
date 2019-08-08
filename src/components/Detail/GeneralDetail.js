import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ic_slide1 from './../img/slide1.png'
import ic_sw from './../img/sw.jpg'
import ic_ssw from './../img/ssw.jpg'
import ic_gsw from './../img/gsw.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  detailDate: {
    textAlign: 'left', color: primary[600],
    fontSize: 16, fontStyle: 'oblique', fontFamily: 'monospace'
  },
  detailLocation: {
    textAlign: 'left', color: primary[800],
    fontSize: 18,
  },
  detailHead: {
    textAlign: 'left', color: primary[800],
    fontSize: 18,
    [theme.breakpoints.up(500)]: {
      fontSize: 20,
    },
  },
  detailText: {
    textAlign: 'left', color: primary[800],
    fontSize: 18,
    [theme.breakpoints.up(500)]: {
      fontSize: 20,
    },
  },
  detailCredit: {
    textAlign: 'right',
    fontSize: 16,
    margin: 0
  },
  link: {
    marginTop: 'auto',
    marginLeft: 8,
    fontSize: 16,
    fontStyle: 'oblique',
  },
  detailBox: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  back: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(primary[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: primary[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
  img: {
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

}))

export default function GeneralDetail(props){
  const classes = useStyles();

  async function handleFetch(){
    const newsid = props.computedMatch.params.detailparam
    console.log(props.computedMatch);
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <Paper className={classes.root}>
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
    </Paper>
  );
}
