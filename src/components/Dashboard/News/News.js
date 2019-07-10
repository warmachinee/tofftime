import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import teal from '@material-ui/core/colors/teal';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    //position: 'relative',
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
  body: {
    marginTop: 64,
    [theme.breakpoints.up(500)]: {
      marginTop: 80,
    },
  },

}))


export default function Match(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)

  function handleOpen(action){
    console.log(action);
    setOpen(!open)
  }

  function handleClose(){
    setOpen(!open)
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'news',
    }, (csrf, d) =>{
      console.log(d);
      setCSRFToken(csrf)
      setData(d)
      /*
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error'
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
      <Button style={{ marginTop: 'auto', padding: '6px 16px 6px 12px' }} variant="contained" color="secondary"
        onClick={()=>handleOpen('create')}>
        <AddCircleIcon style={{ marginRight: 8 }}/>
        Create
      </Button>
      <TemplateDialog open={open} handleClose={handleClose}>
        <div>
          Create News
        </div>
      </TemplateDialog>
    </div>
  );
}
