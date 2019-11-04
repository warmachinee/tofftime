import React from 'react';
import Fuse from 'fuse.js';
import socketIOClient from 'socket.io-client'
import { Link } from "react-router-dom";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  saveButton: {
    marginTop: 'auto',
    marginLeft: 12
  },
  predictScoreChildGrid: {
    display: 'flex', width: 250
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
  const { sess, matchid, data, matchDetail, selected, handleSelectPlayer, expanded, setExpanded } = props
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
          className={classes.selectPlayerButton}
          variant="outlined"
          onClick={expandHandler}>
          <ExpandMoreIcon
            className={classes.expandIcon}
            style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }} />
          { ( sess && sess.language === 'TH' ) ? "เลือกผู้เล่น" : 'Select Player' }
        </GreenTextButton>
        { selected &&
          <a href={`/display/${matchid}/${selected.userid}`}
            target='_blank'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <GreenTextButton>Match Display</GreenTextButton>
          </a>
        }
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.searchBox}>
          <ThemeProvider theme={theme}>
            <TextField
              disabled={data === null}
              autoFocus={expanded}
              className={classes.searchBox}
              variant="outlined"
              placeholder={ !searchUser? ( ( sess && sess.language === 'TH' ) ? "ค้นหาผู้เล่น" : 'Search Player' ) : '' }
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
            { ( sess && sess.language === 'TH' ) ? "เลือกผู้เล่นในลิสต์" : 'Please select player in the list.' }
          </Box>
          { data &&
            <Typography variant="caption" align="right" style={{ marginTop: 'auto', marginBottom: 8 }}>{`${data.length} player${data.length > 1? 's' : ''}`}</Typography>
          }
        </Typography>
        <List>
          <ListItem style={{ backgroundColor:  grey[900] }}>
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={
                window.innerWidth < 450?
                ( ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'Full Name' )
                :
                ( ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'First name' )
              } />
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={ window.innerWidth < 450? "" : ( ( sess && sess.language === 'TH' ) ? "นามสกุล" : 'Last name' ) } />
            { window.innerWidth > 450 &&
              <ListItemText style={{ color: 'white', marginRight: 20 }} className={classes.listClass}
                primary={
                  function(){
                    switch (matchDetail.scorematch) {
                      case 0:
                        return ( sess && sess.language === 'TH' ) ? "ไฟล์ท" : 'Flight'
                        break;
                      case 1:
                        return ( sess && sess.language === 'TH' ) ? "ประเภท" : 'Class'
                        break;
                      default:
                        return ( sess && sess.language === 'TH' ) ? "ทีม" : 'Team'
                    }
                  }()
                } />
            }

          </ListItem>
        </List>
        <List style={{ overflow: 'auto', maxHeight: window.innerHeight * .4 }}>
          { data && !data.status && matchDetail &&
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
                    }
                    secondary={
                      matchDetail && matchDetail.class && window.innerWidth < 450 &&
                      ( matchDetail.class.length > 0 ?
                        ( value.classno === 0 ?
                          <React.Fragment>
                            <br></br>
                            {"-"}
                          </React.Fragment>
                          :
                          matchDetail.class.filter( d =>{
                            return d.classno === value.classno
                          }).map((d, i) =>
                            d &&
                            <React.Fragment key={i}>
                              <br></br>
                              {
                                matchDetail.scorematch !== 0 ?
                                d.classname
                                :
                                String.fromCharCode(65 + value.classno - 1)
                              }
                            </React.Fragment>
                          )
                        )
                        :
                        <React.Fragment>
                          <br></br>
                          { ( sess && sess.language === 'TH' ) ? "ไม่มีประเภท" : 'No class' }
                        </React.Fragment>
                      )
                    } />
                  { window.innerWidth > 450 &&
                    <ListItemText className={classes.listText}
                      primary={value.lastname} />
                  }
                  { matchDetail && matchDetail.class && window.innerWidth > 450 &&
                    ( matchDetail.class.length > 0 ?
                      ( value.classno === 0 ?
                        <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass} primary={"-"} />
                        :
                        matchDetail.class.filter( d =>{
                          return d.classno === value.classno
                        }).map( d =>
                          d &&
                          <ListItemText key={d.classname + `(${value.userid})`} style={{ justifyContent: 'center' }} className={classes.listClass} primary={
                            matchDetail.scorematch !== 0 ?
                            d.classname
                            :
                            String.fromCharCode(65 + value.classno - 1)
                          } />
                        )
                      )
                      :
                      <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass}
                        primary={ ( sess && sess.language === 'TH' ) ? "ไม่มีประเภท" : 'No class' } />
                    )
                  }
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          }
          <ListItem role={undefined} dense style={{ display: 'flex' }}>
            { data && data.length > 10 && !searchUser &&
              <React.Fragment>
                <Button fullWidth onClick={handleMore}>
                  { dataSliced >= data.length ? (
                    ( sess && sess.language === 'TH' ) ? "ย่อทั้งหมด" : 'Collapse'
                  ):(
                    ( sess && sess.language === 'TH' ) ? "แสดง" : 'More'
                  ) }
                </Button>
                { data && dataSliced < data.length &&
                  <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'TH' ) ? "แสดงทั้งหมด" : 'More all' }</Button>
                }
              </React.Fragment>
            }
            { data && handleSearch().length > 10 && searchUser &&
              <React.Fragment>
                <Button fullWidth onClick={handleMore}>
                  { dataSliced >= handleSearch().length ? (
                    ( sess && sess.language === 'TH' ) ? "ย่อทั้งหมด" : 'Collapse'
                  ):(
                    ( sess && sess.language === 'TH' ) ? "แสดง" : 'More'
                  ) }
                </Button>
                { data && dataSliced < handleSearch().length &&
                  <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'TH' ) ? "แสดงทั้งหมด" : 'More all' }</Button>
                }
              </React.Fragment>
            }
          </ListItem>
          { searchUser && handleSearch().length === 0 &&
            <ListItem>
              <Typography component="div" style={{ width: '100%' }}>
                <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                  { ( sess && sess.language === 'TH' ) ? "ไม่มีผลลัพท์" : 'No Result' }
                </Box>
              </Typography>
            </ListItem>
          }
        </List>
      </Collapse>
    </div>
  );
}

export default function MBScoreEditor(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar } = props
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ selected, setSelected ] = React.useState(null)
  const [ oldSelected, setOldSelected ] = React.useState(null)
  const [ arrScore, setArrScore ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [ gridWidth, setGridWidth ] = React.useState(0)
  const [ expanded, setExpanded ] = React.useState(true)
  const [ predictScore, setPredictScore ] = React.useState(0)

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
      setOldSelected(selected)
      setSelected(newVal)
    }else{
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
    //handleScoreDisplay()
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
      resolve();
    });
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleUpdateScore()
    }
  }

  function handleScoreDisplay(newVal){
    return new Promise(resolve => {
      const socket = socketIOClient( API._getWebURL() )
      socket.emit('player-show-client-message', {
        action: "showplayerscore",
        matchid: matchid,
        userid: oldSelected.userid,
        newuserid: selected.userid,
        holescore: arrScore,
      })
      resolve();
    });
  }

  React.useEffect(()=>{
    if(oldSelected && selected){
      handleScoreDisplay()
    }
  }, [ arrScore, oldSelected, selected ])

  function handleUpdateScore(){
    const socket = socketIOClient( API._getWebURL() )
    socket.emit('admin-match-client-message', {
      action: "scorebysystemadmin",
      matchid: matchid,
      userid: selected.userid,
      userscore: arrScore,
    })
  }

  function handleReset(){
    setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    setSelected(null)
  }

  function responseUpdateScore(){
    const socket = socketIOClient( API._getWebURL() )
    socket.on(`admin-match-status-${matchid}-server-message`, (messageNew) => {
      const d = messageNew.status
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
    })
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'userlist',
          matchid: matchid
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
  },[ selected ])

  React.useEffect(()=>{
    var eleRef = document.getElementById('mb-scoreeditor-container')
    if(eleRef){
      setGridWidth(eleRef.offsetWidth)
    }

  },[ document.getElementById('mb-scoreeditor-container') ])

  return(
    <div className={classes.root}>
      <MBScoreEditorContainer {...props} data={data} matchDetail={matchDetail}
        selected={selected} handleSelectPlayer={handleSelectPlayer} expanded={expanded} setExpanded={setExpanded} />
      <ThemeProvider theme={theme}>
        <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Typography variant="h5" className={classes.scorcardLabel}>Score card</Typography>
          <Typography variant="body1" className={classes.scorcardPlayer}>{selected && ( selected.firstname + " " + selected.lastname )} </Typography>
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
                value={arrScore[d] || 0}
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
                value={arrScore[d] || 0}
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
      { matchDetail && matchDetail.scorematch === 2 &&
        <ThemeProvider theme={theme}>
          <div className={classes.predictScoreChildGrid}>
            <TextField label="Predict Score"
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
          { ( sess && sess.language === 'TH' ) ? "รีเซ็ต" : 'Reset' }
        </Button>
        { selected?
          <GreenButton
            disabled={selected === null}
            variant="contained" color="primary"
            className={classes.button} onClick={handleUpdateScore}>
            { ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save' }
          </GreenButton>
          :
          <Button
            disabled
            variant="contained" color="primary"
            className={classes.button} >{ ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save' }</Button>
        }
      </div>
    </div>
  );
}
