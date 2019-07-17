import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  back: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: teal[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },

}))


export default function Match(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)


  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'match',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      /*
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      */
    })
  }

  React.useEffect(()=>{
    //handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          News
        </Box>
      </Typography>

    </div>
  );
}
