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
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
    width: 50,
    textAlign: 'right'
  },
  listPrice: {
    width: 100,
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
  const { sess, API, COLOR, token, setCSRFToken, BTN , isSupportWebp, handleSnackBar, handleSnackBarL } = props
  const [ playerLimit, setPlayerLimite ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ userscore, setUserscore ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(d.status === 'wrong params'){
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }else{
        setData(d)
        setUserscore(d.userscore)
        console.log(d, d.userscore);
      }
    })
  }

  function response(action){
    const matchid = parseInt(props.computedMatch.params.matchid)
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`admin-match-${matchid}-server-message`, (messageNew) => {
      if(messageNew && messageNew.status === 'success'){
        if(messageNew.hostdetail){
          handleSnackBarL({
            state: true,
            sFULLNAME: messageNew.hostdetail.fullname,
            sLASTNAME: messageNew.hostdetail.lastname,
            sOUT: messageNew.hostdetail.sout,
            sIN: messageNew.hostdetail.sin,
            sTOTAL: messageNew.hostdetail.gross,
            sPAR: messageNew.hostdetail.par
          })
        }
        setUserscore(messageNew.result.userscore)
      }
    })
  }

  function handleKeyPressPlayerLimit(){
    console.log(playerLimit);
  }

  React.useEffect(()=>{
    response()
    handleFetch()
    console.log(props);
    /*
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: "/match/:matchid/minigame/:gametype",
      });
      if(match){
        var matchid = parseInt(match.params.matchid)
        var gameType = match.params.gametype
        setMatchid(matchid)
        setGameType(gameType === 'jao' ? gameType : 'normal')
        if(/Mini Game/.test(componentType)){
          handleFetchMiniGame(matchid, gameType)
          responseMiniGame(matchid, gameType)
          setComponentType(gameType === 'jao' ? 'Mini Game Jao' : 'Mini Game Mah')
        }else{

        }
      }
    }*/
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
          {/*
            <ListItemText style={{ color: 'white' }} className={classes.listPrice} classes={{ primary: classes.listText }} primary="Price" />*/
          }
        </ListItem>
        { userscore &&
          userscore.map( d =>
          <React.Fragment key={d.userid}>
            <ListItem className={classes.listPlayer}>
              <ListItemText className={classes.listPlayerName} classes={{ primary: classes.listText }}
                primary={d.firstname}
                secondary={
                  <Typography className={classes.listPlayerName} variant="subtitle1">{d.lastname}</Typography>
                } />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.out} />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.in} />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.hc} />
              <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.sf}/>
              {/*
                <ListItemText className={classes.listPrice} classes={{ primary: classes.listText }} primary="Price" />*/
              }
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
    <Paper className={classes.root}>
      {playerLimitComponent()}
      {userListComponent()}
    </Paper>
  );
}
