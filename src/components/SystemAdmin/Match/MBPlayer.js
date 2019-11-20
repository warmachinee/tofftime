import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import Fuse from 'fuse.js';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  Paper,
  Collapse,
  IconButton,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  TextField,
  InputAdornment,
  Slide,
  Divider,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,

} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassIcon from '@material-ui/icons/Class';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
  loading: () => <LDCircular />
});

const AddPlayerModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddPlayerModal" */'./AddPlayerModal'),
  loading: () => <LDCircular />
});

const EditDisplayModal= Loadable({
  loader: () => import(/* webpackChunkName: "EditDisplayModal" */'./EditDisplayModal'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    boxSizing: 'border-box'
  },
  listRoot: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    overflow: 'auto',
    boxSizing: 'border-box'
  },
  listText:{
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'left'
  },
  listClass: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '30%',
    textAlign: 'left',
  },
  margin: {
    margin: theme.spacing(1),
  },
  controls: {
    position: 'relative',
    cursor: 'auto',
    display: 'block',
    [theme.breakpoints.up(700)]: {
      display: 'flex',
    },
  },
  addPlayerButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },
  controlsEdit: {
    marginTop: 16,
    borderRadius: 4,
    border: `2px solid ${primary[600]}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    [theme.breakpoints.up(500)]: {
      marginTop: 16,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    [theme.breakpoints.up(700)]: {
      marginTop: 0,
      width: 'auto',
      display: 'block',
    },
  },
  controlsEditButton: {
    marginTop: 'auto',
    [theme.breakpoints.up(500)]: {
      padding: '8px 16px',
    },
  },
  controlsEditButton2: {
    marginTop: 2,
    marginBottom: 2,
    [theme.breakpoints.up(500)]: {
      padding: '8px 36px',
    },
  },
  controlsEditButtonIcon: {
    position: 'absolute',
    [theme.breakpoints.up(500)]: {
      position: 'relative',
      marginRight: 8,
    },
  },
  controlsSecondary: {
    cursor: 'auto',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0
  },
  selectedClassText: {
    color: '#3f51b5',
    fontWeight: 600,
    paddingLeft: 12,
    paddingBottom: 8,
    marginTop: 'auto'
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(600)]: {
      width: 'auto'
    },
  },
  arrowUpward: {
    color: 'white',
  },
  deleteIcon: {
    color: primary[600]
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}))

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[500],
    '&:hover': {
      backgroundColor: primary[700],
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

const GreenCheckbox = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function MBPlayer(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar, } = props
  const [ editting, setEditting ] = React.useState(false);
  const [ edittingClass, setEdittingClass ] = React.useState(false);
  const [ edittingDisplay, setEdittingDisplay ] = React.useState(false);
  const [ open, setOpen ] = React.useState(false);
  const [ displayModal, setDisplayModal ] = React.useState(false);
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ checked, setChecked ] = React.useState([]);
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ selectedClass, setSelectedClass ] = React.useState(0)
  const [ selectedPlayer, setSelectedPlayer ] = React.useState(null);
  const [ mainClassSelected, setMainClassSelected ] = React.useState('1')

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
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

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  function handleDisplayModalOpen(){
    setDisplayModal(true);
  };

  function handleDisplayModalClose(){
    setDisplayModal(false);
  };

  function handleToggle(value){
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function handleEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)

    setChecked([])
  }

  function handleDoneEditting(){
    setEditting(!editting)
    setChecked([])
  }

  function handleDoneEdittingClass(){
    setEdittingClass(!edittingClass)
    setChecked([])
  }

  function handleDoneEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)
  }

  function handleSave(){
    let userid = []
    let classno = []
    for(var i = 0;i < checked.length;i++){
      userid.push(checked[i].userid)
      classno.push(selectedClass)
    }
    handleSetClass(userid, classno)
  }

  function handleSelectedClass(d){
    if( d === 0 ){
      setSelectedClass(0)
    }else{
      setSelectedClass(d.classno)
    }
    handleMenuClose()
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

  function handleSelectedPlayer(d){
    setSelectedPlayer(d)
    handleDisplayModalOpen()
  }

  async function handleUpdateFlight(flightaction){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'flight',
          flightaction: flightaction,
          matchid: matchid,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setTimeout(()=>{ handleFetchDefault() }, 500)
      })
    }
  }

  async function handleSetClass(userid, classno){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'setclass',
          matchid: matchid,
          userid: userid,
          classno: classno,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setChecked([])
        try {
          setTimeout(()=>{ handleFetchDefault() }, 500)
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleRemovePlayer(d){
    let userid = []
    if( typeof(d.userid) === 'number' ){
      userid.push(d.userid)
    }else{
      for(var i = 0;i < checked.length;i++){
        userid.push(checked[i].userid)
      }
    }
    if(sess.typeid === 'admin' && matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'remove',
          matchid: matchid,
          userid: userid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'remove member success' ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setChecked([])
        try {
          setTimeout(()=>{ handleFetchDefault() }, 500)
        }catch(err) { console.log(err.message) }
      })
    }else{
      const socket = socketIOClient( API._getWebURL() )
      socket.emit('match-request-client-message', {
        action: "confirm",
        matchid: matchid,
        userid: [ sess.userid, userid],
        confirmaction: 'reject',
      })
      setChecked([])
      try {
        setTimeout(()=>{ handleFetchDefault() }, 500)
      }catch(err) { console.log(err.message) }
    }
  }

  async function handleFetch(mainclass, defaultPlayer, matchDetail){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'userlist',
          matchid: matchid,
          mainclass: mainclass
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          if(!/wrong matchid or mainclass/.test(d.status)){
            var normalData
            if(!/no/.test(d.userscore.status)){
              normalData = d.userscore
            }else{
              normalData = []
            }
            var remainUser = []
            defaultPlayer.forEach( e =>{
              const filtered = normalData.filter( de =>{
                return de.userid === e.userid
              })
              if(filtered.length === 0){
                remainUser.push(e)
              }
            })
            setData(remainUser.concat(normalData))
          }else{
            setData([])
          }
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

  async function handleFetchMatchDetail(defaultPlayer){
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
          try {
            handleFetch(
              mainClassSelected !== '1' ? parseInt(mainClassSelected) : ( d.mainclass.length > 0 ? d.mainclass[0].mainclass : 1 )
              , defaultPlayer, d
            )
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

  async function handleFetchDefault(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'defaultmember',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleFetchMatchDetail(d)
      })
    }
  }

  React.useEffect(()=>{
    handleFetchDefault()
  },[ open, displayModal, mainClassSelected ])

  React.useEffect(()=>{
    setSelectedClass(0)
  },[ edittingClass ])

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
      { matchDetail &&
        <React.Fragment>
          <List className={classes.listRoot}>
            <ListItem className={classes.controls}>
              { sess && sess.typeid === 'admin' &&
                <Button className={classes.addPlayerButton} variant="contained"
                  onClick={handleOpen}>
                  <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }} />
                  Add player
                </Button>
              }
              <div style={{ flex: 1 }} />
              <div
                className={classes.controlsEdit}
                style={{
                  border: edittingClass && '0 solid',
                  justifyContent: (editting || edittingClass || edittingDisplay)? 'flex-end' : 'space-around',
                }}>
                { !editting && !edittingClass &&
                  (
                    edittingDisplay?
                    <GreenTextButton className={classes.controlsEditButton} onClick={handleDoneEdittingDisplay}>
                      { API._getWord(sess && sess.language).Done }
                    </GreenTextButton>
                    :
                    <GreenTextButton className={classes.controlsEditButton} onClick={handleEdittingDisplay}>
                      <DesktopMacIcon
                        style={{ left:
                          window.innerWidth > 500? 0 :
                          window.innerWidth > 450? '20%':'10%'
                        }}
                        className={classes.controlsEditButtonIcon} />
                      { API._getWord(sess && sess.language).Showing }
                    </GreenTextButton>
                  )
                }
                { !editting && !edittingDisplay && matchDetail &&/*style={{ padding: '8px 36px', margin: '2px 0' }}*/
                  (
                    edittingClass?
                    <React.Fragment>
                      {
                        matchDetail.scorematch !== 0?
                        <React.Fragment>
                          <GreenTextButton className={classes.controlsEditButton2} onClick={handleDoneEdittingClass}>
                            { API._getWord(sess && sess.language).Done }
                          </GreenTextButton>
                          <GreenButton className={classes.controlsEditButton2} onClick={handleSave}>
                            { API._getWord(sess && sess.language).Save }
                          </GreenButton>
                        </React.Fragment>
                        :
                        <React.Fragment>
                          <GreenTextButton className={classes.controlsEditButton2} onClick={handleDoneEdittingClass}>
                            { API._getWord(sess && sess.language).Done }
                          </GreenTextButton>
                        </React.Fragment>
                      }
                    </React.Fragment>
                    :
                    <GreenTextButton className={classes.controlsEditButton} onClick={()=>setEdittingClass(!edittingClass)}>
                      <ClassIcon
                        style={{ left:
                          window.innerWidth > 500? 0 :
                          window.innerWidth > 450? '20%':'10%'
                        }}
                        className={classes.controlsEditButtonIcon} />
                      {function(){
                        switch (matchDetail.scorematch) {
                          case 0:
                            return API._getWord(sess && sess.language).Flight
                            break;
                          default:
                            return API._getWord(sess && sess.language).Group
                        }
                      }()}
                    </GreenTextButton>
                  )
                }
                { !edittingClass && !edittingDisplay &&
                  (
                    editting?
                    <GreenTextButton className={classes.controlsEditButton2} style={{ marginTop: 0, marginBottom: 0}}
                      onClick={handleDoneEditting}>
                      { API._getWord(sess && sess.language).Done }
                    </GreenTextButton>
                    :
                    <GreenTextButton className={classes.controlsEditButton} onClick={()=>setEditting(!editting)}>
                      <DeleteIcon
                        style={{ left:
                          window.innerWidth > 500? 0 :
                          window.innerWidth > 450? '20%':'10%'
                        }}
                        className={classes.controlsEditButtonIcon} />
                      { API._getWord(sess && sess.language).Remove }
                    </GreenTextButton>
                  )
                }
              </div>
            </ListItem>
            <ListItem disableGutters className={classes.controlsSecondary}>
              { edittingClass && matchDetail &&
                function(){
                  switch (matchDetail.scorematch) {
                    case 0:
                      return (
                        <React.Fragment>
                          <GreenTextButton variant="outlined" className={classes.controlsEditButton2}
                            onClick={()=>handleUpdateFlight('clear')}>
                            { API._getWord(sess && sess.language).Clear }
                          </GreenTextButton>
                          <GreenButton className={classes.controlsEditButton2}
                            onClick={()=>handleUpdateFlight('update')}>
                            { API._getWord(sess && sess.language).Update }
                          </GreenButton>
                        </React.Fragment>
                      );
                      break;
                    case 1:
                      return (
                        <React.Fragment>
                          <div style={{ display: 'flex' }}>
                            <ClassIcon style={{ color: primary[600], marginRight: 4 }} />
                            <div style={{ color: primary[700], marginTop: 'auto', marginRight: 12, fontWeight: 600, fontSize: 16, }}>
                              { selectedClass !== 0 ? (
                                API._getWord(sess && sess.language).Selected_Group
                              ) : (
                                API._getWord(sess && sess.language).Select_Group
                              ) }
                            </div>
                          </div>
                          <GreenTextButton variant="outlined" className={classes.controlsEditButton} onClick={handleMenuClick}>
                            { selectedClass !== 0?
                              matchDetail && matchDetail.mainclass && matchDetail.mainclass.length > 0 &&
                              matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.filter( item =>{
                                return item.classno === selectedClass
                              }).map( d =>
                                d &&
                                <React.Fragment key={d.classname}>{d.classname}</React.Fragment>
                              )
                              : <React.Fragment>-</React.Fragment>
                            }
                          </GreenTextButton>
                        </React.Fragment>
                      );
                      break;
                    default:
                      return (
                        <React.Fragment>
                          <div style={{ display: 'flex' }}>
                            <ClassIcon style={{ color: primary[600], marginRight: 4 }} />
                            <div style={{ color: primary[700], marginTop: 'auto', marginRight: 12, fontWeight: 600, fontSize: 16, }}>
                              { selectedClass !== 0 ? (
                                API._getWord(sess && sess.language).Selected_Team
                              ) : (
                                API._getWord(sess && sess.language).Select_Team
                              ) }
                            </div>
                          </div>
                          <GreenTextButton variant="outlined" className={classes.controlsEditButton} onClick={handleMenuClick}>
                            { selectedClass !== 0?
                              matchDetail && matchDetail.mainclass && matchDetail.mainclass.length > 0 &&
                              matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.filter( item =>{
                                return item.classno === selectedClass
                              }).map( d =>
                                d &&
                                <React.Fragment key={d.classname}>{d.classname}</React.Fragment>
                              )
                              : <React.Fragment>-</React.Fragment>
                            }
                          </GreenTextButton>
                        </React.Fragment>
                      );
                  }
                }()
              }
              { editting && checked.length > 0 &&
                <GreenTextButton className={classes.controlsEditButton} style={{ marginTop: 1, marginBottom: 1 }} onClick={handleRemovePlayer}>
                  <DeleteIcon />
                  { API._getWord(sess && sess.language).Remove }
                </GreenTextButton>
              }
              {/* !( editting || edittingClass) &&
                <div style={{ height: 42 }}></div>
                */
              }
            </ListItem>
            { /*
              <ListItem style={{ marginBottom: 8, cursor: 'auto' }}>
                <ThemeProvider theme={theme}>
                  <TextField
                    disabled={data === null}
                    className={classes.searchBox}
                    variant="outlined"
                    placeholder={ !searchUser? ( API._getWord(sess && sess.language).Search ) : '' }
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
              </ListItem>
              */
            }
            { data &&
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="caption" align="right"
                  style={{ marginBottom: 8, marginTop: 'auto', marginRight: 8 }}>
                  { ( sess && sess.language === 'TH' ) ?
                    `ผู้เล่น ${data.length} คน`
                    :
                    `${data.length} player${data.length > 1? 's' : ''}`
                  }
                </Typography>
                { matchDetail && matchDetail.scorematch !== 0 &&
                  <FormControl className={classes.formControl}>
                    <InputLabel>{ API._getWord(sess && sess.language).Main_group }</InputLabel>
                    <Select
                      value={mainClassSelected}
                      onChange={e => setMainClassSelected(e.target.value)}>
                      { matchDetail &&
                        matchDetail.mainclass.map( d =>
                          <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                            {d.mainclass}
                          </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                }
              </div>
            }
            <div style={{ overflow: 'auto', position: 'relative' }}>
              {/* ( editting || edittingClass || edittingDisplay ) &&
                <Typography component="div">
                  <Box className={classes.notice} m={1}>
                    { edittingDisplay && 'Click the list to toggle the player display.'}
                    { edittingClass && 'Select class and player to change player class.'}
                    { editting && 'Select the list to delete multiple or Hit the icon on the right to delete single.'}
                  </Box>
                </Typography>*/
              }
              <ListItem role={undefined}
                style={{
                  display: 'flex', backgroundColor: grey[900], borderRadius: 4, cursor: 'auto',
                }}>
                <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
                  primary={ window.innerWidth < 600? (
                    API._getWord(sess && sess.language).Full_name
                  ) : (
                    API._getWord(sess && sess.language).First_name
                  ) } />
                { window.innerWidth >= 600 &&
                  <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
                    primary={ API._getWord(sess && sess.language).Last_name } />
                }
                { window.innerWidth > 600 &&
                  <ListItemText style={{ color: 'white', margin: '8px 0', marginRight: 20, width: '30%', textAlign: 'left', }}
                    primary={
                      function(){
                        switch (matchDetail.scorematch) {
                          case 0:
                            return API._getWord(sess && sess.language).Flight
                            break;
                          default:
                            return API._getWord(sess && sess.language).Group
                        }
                      }()} />
                }
                <ListItemIcon style={{ justifyContent: 'flex-start' }}>
                  <div style={{ height: 42, width: 42 }}></div>
                </ListItemIcon>
              </ListItem>
              <div style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative' }}>

                { data && !data.status && matchDetail && matchDetail.mainclass &&
                  data.length > 0 ?
                  [
                    ...searchUser? handleSearch() : data
                  ].slice(0, dataSliced).map(value => {

                    return value && (
                      <React.Fragment key={value.userid}>
                        <ListItem role={undefined} button={editting || edittingClass || edittingDisplay}
                          onClick={()=>
                            ( editting || edittingClass )?
                            handleToggle(value):
                            ( edittingDisplay && value.classno !== 0?
                              handleSelectedPlayer(value)
                              :
                              console.log()
                            )
                          }>
                          <ListItemIcon>
                            { ( editting || edittingClass )?
                              <GreenCheckbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple />
                              :
                              (edittingDisplay && value.classno !== 0 ?
                                <GreenCheckbox
                                  edge="start"
                                  checked={value.display === 1}
                                  tabIndex={-1}
                                  disableRipple />
                              :
                                <div style={{ height: 42, width: 42 }} />)
                            }
                          </ListItemIcon>
                          <ListItemText className={classes.listText}
                            primary={
                              ( window.innerWidth >= 450 && window.innerWidth < 600 )?
                              <div style={{ display: 'flex' }}>
                                { value.firstname }<div style={{ width: 20 }}></div>{ value.lastname }
                              </div>
                              : value.firstname}
                            secondary={
                              <React.Fragment>
                                { window.innerWidth < 450 &&
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    color="textPrimary"
                                  >
                                    {value.lastname}
                                  </Typography>
                                }
                                { window.innerWidth < 600 &&
                                  ( matchDetail.mainclass &&  matchDetail.mainclass.length > 0 &&
                                    matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.length > 0?
                                    ( value.classno === 0 ?
                                      <React.Fragment>
                                        <br></br>
                                        {"-"}
                                      </React.Fragment>
                                      :
                                      matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.filter( d =>{
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
                                      {"No class"}
                                    </React.Fragment>
                                  )
                                }
                                { value.note &&
                                  <Typography variant="caption" display="block">
                                    {value.note}
                                  </Typography>
                                }
                              </React.Fragment>
                            } />
                          { window.innerWidth >= 600 &&
                            <ListItemText className={classes.listText}
                              primary={value.lastname} />
                          }

                          { window.innerWidth > 600 &&
                            ( matchDetail.mainclass &&  matchDetail.mainclass.length > 0 &&
                              matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.length > 0 ?
                              ( value.classno === 0 ?
                                <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass}
                                  primary={"-"} />
                                :
                                matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.filter( d =>{
                                  return d.classno === value.classno
                                }).map( d =>
                                  d &&
                                  <ListItemText key={d.classname + `(${value.userid})`}
                                    style={{ justifyContent: 'center' }}
                                    className={classes.listClass}
                                    primary={
                                      matchDetail.scorematch !== 0 ?
                                      d.classname
                                      :
                                      String.fromCharCode(65 + d.classno - 1)
                                    } />
                                )
                              )
                              :
                              <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass}
                                primary={"No class"} />
                            )
                          }
                          <ListItemIcon style={{ justifyContent: 'flex-end' }}>
                            {/* editting?
                              <IconButton edge="end" onClick={()=>handleRemovePlayer(value)}>
                                <DeleteIcon classes={{ root: classes.deleteIcon}} />
                              </IconButton>
                              :
                              <div style={{ height: 42, width: 42 }}></div>*/
                            }
                          </ListItemIcon>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })
                  :
                  <Typography component="div" style={{ width: '100%' }}>
                    <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                      { API._getWord(sess && sess.language).No_player }
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
                      <BTN.NoStyleLink to={`${window.location.pathname}#invitation`}>
                        <BTN.PrimaryOutlined>
                          <AddIcon style={{ marginRight: 8 }} />
                          { API._getWord(sess && sess.language).Invite_players }
                        </BTN.PrimaryOutlined>
                      </BTN.NoStyleLink>
                    </div>
                  </Typography>
                }
              </div>
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
                      <Button fullWidth onClick={handleMoreAll}>{ API._getWord(sess && sess.language).Show_all }</Button>
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

            </div>
          </List>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={()=>handleSelectedClass(0)}>{"-"}</MenuItem>
            { matchDetail && matchDetail.mainclass &&  matchDetail.mainclass.length > 0 &&
              matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.map( (d, i) =>
                d &&
                <MenuItem key={"i : " + i + " data: " + d} onClick={()=>handleSelectedClass(d)}>{d.classname}</MenuItem>
              )
            }
          </Menu>
        </React.Fragment>
      }
      <TemplateDialog open={open} handleClose={handleClose}>
        <AddPlayerModal
          {...props}
          playerAction="add" />
      </TemplateDialog>
      <TemplateDialog open={displayModal} handleClose={handleDisplayModalClose}>
        { selectedPlayer &&
          <EditDisplayModal
            {...props}
            handleClose={handleDisplayModalClose}
            selectedPlayer={selectedPlayer}
            matchDetail={matchDetail}
            />
        }
      </TemplateDialog>
    </div>
  );
}
