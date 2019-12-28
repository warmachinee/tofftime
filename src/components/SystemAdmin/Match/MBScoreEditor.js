import React from 'react';
import Fuse from 'fuse.js';
import socketIOClient from 'socket.io-client'
import { Link } from "react-router-dom";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red, green } from './../../../api/palette'
import { LDCircular } from './../../loading/LDCircular'

import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Collapse,
  Divider,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,

} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    marginTop: 24,
    maxHeight: '100%',
    boxSizing: 'border-box'
  },
  searchBoxGrid: {
    marginTop: 16,
    marginBottom: 8
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end' ,
    margin: theme.spacing(2, 0)
  },
  button: {
    padding: theme.spacing(1, 3)
  },
  indicator: {
    backgroundColor: primary[600],
    height: 4
  },
  scrollButtons: {
    color: primary[900],
    width: 50,
  },
  list: {
    marginTop: 36
  },
  listText:{
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '40%',
    textAlign: 'left',
    [theme.breakpoints.up(500)]: {
      width: '100%',
    },
  },
  listClass: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '15%',
    textAlign: 'left',
    [theme.breakpoints.up(500)]: {
      width: '30%',
    },
  },
  listStatus: {
    width: 100,
    justifyContent: 'center'
  },
  textfield: {
    margin: 8,
    minWidth: 64
  },
  textfieldGrid: {
    display: 'flex',
  },
  text: {
    color: primary[600],
  },
  textHighlight: {
    color: primary[900],
    fontWeight: 800
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  expandIcon: {
    marginRight: 8,
    marginLeft: 12
  },
  selectPlayerButton: {
    textTransform: 'none',
    padding: '8px 16px 8px 0',
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  scorcardLabel: {
    borderLeft: `6px solid ${primary[600]}`,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  scorcardPlayer: {
    marginTop: 16,
    marginLeft: 24
  },
  scorcardMainClass: {
    marginLeft: 24
  },
  saveButton: {
    marginTop: 'auto',
    marginLeft: 12
  },
  predictScoreChildGrid: {
    display: 'flex', width: 250
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}))

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[600],
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function MBScoreEditorContainer(props){
  const classes = useStyles();
  const { sess, matchid, data, matchDetail, selected, handleSelectPlayer, expanded, setExpanded, mainClassSelected, setMainClassSelected, isSetup } = props
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)

  function expandHandler(){
    setExpanded(!expanded)
  }

  function handleMore(){
    if(data){
      if(searchUser){
        if( dataSliced >= handleSearch().length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( dataSliced + 10 )
        }
      }else{
        if( dataSliced >= data.length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( dataSliced + 10 )
        }
      }
    }
  }

  function handleMoreAll(){
    if(data){
      if(searchUser){
        if( dataSliced >= handleSearch().length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( handleSearch().length )
        }
      }else{
        if( dataSliced >= data.length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( data.length )
        }
      }
    }
  }

  function handleListClick(value){
    handleSelectPlayer(value)
    setExpanded(false)
  }

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  function handleSearch(){
    if(data){
      var options = {
        shouldSort: true,
        caseSensitive: true,
        minMatchCharLength: 2,
        keys: [
          "firstname",
          "lastname",
          "classname",
          "classno"
        ]
      }
      var fuse = new Fuse(data, options)
      var result = fuse.search(searchUser)
      return result
    }
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return(
    <div id="mb-scoreeditor-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', marginBottom: 16 }}>
        <GreenTextButton
          disabled={!isSetup}
          className={classes.selectPlayerButton}
          variant="outlined"
          onClick={expandHandler}>
          <ExpandMoreIcon
            className={classes.expandIcon}
            style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }} />
          { API._getWord(sess && sess.language).Select_Player }
        </GreenTextButton>
        { selected &&
          <a href={`/display/${matchid}/${selected.userid}`}
            target='_blank'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <GreenTextButton variant="outlined">{ API._getWord(sess && sess.language).Personal_display }</GreenTextButton>
          </a>
        }
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.searchBox}>
          <ThemeProvider theme={theme}>
            <TextField
              disabled={data === null}
              autoFocus={API._isDesktopBrowser() && expanded}
              className={classes.searchBox}
              variant="outlined"
              placeholder={ !searchUser? ( API._getWord(sess && sess.language).Search_player ) : '' }
              value={searchUser}
              onChange={e =>setSearchUser(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary"/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    { searchUser?
                      <IconButton onClick={()=>setSearchUser('')}>
                        <ClearIcon color="inherit" fontSize="small"/>
                      </IconButton>
                      :
                      <div style={{ width: 44 }}></div>
                    }
                  </InputAdornment>
                )
              }}
            />
          </ThemeProvider>
        </div>
        <Typography component="div" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box className={classes.notice} m={1}>
            { API._getWord(sess && sess.language)['Please select player in the list.'] }
          </Box>
          { data &&
            <React.Fragment>
              <Typography variant="body1" align="right"
                style={{ marginBottom: 8, marginTop: 'auto', marginRight: 8 }}>
                { ( sess && sess.language === 'TH' ) ?
                  `ผู้เล่น ${data.length} คน`
                  :
                  `${data.length} player${data.length > 1? 's' : ''}`
                }
              </Typography>
              </React.Fragment>
          }
        </Typography>
        <List>
          <ListItem style={{ backgroundColor:  grey[900] }}>
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={
                window.innerWidth < 450?
                ( API._getWord(sess && sess.language).Full_name )
                :
                ( API._getWord(sess && sess.language).First_name )
              } />
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={ window.innerWidth < 450? "" : ( API._getWord(sess && sess.language).Last_name ) } />
            <ListItemText style={{ color: 'white' }} className={classes.listStatus}
              primary={ API._getWord(sess && sess.language).Status } />
          </ListItem>
        </List>
        <List style={{ overflow: 'auto', maxHeight: window.innerHeight * .4 }}>
          { data && !data.status && matchDetail ?
            [
              ...searchUser? handleSearch() : data
            ].slice(0, dataSliced).map( value =>
              value &&
              <React.Fragment key={value.userid}>
                <ListItem
                  button
                  style={{ ...(selected && selected.userid === value.userid) && { backgroundColor:  grey[400] } }}
                  onClick={()=>handleListClick(value)}>
                  <ListItemText className={classes.listText}
                    primary={
                      ( window.innerWidth < 450 )?
                      <div style={{ display: 'flex' }}>
                        { value.firstname }<div style={{ width: 20 }}></div>{ value.lastname }
                      </div>
                      : value.firstname
                    } />
                  { window.innerWidth > 450 &&
                    <ListItemText className={classes.listText}
                      primary={value.lastname} />
                  }
                  <ListItemText className={classes.listStatus}
                    primary={
                      value.score &&
                      value.score.some(s => s === 0) ?
                      <div style={{ width: 24 }} />
                      :
                      <DoneIcon style={{ color: green[600] }} />
                    } />
                </ListItem>
                <Divider />
              </React.Fragment>
            )
            :
            <LDCircular />
          }
        </List>
        { data && !data.status && matchDetail &&
          <List disablePadding>
            <ListItem role={undefined} dense style={{ display: 'flex' }}>
              { data && data.length > 10 && !searchUser &&
                <React.Fragment>
                  <Button fullWidth onClick={handleMore}>
                    { dataSliced >= data.length ? (
                      API._getWord(sess && sess.language).Collapse
                    ):(
                      API._getWord(sess && sess.language).More
                    ) }
                  </Button>
                  { data && dataSliced < data.length &&
                    <Button fullWidth onClick={handleMoreAll}>{ API._getWord(sess && sess.language).Show_all }</Button>
                  }
                </React.Fragment>
              }
              { data && handleSearch().length > 10 && searchUser &&
                <React.Fragment>
                  <Button fullWidth onClick={handleMore}>
                    { dataSliced >= handleSearch().length ? (
                      API._getWord(sess && sess.language).Collapse
                    ):(
                      API._getWord(sess && sess.language).More
                    ) }
                  </Button>
                  { data && dataSliced < handleSearch().length &&
                    <Button fullWidth onClick={handleMoreAll}>
                      { API._getWord(sess && sess.language).Show_all }
                    </Button>
                  }
                </React.Fragment>
              }
            </ListItem>
            { searchUser && handleSearch().length === 0 &&
              <ListItem>
                <Typography component="div" style={{ width: '100%' }}>
                  <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                    { API._getWord(sess && sess.language).No_Result }
                  </Box>
                </Typography>
              </ListItem>
            }
          </List>
        }
      </Collapse>
    </div>
  );
}

export default function MBScoreEditor(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar, pageOrganizer, pageData, isSetup, isAvailableEditing } = props
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ selected, setSelected ] = React.useState(null)
  const [ oldSelected, setOldSelected ] = React.useState(null)
  const [ arrScore, setArrScore ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [ gridWidth, setGridWidth ] = React.useState(0)
  const [ expanded, setExpanded ] = React.useState(isSetup)
  const [ predictScore, setPredictScore ] = React.useState(selected ? selected.predictscore : 0)
  const [ mainClassSelected, setMainClassSelected ] = React.useState('1')

  function handleSetPredictScore(score){
    if(parseInt(score) < 0){
      handleSnackBar({
        state: true,
        message: 'Score must more than 0',
        variant: 'error',
        autoHideDuration: 5000
      })
      setPredictScore(0)
    }else{
      setPredictScore(parseInt(score))
    }
  }

  function handleKeyPressSetPredictScore(e){
    if(e.key === 'Enter'){
      handleFetchSetPredict()
    }
  }

  async function handleFetchSetPredict(){
    if(selected){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mmatchsection', {
          action: 'setpredictscore',
          matchid: matchid,
          userid: selected.userid,
          value: predictScore
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ?'success':'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      })
    }
  }

  async function handleSelectPlayer(newVal){
    if(selected && oldSelected){
      scoreDisplayStatus(newVal, selected)
      //setOldSelected(selected)
      setSelected(newVal)
    }else{
      handleScoreDisplay(newVal, newVal, newVal.score)
      setSelected(newVal)
      setOldSelected(newVal)
    }
  }

  async function handleChange(value, index){
    if(value < 0){
      handleSnackBar({
        state: true,
        message: 'Score must more than 0',
        variant: 'error',
        autoHideDuration: 5000
      })
      await setScore(0, index)
    }else{
      await setScore(value, index)
    }
  }

  function handleFocus(e){
    e.target.select()
  }

  function setScore(value, index){
    return new Promise(resolve => {
      const tempArr = [...arrScore]
      if(value === ''){
        tempArr[index] = parseInt(0)
      }else{
        tempArr[index] = parseInt(value)
      }
      setArrScore(tempArr)
      console.log('Update score');
      handleScoreDisplay(selected, oldSelected, tempArr)
      resolve();
    });
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleFetchUpdateScore()
    }
  }

  function handleScoreDisplay(current, old, score){
    return new Promise(resolve => {
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('player-show-client-message', {
        action: "showplayerscore",
        matchid: matchid,
        ...( !(current.userid === old.userid) && {myid: sess.userid} ),
        userid: old.userid,
        newuserid: current.userid,
        holescore: score,
      })
      resolve();
    });
  }

  function scoreDisplayStatus(current, old){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`${matchid}-${sess.userid}-input-server-message`, (messageNew) => {
      if(messageNew){
        console.log('Response ', {
          currentResponse: messageNew.currentid,
          currentInput: current.userid,
          oldResponse: messageNew.oldid,
          oldInput: old.userid
        });
        setOldSelected({
          userid: messageNew.currentid
        })
        /*
        handleScoreDisplay(current, {
          userid: messageNew.oldid
        }, current.score)*/
      }else{
        handleSnackBar({
          state: true,
          message: 'Some thing wrong !!!',
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    })
  }

  function handleUpdateScore(){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.emit('admin-match-client-message', {
      action: "showmatchscore",
      matchid: matchid,
      userid: selected.userid,
      mainclass: parseInt(mainClassSelected)
    })
  }

  async function handleFetchUpdateScore(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
        action: 'updatescore',
        matchid: matchid,
        userid: selected.userid,
        userscore: arrScore,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleUpdateScore()
      }
    })
  }

  function handleReset(){
    setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    setSelected(null)
    setExpanded(true)
  }

  function responseUpdateScore(){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`admin-match-status-${matchid}-server-message`, (messageNew) => {
      const d = messageNew.status
      if(!/playoff/.test(d)){
        if(!/fail/.test(d)){
          setSelected(null)
          setExpanded(true)
          handleSnackBar({
            state: true,
            message: `Update ${d.fullname} ${d.lastname} complete. OUT = ${d.sout}, IN = ${d.sin}, Total = ${d.gross}`,
            variant: 'success',
            autoHideDuration: 200
          })
        }else{
          handleSnackBar({
            state: true,
            message: 'Update score fail',
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      }
    })
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'userlist',
          matchid: matchid,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d.userscore)
          try {
            handleFetchMatchDetail()
          }catch(err) { console.log(err.message) }
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  async function handleFetchMatchDetail(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'class database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setMatchDetail(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  React.useEffect(()=>{
    responseUpdateScore()
  },[ ])

  React.useEffect(()=>{
    handleFetch()
    if(selected){
      setArrScore(selected.score)
    }else{
      setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    }
  },[ selected, mainClassSelected ])

  React.useEffect(()=>{
    var eleRef = document.getElementById('mb-scoreeditor-container')
    if(eleRef){
      setGridWidth(eleRef.offsetWidth)
    }

  },[ document.getElementById('mb-scoreeditor-container'), window.innerWidth ])

  return(
    <div className={classes.root}>
      { !isSetup && isAvailableEditing &&
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <Typography variant="h6" style={{ color: red[600], fontWeight: 600 }}>
            { API._getWord(sess && sess.language)['Please complete the Setup step.'] }
          </Typography>
          <BTN.NoStyleLink
            to={
              sess.typeid === 'admin' ?
              `/system_admin/match/${matchid}` :
              `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${matchid}`
              }>
            <BTN.RedOutlined style={{ fontWeight: 600, marginLeft: 16 }}>
              { API._getWord(sess && sess.language).Back }
            </BTN.RedOutlined>
          </BTN.NoStyleLink>
        </div>
      }
      { isAvailableEditing &&
        <MBScoreEditorContainer
          {...props}
          data={data}
          matchDetail={matchDetail}
          selected={selected}
          handleSelectPlayer={handleSelectPlayer}
          expanded={expanded}
          setExpanded={setExpanded}
          mainClassSelected={mainClassSelected}
          setMainClassSelected={setMainClassSelected} />
      }
      { isAvailableEditing ?
        ( selected !== null &&
          <React.Fragment>
            <ThemeProvider theme={theme}>
              <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant="h5" className={classes.scorcardLabel}>
                  {`${ API._getWord(sess && sess.language).Scorecard_MBSE } ${selected ? ` | ${selected.firstname} ${selected.lastname}` : ''}`}
                </Typography>
              </div>
              <div style={{
                  overflow: 'auto', marginTop: 24, marginBottom: 24,
                  width: gridWidth,
                }}>
                <div className={classes.textfieldGrid}>
                  {tempArr.slice(0, 9).map( d =>
                    <TextField
                      disabled={selected === null}
                      key={d}
                      className={classes.textfield}
                      label={d + 1}
                      value={arrScore[d] || ''}
                      onChange={e =>handleChange(e.target.value, d)}
                      onFocus={e => handleFocus(e)}
                      onKeyPress={e =>handleKeyPress(e)}
                      variant="outlined"
                      type="number"
                    />
                  )}
                </div>
                <div className={classes.textfieldGrid}>
                  {tempArr.slice(9, 18).map( d =>
                    <TextField
                      disabled={selected === null}
                      key={d}
                      className={classes.textfield}
                      label={d + 1}
                      value={arrScore[d] || ''}
                      onChange={e =>handleChange(e.target.value, d)}
                      onFocus={e => handleFocus(e)}
                      onKeyPress={e =>handleKeyPress(e)}
                      variant="outlined"
                      type="number"
                    />
                  )}
                </div>
              </div>
            </ThemeProvider>
            <Typography component="div" style={{ display: 'flex' }}>
              <Box className={classes.text} m={1}>
                OUT = {API._handleHoleSum(arrScore, 'out')}
              </Box>
              <Box className={classes.text} m={1}>
                IN = {API._handleHoleSum(arrScore, 'in')}
              </Box>
              <div style={{ flex: 1 }} />
              <Box className={classes.textHighlight} m={1}>
                Total = {API._handleHoleSum(arrScore, 'out') + API._handleHoleSum(arrScore, 'in')}
              </Box>
            </Typography>
            <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
            { matchDetail && matchDetail.scorematch === 2 && selected &&
              <ThemeProvider theme={theme}>
                <div className={classes.predictScoreChildGrid}>
                  <TextField label={ API._getWord(sess && sess.language).Predict_Score }
                    type="number"
                    value={predictScore}
                    onChange={e =>handleSetPredictScore(e.target.value)}
                    onKeyPress={e =>handleKeyPressSetPredictScore(e)}
                    onFocus={e => e.target.select()} />
                  <BTN.Primary className={classes.saveButton}
                    onClick={handleFetchSetPredict}>Save</BTN.Primary>
                </div>
              </ThemeProvider>
            }
            <div className={classes.controls}>
              <Button disabled={selected === null} className={classes.button} onClick={handleReset}>
                { API._getWord(sess && sess.language).Reset }
              </Button>
              <GreenButton
                disabled={selected === null || arrScore.some(s => s === 0)}
                variant="contained" color="primary"
                className={classes.button} onClick={handleFetchUpdateScore}>
                { API._getWord(sess && sess.language).Save }
              </GreenButton>
            </div>
          </React.Fragment>
        )
        :
        <div>
          <ThemeProvider theme={theme}>
            <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Typography variant="h5" className={classes.scorcardLabel}>
                { API._getWord(sess && sess.language).Scorecard_MBSE }
              </Typography>
            </div>
            <div style={{
                overflow: 'hidden', marginTop: 24, marginBottom: 24,
                width: '100%',
              }}>
              <div className={classes.textfieldGrid}>
                {tempArr.slice(0, 9).map( d =>
                  <TextField
                    disabled
                    key={d}
                    className={classes.textfield}
                    label={d + 1}
                    value={arrScore[d] || ''}
                    onChange={e =>handleChange(e.target.value, d)}
                    onFocus={e => handleFocus(e)}
                    onKeyPress={e =>handleKeyPress(e)}
                    variant="outlined"
                    type="number"
                  />
                )}
              </div>
              <div className={classes.textfieldGrid}>
                {tempArr.slice(9, 18).map( d =>
                  <TextField
                    disabled
                    key={d}
                    className={classes.textfield}
                    label={d + 1}
                    value={arrScore[d] || ''}
                    onChange={e =>handleChange(e.target.value, d)}
                    onFocus={e => handleFocus(e)}
                    onKeyPress={e =>handleKeyPress(e)}
                    variant="outlined"
                    type="number"
                  />
                )}
              </div>
            </div>
          </ThemeProvider>
          <Typography component="div" style={{ display: 'flex' }}>
            <Box className={classes.text} m={1}>
              OUT
            </Box>
            <Box className={classes.text} m={1}>
              IN
            </Box>
            <div style={{ flex: 1 }} />
            <Box className={classes.textHighlight} m={1}>
              Total
            </Box>
          </Typography>
          <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
        </div>
      }
    </div>
  );
}
