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
  Menu,
  MenuItem,
  InputLabel,
  Select,

} from '@material-ui/core';

import {
  ArrowBack,
} from '@material-ui/icons';

import { LDCircular } from './../loading/LDCircular'

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Utils/GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
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
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listRank: {
    width: 64,
    textAlign: 'right',
    marginRight: 16
  },
  listPlayerName: {
    width: '100%',
  },
  listScoreGross: {
    width: 75,
    textAlign: 'right'
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
  listTextClass: {
    fontSize: 20,
    fontWeight: 600
  },
  listTextTotal: {
    fontSize: 24,
    fontWeight: 600
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  const [ editing, setEditing ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ userscore, setUserscore ] = React.useState(null)
  const [ mainClassSelected, setMainClassSelected ] = React.useState('1')

  function handlePlayerLimitCal(data){
    const arrLength = []
    const userscore = data.userscore
    if(data.mainclass[parseInt(mainClassSelected) - 1].values){
      data.mainclass[parseInt(mainClassSelected) - 1].values.forEach( e =>{
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

  function handleKeyPressSetLimit(e){
    if(e.key === 'Enter'){
      setEditing(false)
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid),
        mainclass: parseInt(mainClassSelected)
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
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`admin-match-${matchid}-server-message`, (messageNew) => {
      if(messageNew && /success/.test(messageNew.status)){
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
  },[ ])

  React.useEffect(()=>{
    handleFetch()
  },[ mainClassSelected ])

  function playerLimitComponent(){

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ margin: '12px auto', display: 'flex' }}>
          <ThemeProvider theme={theme}>
            { editing ?
              <div className={classes.playerLimitChildGrid}>
                <TextField label="Player Limit"
                  autoFocus={API._isDesktopBrowser()}
                  value={!isNaN(playerLimit.current) ? playerLimit.current : ''}
                  type="number"
                  onChange={e =>handlePlayerLimit(e.target.value)}
                  onFocus={e => e.target.select()}
                  onKeyPress={e =>handleKeyPressSetLimit(e)} />
              </div>
              :
              <div className={classes.playerLimitChildGrid}>
                <Typography className={classes.playerLimitLabel}>
                  { API._getWord(sess && sess.language).Limitation_player }
                </Typography>
                <Typography style={{ padding: '6px 8px', marginLeft: 12 }}>{playerLimit.current}</Typography>
              </div>
            }
          </ThemeProvider>
          <BTN.PrimaryText style={{ marginLeft: 24 }} onClick={()=>setEditing(!editing)}>
            { API._getWord(sess && sess.language)[editing ? 'Done' : 'Edit'] }
          </BTN.PrimaryText>
        </div>
        <div style={{ flex: 1 }} />
        { data && data.scorematch !== 0 &&
          <FormControl className={classes.formControl}>
            <InputLabel>{ API._getWord(sess && sess.language).Main_group }</InputLabel>
            <Select
              value={mainClassSelected}
              onChange={e => setMainClassSelected(e.target.value)}>
              { data &&
                data.mainclass.map( (d, i) =>
                  <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                    {d.mainclassname} ({d.type})
                  </MenuItem>
              )}
            </Select>
          </FormControl>
        }
      </div>
    );
  }

  function userListComponent(){
    return (
      <div className={classes.userlistGrid}>
        { data.mainclass[parseInt(mainClassSelected) - 1].values &&
          data.mainclass[parseInt(mainClassSelected) - 1].values.map( d =>
            <div key={d.classno} className={classes.userlistChildGrid}>
              {userListTable(d, d.classname)}
            </div>
          )
        }
      </div>
    );
  }

  function userListTable(data, classTitle){

    return (
      <React.Fragment>
        <List disablePadding>
          <ListItem style={{ border: `2px solid ${data.color !== ''? COLOR[data.color][900] : COLOR.grey[900]}` }}>
            <ListItemText
              classes={{ primary: classes.listTextClass }}
              style={{ color: data.color !== ''? COLOR[data.color][900] : 'black', textAlign: 'center' }}
              primary={classTitle} />
          </ListItem>
          <ListItem style={{ backgroundColor: data.color !== ''? COLOR[data.color][900] : COLOR.grey[900] }}>
            <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
              className={classes.listRank} classes={{ primary: classes.listText }} primary="Rank" />
            <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
              className={classes.listPlayerName} classes={{ primary: classes.listText }} primary="Player" />
            { /*
              <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
                className={classes.listScore} classes={{ primary: classes.listText }} primary="OUT" />
              <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
                className={classes.listScore} classes={{ primary: classes.listText }} primary="IN" />*/
            }
            <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
              className={classes.listScoreGross} classes={{ primary: classes.listText }} primary="TOT" />
            <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
              className={classes.listScore} classes={{ primary: classes.listText }} primary="HC" />
            <ListItemText style={{ color: data.color !== ''? stylesTheme.palette.getContrastText(COLOR[data.color][600]) : 'white' }}
              className={classes.listScore} classes={{ primary: classes.listText }} primary="SF" />
            {/*
              <ListItemText style={{ color: 'white' }} className={classes.listPrice} classes={{ primary: classes.listText }} primary="Price" />*/
            }
          </ListItem>
        </List>
        <List disablePadding style={{ border: '1px solid rgba(0, 0, 0, 0.12)'}}>
          { userscore &&
            userscore.filter( item =>{ return item.classno === data.classno }).slice(0, playerLimit.current).map((d, index) =>
            <React.Fragment key={d.userid}>
              <ListItem className={classes.listPlayer}>
                <ListItemText className={classes.listRank} classes={{ primary: classes.listText }} primary={index + 1} />
                <ListItemText className={classes.listPlayerName} style={{ display: 'flex', flexDirection: 'column' }} classes={{ primary: classes.listText }}
                  primary={<Typography variant="subtitle1">{d.firstname}&nbsp;&nbsp;{d.lastname}</Typography>}
                  secondary={<Typography variant="caption" color="textSecondary">{`OUT = ${d.out}, IN = ${d.in}`}</Typography>} />
                {/*
                  <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.out} />
                  <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.in} />*/
                }
                <ListItemText className={classes.listScoreGross} classes={{ primary: classes.listText }} primary={d.out + d.in} />
                <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.hc} />
                <ListItemText className={classes.listScore} classes={{ primary: classes.listText }} primary={d.sf}/>
              </ListItem>
              <Divider />
            </React.Fragment>
          )}
        </List>
        <List disablePadding>
          { userscore &&
            <ListItem style={{ border: `2px solid ${data.color !== ''? COLOR[data.color][900] : COLOR.grey[900]}` }}>
              <ListItemText
                classes={{ primary: classes.listTextTotal }}
                style={{ color: data.color !== ''? COLOR[data.color][900] : 'black', }}
                primary="Total" />
              <ListItemText className={classes.listTotal} classes={{ primary: classes.listTextTotal }}
                style={{ color: data.color !== ''? COLOR[data.color][900] : 'black', }}
                primary={userTotalScore(userscore.filter( item =>{ return item.classno === data.classno }).slice(0, playerLimit.current))} />
            </ListItem>
          }
        </List>
      </React.Fragment>
    );
  }

  const [ ,updateState ] = React.useState(null)

  return (
    <Paper className={classes.root}>
      <GoBack />
      { data && userscore && playerLimitComponent() }
      { data && userListComponent() }
    </Paper>
  );
}
