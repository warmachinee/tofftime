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
    cursor: 'auto',
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
  const { sess, matchid, data, matchDetail, selected, handleSelectPlayer } = props
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ expanded, setExpanded ] = React.useState(true)

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
          { selected? selected.firstname + " " + selected.lastname : (
            ( sess && sess.language === 'EN' ) ? "Select Player" : 'เลือกผู้เล่น'
          )}
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
              placeholder={ !searchUser? ( ( sess && sess.language === 'EN' ) ? "Search Player" : 'ค้นหาผู้เล่น' ) : '' }
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
        <Typography component="div">
          <Box className={classes.notice} m={1}>
            { ( sess && sess.language === 'EN' ) ? "Please select player in the list." : 'เลือกผู้เล่นในลิสต์' }
          </Box>
        </Typography>
        <List>
          <ListItem style={{ backgroundColor:  grey[900] }}>
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={
                window.innerWidth < 450?
                ( ( sess && sess.language === 'EN' ) ? "Name" : 'ชื่อ' )
                :
                ( ( sess && sess.language === 'EN' ) ? "First name" : 'ชื่อ' )
              } />
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={ window.innerWidth < 450? "" : ( ( sess && sess.language === 'EN' ) ? "Last name" : 'นามสกุล' ) } />
            { window.innerWidth > 450 &&
              <ListItemText style={{ color: 'white', marginRight: 20 }} className={classes.listClass}
                primary={
                  matchDetail.scorematch === 1?
                  ( ( sess && sess.language === 'EN' ) ? "Class" : 'ประเภท' )
                  :
                  ( ( sess && sess.language === 'EN' ) ? "Flight" : 'ไฟล์ท' )
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
                                matchDetail.scorematch === 1 ?
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
                          { ( sess && sess.language === 'EN' ) ? "No class" : 'ไม่มีประเภท' }
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
                            matchDetail.scorematch === 1 ?
                            d.classname
                            :
                            String.fromCharCode(65 + value.classno - 1)
                          } />
                        )
                      )
                      :
                      <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass}
                        primary={ ( sess && sess.language === 'EN' ) ? "No class" : 'ไม่มีประเภท' } />
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
                    ( sess && sess.language === 'EN' ) ? "Collapse" : 'ย่อทั้งหมด'
                  ):(
                    ( sess && sess.language === 'EN' ) ? "More" : 'แสดง'
                  ) }
                </Button>
                { data && dataSliced < data.length &&
                  <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'EN' ) ? "More all" : 'แสดงทั้งหมด' }</Button>
                }
              </React.Fragment>
            }
            { data && handleSearch().length > 10 && searchUser &&
              <React.Fragment>
                <Button fullWidth onClick={handleMore}>
                  { dataSliced >= handleSearch().length ? (
                    ( sess && sess.language === 'EN' ) ? "Collapse" : 'ย่อทั้งหมด'
                  ):(
                    ( sess && sess.language === 'EN' ) ? "More" : 'แสดง'
                  ) }
                </Button>
                { data && dataSliced < handleSearch().length &&
                  <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'EN' ) ? "More all" : 'แสดงทั้งหมด' }</Button>
                }
              </React.Fragment>
            }
          </ListItem>
          { searchUser && handleSearch().length === 0 &&
            <ListItem>
              <Typography component="div" style={{ width: '100%' }}>
                <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                  { ( sess && sess.language === 'EN' ) ? "No Reult" : 'ไม่มีผลลัพท์' }
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
  const { sess, token, setCSRFToken, matchid, handleSnackBar } = props
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ selected, setSelected ] = React.useState(null)
  const [ oldSelected, setOldSelected ] = React.useState(null)
  const [ arrScore, setArrScore ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [ gridWidth, setGridWidth ] = React.useState(0)

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
    await setScore(value, index)
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
      const socket = socketIOClient( API.getWebURL() )
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
    const socket = socketIOClient( API.getWebURL() )
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

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
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
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
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
        selected={selected} handleSelectPlayer={handleSelectPlayer} />
      <ThemeProvider theme={theme}>
        <div style={{
            overflow: 'auto', marginTop: 24, marginBottom: 24,
            width: gridWidth
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
                min={0}
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
                min={0}
              />
            )}
          </div>
        </div>
      </ThemeProvider>
      <Typography component="div" style={{ display: 'flex' }}>
        <Box className={classes.text} m={1}>
          OUT = {API.handleHoleSum(arrScore, 'out')}
        </Box>
        <Box className={classes.text} m={1}>
          IN = {API.handleHoleSum(arrScore, 'in')}
        </Box>
        <div style={{ flex: 1 }} />
        <Box className={classes.textHighlight} m={1}>
          Total = {API.handleHoleSum(arrScore, 'out') + API.handleHoleSum(arrScore, 'in')}
        </Box>
      </Typography>
      <div className={classes.controls}>
        <Button disabled={selected === null} className={classes.button} onClick={handleReset}>
          { ( sess && sess.language === 'EN' ) ? "Reset" : 'รีเซ็ต' }
        </Button>
        { selected?
          <GreenButton
            disabled={selected === null}
            variant="contained" color="primary"
            className={classes.button} onClick={handleUpdateScore}>
            { ( sess && sess.language === 'EN' ) ? "Save" : 'บันทึก' }
          </GreenButton>
          :
          <Button
            disabled
            variant="contained" color="primary"
            className={classes.button} >{ ( sess && sess.language === 'EN' ) ? "Save" : 'บันทึก' }</Button>
        }
      </div>
    </div>
  );
}
