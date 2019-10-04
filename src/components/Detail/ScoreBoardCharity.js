import React from 'react';
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
  ListItemText,
  Divider,
  TextField,
  Button,
  Typography,

} from '@material-ui/core';

import {
  ArrowBack,
} from '@material-ui/icons';

import { LDCircular } from './../loading/LDCircular'

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1600,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  saveButton: {
    marginTop: 'auto',
    marginLeft: 12
  },
  playerLimitChildGrid: {
    display: 'flex',
  },
  playerLimitLabel: {
    textAlign: 'center',
    padding: '6px 8px',
    border: '1px solid',
    borderRadius: 4
  },
  userlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    boxSizing: 'border-box',
  },
  userlistChildGrid: {
    border: '1px solid',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listPlayerName: {
    width: '100%'
  },
  listScore: {
    width: '10%',
    textAlign: 'right'
  },
  listPrice: {
    width: '20%',
    textAlign: 'right'
  },
  listTotal: {
    textAlign: 'right'
  },
  listText: {
    fontSize: 14
  },

}))

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function ScoreBoardCharity(props){
  const classes = useStyles();
  const { API, COLOR, token, setCSRFToken, BTN } = props
  const hole = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
  const [ matchid, setMatchid ] = React.useState(null)
  const [ gameType, setGameType ] = React.useState(null)
  const [ playerLimit, setPlayerLimite ] = React.useState(null)
  const [ under, setUnder ] = React.useState(null)
  const [ over, setOver ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)

  function handleKeyPressPlayerLimit(){
    console.log(playerLimit);
  }

  React.useEffect(()=>{
    console.log(props);
  },[ ])

  function playerLimitComponent(){
    return (
      <div style={{ margin: '12px auto', maxWidth: 1200 }}>
        <ThemeProvider theme={theme}>
          { editting ?
            <div className={classes.playerLimitChildGrid}>
              <TextField label="Player Limit"
                onChange={e =>setPlayerLimite(e.target.value)}
                onKeyPress={e =>handleKeyPressPlayerLimit(e)} />
              <BTN.Primary className={classes.saveButton}
                onClick={handleSetBaseprice}>Save</BTN.Primary>
            </div>
            :
            <div className={classes.playerLimitChildGrid}>
              <Typography className={classes.playerLimitLabel}>Player Limit</Typography>
              <Typography style={{ padding: '6px 8px', marginLeft: 12 }}>Player Limit</Typography>
            </div>
          }
        </ThemeProvider>
      </div>
    );
  }

  function userListComponent(){
    return (
      <div className={classes.userlistGrid}>
        { [0,1,2,3].map( d =>
          <div key={d} className={classes.userlistChildGrid}>
            {userListTable()}
          </div>
        )}
      </div>
    );
  }

  function userListTable(){

    return (
      <List disablePadding>
        <ListItem style={{ backgroundColor: COLOR.grey[900] }}>
          <ListItemText style={{ color: 'white' }} className={classes.listPlayerName} classes={{ primary: classes.listText }} primary="Player" />
          <ListItemText style={{ color: 'white' }} className={classes.listScore} classes={{ primary: classes.listText }} primary="OUT" />
          <ListItemText style={{ color: 'white' }} className={classes.listScore} classes={{ primary: classes.listText }} primary="IN" />
          <ListItemText style={{ color: 'white' }} className={classes.listScore} classes={{ primary: classes.listText }} primary="HC" />
          <ListItemText style={{ color: 'white' }} className={classes.listScore} classes={{ primary: classes.listText }} primary="SF" />
          <ListItemText style={{ color: 'white' }} className={classes.listPrice} classes={{ primary: classes.listText }} primary="Price" />
        </ListItem>
        { hole.map( d =>
          <React.Fragment key={d}>
            <ListItem className={classes.listPlayer}>
              <ListItemText className={classes.listPlayerName} classes={{ primary: classes.listText }} primary={`User ${d}`} />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary="OUT" />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary="IN" />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary="HC" />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary="SF" />
              <ListItemText className={classes.listPrice} classes={{ primary: classes.listText }} primary="Price" />
            </ListItem>
            <Divider />
          </React.Fragment>
        )}
        <ListItem>
          <ListItemText classes={{ primary: classes.listText }} primary="Total" />
          <ListItemText className={classes.listTotal} classes={{ primary: classes.listText }} primary="Price" />
        </ListItem>
      </List>
    );
  }

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div className={classes.root}>
      {playerLimitComponent()}
      {userListComponent()}
    </div>
  );
}
