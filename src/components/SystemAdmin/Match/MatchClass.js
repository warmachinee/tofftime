import React from 'react';
import Loadable from 'react-loadable';
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

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 16,
    width: '100%',
  },
  confirmTitle: {
    textAlign: 'center', color: primary[900],
    fontSize: 20,
    [theme.breakpoints.up(500)]: {
      fontSize: 24,
    },
  },
  confirmSubtitle: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  confirmButton: {
    padding: theme.spacing(1, 4.5)
  },
  paperList: {
    width: '100%',
    padding: 8,
    transition: '.2s',
    display: 'flex'
  },
  dragIconGrid: {
    borderRight: '2px solid black',
    marginTop: 4,
    paddingRight: 8,
    marginRight: 12
  },
  dragIcon: {
    fontSize: '2rem',
    color: 'red'
  },
  deleteIcon: {
    //color: primary[600]
  },
  controls: {
    marginTop: 36,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(400)]: {
      width: '100%',
      flexDirection: 'row',
    },
  },
  button: {
    marginTop: 8,
    padding: theme.spacing(1.5, 1),
    [theme.breakpoints.up(400)]: {
      marginTop: 0,
      width: '100%',
      padding: theme.spacing(1),
    },
  },
  classEditText: {
    [theme.breakpoints.up(400)]: {
      margin: theme.spacing(0, 56)
    },
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
  const { COLOR, sess, token, setCSRFToken, data, matchid, setData, handleSnackBar, matchClass } = props
  const [ lists, setLists ] = React.useState([])
  const [ text, setText ] = React.useState('')
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ editing, setEditing ] = React.useState(false)
  const [ arrEdit, setArrEdit ] = React.useState([])
  const [ arrEditColor, setArrEditColor ] = React.useState([])
  const [ arrEditClassno, setArrEditClassno ] = React.useState([])
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(null)
  const [ draggedItem, handleDraggedItem ] = React.useState(null)
  const [ dropItem, handleDropItem ] = React.useState(null)

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

  function handleEditClass(data, event, index){
    const newClassname = [...arrEdit]
    newClassname[index] = event.target.value
    setArrEdit(newClassname)
  }

  async function handleFetchAdd(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classadd',
        matchid: matchid,
        classname: text,
        mainclass: matchClass.mainclass,
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
      }
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchEdit(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classedit',
        matchid: matchid,
        classname: arrEdit,
        classno: arrEditClassno,
        mainclass: matchClass.mainclass,
    }, (csrf, d) =>{
      if(data.scorematch === 0){
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
        if(data.scorematch !== 0){
          let classColor = []
          for(var j = 0;j < matchClass.values.length;j++){
            classColor.push(matchClass.values[j].color)
          }
          setArrEditColor(classColor)
        }
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        { !editing &&
          <GreenTextButton onClick={()=>setEditing(!editing)}>
            { API._getWord(sess && sess.language).Edit }
          </GreenTextButton>
        }
      </div>
      <List className={classes.root}>
        { lists && lists.length === 0 && data &&
          <ListItem>
            <ListItemText
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: primary[900] }}
              primary={function(){
                switch (data.scorematch) {
                  case 0:
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
            return d && (
              <ListItem key={i}>
                { data.scorematch !== 0 &&
                  <ListItemIcon>
                    <ListColorSelector disabled index={i} />
                  </ListItemIcon>
                }
                { data.scorematch === 0 &&
                  <ListItemText
                    style={{ width: 48, flex: 'none' }}
                    primary={
                      <Typography variant="h6">{API._handleAmateurClass(d.classno)}</Typography>
                    } />
                }
                <ListItemText primary={ data.scorematch === 0 ? (
                    arrEdit[i] + '  -  ' + ( ( i + 1 >= arrEdit.length )? 'Up' : arrEdit[i + 1] - 1 )
                  ) : d.classname } />
              </ListItem>
            )
          }
        )}
        { !editing && data &&
          <ListItem className={classes.addClass}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                autoFocus
                value={text || ''}
                type={ data.scorematch === 0? 'number' : 'text' }
                helperText={function(){
                  switch (data.scorematch) {
                    case 0:
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
          arrEdit.map( (d, i) =>{
            return (
              <ListItem key={i}>
                { data.scorematch !== 0 &&
                  <ListColorSelector index={i} />
                }
                <ThemeProvider theme={theme}>
                  <TextField
                    fullWidth
                    style={{ marginRight: 16 }}
                    autoFocus={i==0}
                    value={arrEdit[i] || ''}
                    onChange={e =>handleEditClass(d, e, i)}
                    onKeyPress={e => ( e.key === 'Enter' )? handleSave() : console.log() }
                  />
                </ThemeProvider>
                { data.scorematch === 0 &&
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
          }
        )}
        {/* lists && classAction === 'delete' &&
          lists.map( (d, i) =>{
            return d && (
              <ListItem key={i}>
                <ListItemText primary={ data.scorematch === 0? (
                    arrEdit[i] + '  -  ' + ( ( i + 1 >= arrEdit.length )? 'Up' : arrEdit[i + 1] - 1 )
                  ) : d.classname } />
                <ListItemSecondaryAction>
                  <IconButton onClick={()=>handleDeleteItem(d)}>
                    <DeleteIcon classes={{ root: classes.deleteIcon }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        )*/}
      </List>
      { editing && lists && lists.length > 0 && data &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton className={classes.saveButton} onClick={()=>setEditing(false)}>
            { API._getWord(sess && sess.language).Cancel }
          </GreenTextButton>
          <GreenButton className={classes.saveButton} onClick={handleSave}>
            { API._getWord(sess && sess.language).Save }
          </GreenButton>
        </div>
      }
      <TemplateDialog
        maxWidth={400}
        open={confirmDeleteState} handleClose={handleConfirmCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { API._getWord(sess && sess.language)['Are you sure you want to delete?'] }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            ( { API._getWord(sess && sess.language).Group } : { selectedDeleteItem && selectedDeleteItem.classname } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmCancel} className={classes.confirmButton}>
            { API._getWord(sess && sess.language).Cancel }
          </GreenTextButton>
          <RedButton onClick={handleConfirmDelete} className={classes.confirmButton}>
            { API._getWord(sess && sess.language).Delete }
          </RedButton>
        </div>
      </TemplateDialog>
    </div>
  );
}
