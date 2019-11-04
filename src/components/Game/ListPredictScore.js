import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { matchPath } from 'react-router'
import { primary, grey } from './../../api/palette'

import {
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
  Typography,
  Menu,
  MenuItem,
  Collapse,
  IconButton,

} from '@material-ui/core';

import {
  ArrowBack,
  ArrowDropDown,
  ExpandMore,
  CheckCircle,

} from '@material-ui/icons';

import { LDCircular } from './../loading/LDCircular'

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Utils/GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  saveButton: {
    marginTop: 'auto',
    marginLeft: 12
  },
  basepriceChildGrid: {
    display: 'flex', width: 250
  },

}))

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function ListPredictScore(props){
  const classes = useStyles();
  const { API, BTN, COLOR, token, setCSRFToken, handleSnackBar, data, matchid, gameType, handleMiniGame } = props
  const [ predictScore, setPredictScore ] = React.useState(data.predictscore)

  function handleKeyPressSetPredictScore(e){
    if(e.key === 'Enter'){
      handleFetchSetPredict()
    }
  }

  async function handleFetchSetPredict(){
    var userid;
    if(Object.keys(data).find( d => d === 'mainplayer')){
      userid = data.mainplayer
    }else{
      userid = data.userid
    }
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'setpredictscore',
        matchid: matchid,
        userid: userid,
        value: parseInt(predictScore)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleMiniGame(matchid, gameType)
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.basepriceChildGrid}>
        <TextField label="Predict Score"
          value={predictScore || 0}
          type="number"
          onChange={e =>setPredictScore(e.target.value)}
          onKeyPress={e =>handleKeyPressSetPredictScore(e)}
          onFocus={e => e.target.select()} />
        <BTN.Primary className={classes.saveButton}
          onClick={handleFetchSetPredict}>Save</BTN.Primary>
      </div>
    </ThemeProvider>
  );
}
