import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  Paper,
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Typography,
  Box,
  Divider,
  Menu,
  MenuItem,

} from '@material-ui/core';

import {
  AddCircle,
  Delete,
  Delete as DeleteIcon,
  RemoveCircleOutline,

} from '@material-ui/icons';


import { LDCircular } from './../../loading/LDCircular'

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 16,
    width: '100%',
  },
  deleteIcon: {
    //color: primary[600]
  },
  addClass: {
    flexDirection: 'column',
    [theme.breakpoints.up(400)]: {
      flexDirection: 'row'
    },
  },
  addClassButtonGrid: {
    width: '100%',
    [theme.breakpoints.up(400)]: {
      width: 'auto',
    },
  },
  addClassButton: {
    width: '100%',
    marginLeft: 0,
    marginTop: 16,
    [theme.breakpoints.up(400)]: {
      marginLeft: 8,
      marginTop: 0,
    },
  },
  saveButton: {
    padding: theme.spacing(1, 4.5),
    marginTop: 24,
    [theme.breakpoints.up(400)]: {
      marginTop: 0,
    },
  }

}));

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}))(Button);

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

const colorsPicker = [
  'primary',
  'secondary',
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey'
];

export default function MatchClass(props) {
  const classes = useStyles();
  const { BTN, COLOR, sess, token, setCSRFToken, data, matchid, setData, handleSnackBar, matchClass, isAvailableEditing, value, setValue } = props
  const [ lists, setLists ] = React.useState([])
  const [ text, setText ] = React.useState('')
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ dialog, setDialog ] = React.useState({
    deleteMainclass: false
  })
  const [ mainGroupName, setMainGroupName ] = React.useState('')
  const [ editing, setEditing ] = React.useState(false)
  const [ arrEdit, setArrEdit ] = React.useState([])
  const [ arrEditColor, setArrEditColor ] = React.useState([])
  const [ arrEditClassno, setArrEditClassno ] = React.useState([])
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(null)
  const [ draggedItem, handleDraggedItem ] = React.useState(null)
  const [ dropItem, handleDropItem ] = React.useState(null)

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function handleConfirmCancel(){
    handleSelectedDeleteItem(null)
    handleConfirmDeleteState(!confirmDeleteState)
  }

  function handleConfirmDelete(){
    handleFetchRemove(selectedDeleteItem.classno)
  }

  function handleAddItem(){
    if(text){
      handleFetchAdd()
    }
  }

  function handleDeleteItem(d){
    handleConfirmDeleteState(!confirmDeleteState)
    handleSelectedDeleteItem(d)
    /*
    var deleted = lists.filter( (item) =>{
      return item !== d;
    });
    setLists(deleted)*/
  }

  function handleKeyPress(e){
    if (e === 'Enter'){
      handleAddItem()
    }
  }

  function handleSave(){
    handleFetchEdit()
  }

  function getObjFromScorematch(){
    switch (data.scorematch) {
      case 1:
        return {
          type: 'group',
          mainclass: matchClass.mainclass
        }
        break;
      case 2:
        return {
          type: matchClass.type,
          mainclass: matchClass.mainclass
        }
        break;
      default:
        return {}
    }
  }

  function handleEditClass(data, event, index){
    const newClassname = [...arrEdit]
    newClassname[index] = event.target.value
    setArrEdit(newClassname)
  }

  function toggleRealtime(mainclass){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.emit('admin-match-client-message', {
      action: "showmatchscore",
      matchid: matchid,
      userid: sess.userid,
      mainclass: mainclass
    })
  }

  async function handleFetchAdd(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'classadd',
      matchid: matchid,
      classname: text,
    }
    Object.assign(sendObj, getObjFromScorematch());
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        ...sendObj
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        setText('')
        toggleRealtime(matchClass.mainclass)
      }
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchEdit(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'classedit',
      matchid: matchid,
      classname: arrEdit,
      classno: arrEditClassno,
      mainclass: matchClass.mainclass,
      mainclassname: mainGroupName
    }
    Object.assign(sendObj, getObjFromScorematch());
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        ...sendObj
    }, (csrf, d) =>{
      if(data.scorematch === 0 || matchClass.type === 'flight'){
        var statusRes = []
        d.forEach( e =>{
          if(e.status !== 'success'){
            handleSnackBar({
              state: true,
              message: e.status,
              variant: /success/.test(e.status) ? e.status : 'error',
              autoHideDuration: /success/.test(e.status)? 2000 : 5000
            })
            statusRes.push(e.status)
          }else{
            statusRes.push(e.status)
          }
        })
        if(statusRes.every(item => /success/.test(item))){
          handleSnackBar({
            state: true,
            message: 'success',
            variant: 'success',
            autoHideDuration: 2000
          })
          setEditing(false)
        }
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          setEditing(false)
          toggleRealtime(matchClass.mainclass)
        }
      }
      setCSRFToken(csrf)
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchRemove(d){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classremove',
        matchid: matchid,
        classno: parseInt(d),
        mainclass: matchClass.mainclass,
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
        if(/success/.test(d.status)){
          handleSelectedDeleteItem(null)
          handleConfirmDeleteState(false)
          toggleRealtime(matchClass.mainclass)
        }
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleDeleteMainclass(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classremove',
        matchid: matchid,
        classno: 0,
        mainclass: matchClass.mainclass,
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      if(value > 1){
        setValue(value - 1)
      }else{
        setValue(0)
      }
      try {
        handleFetch()
        if(/success/.test(d.status)){
          dialogClose('deleteMainclass')
          toggleRealtime(matchClass.mainclass)
        }
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetch(){
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
        setData(d)
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

  React.useEffect(()=>{
    if(matchClass){
      if(matchClass.values){
        let classname = [];
        let classno = [];
        for(var i = 0;i < matchClass.values.length;i++){
          classname.push(matchClass.values[i].classname)
          classno.push(matchClass.values[i].classno)
        }
        setArrEdit(classname)
        setArrEditClassno(classno)
        setLists(matchClass.values)
        setMainGroupName(matchClass.mainclassname)
        let classColor = []
        for(var j = 0;j < matchClass.values.length;j++){
          classColor.push(matchClass.values[j].color)
        }
        setArrEditColor(classColor)
      }
    }
  },[ data ])

  function ListColorSelector(props){
    const { index, disabled } = props
    const [ anchorEl, setAnchorEl ] = React.useState(null);

    function handleMenuClick(event) {
      setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
      setAnchorEl(null);
    }

    async function handleSelectColor(color){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'setcolor',
          matchid: matchid,
          classno: arrEditClassno[index],
          color: color,
          mainclass: matchClass.mainclass
      }, (csrf, d) =>{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setCSRFToken(csrf)
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }

    return (
      <React.Fragment>
        <IconButton disabled={disabled} onClick={handleMenuClick}>
          { ( arrEditColor[index] !=='' && arrEditColor[index] !=='none' ) ?
            <div style={{
                width: 20, height: 20,
                backgroundColor: COLOR[arrEditColor[index]][600],
                borderRadius: '50%',
                boxSizing: 'border-box'
              }} />
            :
            <RemoveCircleOutline />
          }
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem onClick={()=>handleSelectColor('none')}>
            None
          </MenuItem>
          { colorsPicker.map( c =>
            <MenuItem onClick={()=>handleSelectColor(c)} key={c}>
              <div style={{ width: 16, height: 16, backgroundColor: COLOR[c][600], marginRight: 12, borderRadius: '50%' }}></div>
              {c}
            </MenuItem>
          )}
        </Menu>
      </React.Fragment>
    );
  }

  return (
    <div>
      { isAvailableEditing &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          { editing ?
            <BTN.Red onClick={()=>dialogOpen('deleteMainclass')}
              startIcon={<DeleteIcon color="inherit" />}>
              { API._getWord(sess && sess.language).Remove }
            </BTN.Red>
            :
            <GreenTextButton onClick={()=>setEditing(!editing)}>
              { API._getWord(sess && sess.language).Edit }
            </GreenTextButton>
          }
        </div>
      }
      <List className={classes.root}>
        { lists && lists.length === 0 && data &&
          <ListItem>
            <ListItemText
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: primary[900] }}
              primary={function(){
                switch (true) {
                  case data.scorematch === 0 || matchClass.type === 'flight':
                    return API._getWord(sess && sess.language).No_flight
                    break;
                  default:
                    return API._getWord(sess && sess.language).No_group
                }
              }()} />
          </ListItem>
        }
        { lists && !editing &&
          lists.map( (d, i) =>{
            return (
              <ListItem key={i}>
                { data.scorematch !== 0 &&
                  <ListItemIcon>
                    <ListColorSelector disabled index={i} />
                  </ListItemIcon>
                }
                { ( data.scorematch === 0 || matchClass.type === 'flight' ) &&
                  <ListItemText
                    style={{ width: 100, flex: 'none' }}
                    primary={
                      <Typography variant="h6">{API._handleAmateurClass(d.classno)}</Typography>
                    } />
                }
                <ListItemText primary={ ( data.scorematch === 0 || matchClass.type === 'flight' ) ? (
                    arrEdit[i] + '  -  ' + ( ( i + 1 >= arrEdit.length )? 'Up' : arrEdit[i + 1] - 1 )
                  ) : d.classname } />
              </ListItem>
            )
          }
        )}
        { isAvailableEditing && !editing && data &&
          <ListItem className={classes.addClass}>
            <ThemeProvider theme={theme}>
              <TextField
                disabled={!isAvailableEditing}
                fullWidth
                autoFocus={API._isDesktopBrowser()}
                value={text || ''}
                type={ ( data.scorematch === 0 || matchClass.type === 'flight' )? 'number' : 'text' }
                helperText={function(){
                  switch (true) {
                    case data.scorematch === 0 || matchClass.type === 'flight':
                      return API._getWord(sess && sess.language)['Please input number (HC).']
                      break;
                    default:
                      return  API._getWord(sess && sess.language)['Please input group name.']
                  }
                }()}
                onChange={e =>setText(e.target.value)}
                onKeyPress={e =>handleKeyPress(e.key)}
              />
            </ThemeProvider>
            <ListItemIcon className={classes.addClassButtonGrid}>
              <GreenTextButton disabled={!text} className={classes.addClassButton} variant="outlined" onClick={handleAddItem}>
                <AddCircle style={{ marginRight: 12 }} />
                { API._getWord(sess && sess.language).Add }
              </GreenTextButton>
            </ListItemIcon>
          </ListItem>
        }
        { lists && data && editing &&
          <React.Fragment>
            { data.scorematch !== 0 &&
              <ThemeProvider theme={theme}>
                <div style={{ margin: 16, marginTop: 0 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={ API._getWord(sess && sess.language).Main_group_name }
                    value={mainGroupName}
                    onChange={e =>setMainGroupName(e.target.value)}
                    onKeyPress={e => ( e.key === 'Enter' )? handleSave() : console.log() } />
                </div>
              </ThemeProvider>
            }
            <div>
              {arrEdit.map( (d, i) =>{
                  return (
                    <ListItem key={i}>
                      { data.scorematch !== 0 &&
                        <ListColorSelector index={i} />
                      }
                      <ThemeProvider theme={theme}>
                        <TextField
                          fullWidth
                          style={{ marginRight: 16 }}
                          autoFocus={API._isDesktopBrowser() && i==0}
                          value={arrEdit[i] || ''}
                          onChange={e =>handleEditClass(d, e, i)}
                          onKeyPress={e => ( e.key === 'Enter' )? handleSave() : console.log() }
                        />
                      </ThemeProvider>
                      { ( data.scorematch === 0 || matchClass.type === 'flight' ) &&
                        <div style={{ display: 'flex', width: '100%' }}>
                          <div style={{ marginTop: 'auto', marginBottom: 8, textAlign: 'center', width: 64 }}> {
                              API._getWord(sess && sess.language).to
                            } </div>
                          <TextField
                            disabled
                            fullWidth
                            value={ ( i + 1 >= arrEdit.length )? 'Up' : arrEdit[i + 1] - 1 }
                          />
                        </div>
                      }
                      <ListItemSecondaryAction>
                        <IconButton onClick={()=>handleDeleteItem(lists[i])}>
                          <DeleteIcon classes={{ root: classes.deleteIcon }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })
              }
            </div>
          </React.Fragment>
        }
      </List>
      { editing && lists && lists.length > 0 && data &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton className={classes.saveButton} onClick={()=>setEditing(false)}>
            { API._getWord(sess && sess.language).Cancel }
          </GreenTextButton>
          <GreenButton variant="contained" className={classes.saveButton} onClick={handleSave}>
            { API._getWord(sess && sess.language).Save }
          </GreenButton>
        </div>
      }

      <ConfirmDialog
        sess={sess}
        open={confirmDeleteState}
        onClose={handleConfirmCancel}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          selectedDeleteItem &&
          <Typography variant="body1" align="center">
            { ( data.scorematch === 0 || matchClass.type === 'flight' ) ? '' : API._getWord(sess && sess.language).Group } :
            { ( data.scorematch === 0 || matchClass.type === 'flight' ) ? API._handleAmateurClass(selectedDeleteItem.classno) : selectedDeleteItem.classname }
          </Typography>
        }
        onSubmit={handleConfirmDelete}
        submitButton="Red" />
      <ConfirmDialog
        sess={sess}
        open={dialog.deleteMainclass}
        onClose={()=>dialogClose('deleteMainclass')}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          matchClass &&
          <Typography variant="body1" align="center">
            {matchClass.mainclassname}
          </Typography>
        }
        onSubmit={handleDeleteMainclass}
        submitButton="Red" />
    </div>
  );
}
