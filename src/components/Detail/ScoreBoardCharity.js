import React from 'react';
import { makeStyles, withStyles, createMuiTheme, useTheme  } from '@material-ui/core/styles';
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
    maxWidth: 1200,
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
    width: '100%',
    fontSize: 14
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
  const stylesTheme = useTheme();
  const { sess, API, COLOR, token, setCSRFToken, BTN , isSupportWebp, handleSnackBar, handleSnackBarL } = props
  const [ playerLimit, setPlayerLimit ] = React.useState({
    min: 0,
    max: 0,
    current: 0
  })
  const [ editting, setEditting ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ userscore, setUserscore ] = React.useState(null)

  function handlePlayerLimitCal(data){
    const arrLength = []
    const userscore = data.userscore
    if(data.class){
      data.class.forEach( e =>{
        var userscoreFiltered = userscore.filter( item =>{ return item.classno === e.classno } )
        //console.log(userscoreFiltered)
        arrLength.push(userscoreFiltered.length)
      })
      //console.log('arrLength', arrLength);
      //console.log('max', Math.max(...arrLength));
      setPlayerLimit({...playerLimit, current: Math.max(...arrLength), max: Math.max(...arrLength) })
    }
  }

  function handlePlayerLimit(value){
    if(value >= playerLimit.min && value <= playerLimit.max){
      setPlayerLimit({...playerLimit, current: parseInt(value)})
    }else{
      if(value < playerLimit.min){
        setPlayerLimit({...playerLimit, current: playerLimit.min})
      }else{
        setPlayerLimit({...playerLimit, current: playerLimit.max})
      }
      handleSnackBar({
        state: true,
        message: `min = 0, max = ${playerLimit.max}`,
        variant: 'error',
        autoHideDuration: 5000
      })
    }
  }

  function userTotalScore(arr){
    var sum = 0;
    arr.forEach( e =>{ sum += e.sf })
    return sum
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
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
        handlePlayerLimitCal(d)
      }
    })
  }

  function response(){
    const matchid = parseInt(props.computedMatch.params.matchid)
    const socket = socketIOClient( API._getWebURL() )
    socket.on(`admin-match-${matchid}-server-message`, (messageNew) => {
      if(messageNew && messageNew.status === 'success'){
        const d = messageNew.result
        const dh = messageNew.hostdetail
        if(dh){
          handleSnackBarL({
            state: true,
            sFULLNAME: dh.fullname,
            sLASTNAME: dh.lastname,
            sOUT: dh.sout,
            sIN: dh.sin,
            sTOTAL: dh.gross,
            sPAR: dh.par
          })
        }
        setUserscore(d.userscore)
        handlePlayerLimitCal(d)
      }
    })
  }

  React.useEffect(()=>{
    response()
    handleFetch()
  },[ ])

  function playerLimitComponent(){

    return (
      <div style={{ margin: '12px auto', display: 'flex', justifyContent: 'space-between' }}>
        <ThemeProvider theme={theme}>
          { editting ?
            <div className={classes.playerLimitChildGrid}>
              <TextField label="Player Limit"
                value={!isNaN(playerLimit.current) ? playerLimit.current : ''}
                type="number"
                onChange={e =>handlePlayerLimit(e.target.value)}
                onFocus={e => e.target.select()} />
            </div>
            :
            <div className={classes.playerLimitChildGrid}>
              <Typography className={classes.playerLimitLabel}>Player Limit</Typography>
              <Typography style={{ padding: '6px 8px', marginLeft: 12 }}>{playerLimit.current}</Typography>
            </div>
          }
        </ThemeProvider>
        <BTN.PrimaryText onClick={()=>setEditting(!editting)}>{ editting ? 'Done' : 'Edit' }</BTN.PrimaryText>
      </div>
    );
  }

  function userListComponent(){
    return (
      <div className={classes.userlistGrid}>
        { data.class &&
          data.class.map( d =>
            <div key={d.classno} className={classes.userlistChildGrid}>
              {userListTable(d)}
            </div>
          )
        }
      </div>
    );
  }

  function userListTable(data){

    return (
      <List disablePadding>
        <ListItem style={{ backgroundColor: data.color !== ''? COLOR[data.color][900] : COLOR.grey[900] }}>
          <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
            className={classes.listPlayerName} classes={{ primary: classes.listText }} primary="Player" />
          <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
            className={classes.listScore} classes={{ primary: classes.listText }} primary="OUT" />
          <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
            className={classes.listScore} classes={{ primary: classes.listText }} primary="IN" />
          <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
            className={classes.listScore} classes={{ primary: classes.listText }} primary="HC" />
          <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
            className={classes.listScore} classes={{ primary: classes.listText }} primary="SF" />
          {/*
            <ListItemText style={{ color: 'white' }} className={classes.listPrice} classes={{ primary: classes.listText }} primary="Price" />*/
          }
        </ListItem>
        { userscore &&
          userscore.filter( item =>{ return item.classno === data.classno }).slice(0, playerLimit.current).map( d =>
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
        { userscore &&
          <ListItem>
            <ListItemText classes={{ primary: classes.listText }} primary="Total" />
            <ListItemText className={classes.listTotal} classes={{ primary: classes.listText }}
              primary={userTotalScore(userscore.filter( item =>{ return item.classno === data.classno }).slice(0, playerLimit.current))} />
          </ListItem>
        }

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
      <GoBack />
      { data && userscore && playerLimitComponent() }
      { data && userListComponent() }
    </Paper>
  );
}
