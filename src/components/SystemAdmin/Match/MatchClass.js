import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 16,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'flex-end'
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
    color: primary[600]
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

export default function MatchClass(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, data, matchid, setData, handleSnackBar } = props
  const [ lists, setLists ] = React.useState([])
  const [ text, setText ] = React.useState('')
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ classAction, setClassAction ] = React.useState('')
  const [ arrEdit, setArrEdit ] = React.useState([])
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
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classadd',
        matchid: matchid,
        classname: text
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchEdit(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classedit',
        matchid: matchid,
        classname: arrEdit,
        classno: arrEditClassno
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchRemove(d){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'classremove',
        matchid: matchid,
        classno: parseInt(d)
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
        if(d.status === 'success'){
          handleSelectedDeleteItem(null)
          handleConfirmDeleteState(false)
        }
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetch(){
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
    if(data){
      if(data.class){
        let classname = [];
        let classno = [];
        for(var i = 0;i < data.class.length;i++){
          classname.push(data.class[i].classname)
          classno.push(data.class[i].classno)
        }
        setArrEdit(classname)
        setArrEditClassno(classno)
        setLists(data.class)
      }
    }
  },[ data ])

  return (
    <div>
      <div className={classes.controls}>
        <Button variant={ classAction === 'add'? 'contained':'outlined' } color="primary" className={classes.button}
          onClick={()=>setClassAction( classAction === 'add'? '':'add' )}>Add</Button>
        <Button variant={ classAction === 'edit'? 'contained':'outlined' } color="primary" className={classes.button}
          onClick={()=>setClassAction( classAction === 'edit'? '':'edit')}>Edit</Button>
        <Button variant={ classAction === 'delete'? 'contained':'outlined' } color="primary" className={classes.button}
          onClick={()=>setClassAction( classAction === 'delete'? '':'delete')}>Remove</Button>
      </div>
      <List className={classes.root}>
        { lists && lists.length === 0 && data &&
          <ListItem>
            <ListItemText
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: primary[900] }}
              primary={ data.scorematch === 1? "No class" : "No flight" } />
          </ListItem>
        }
        { lists && ( classAction === '' || classAction === 'add' ) &&
          lists.map( (d, i) =>{
            return d && (
              <ListItem key={i}>
                <ListItemText primary={d.classname} />
              </ListItem>
            )
          }
        )}
        { classAction === 'add' && data &&
          <ListItem className={classes.addClass}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                autoFocus
                value={text || ''}
                type={ data.scorematch === 1? 'text' : 'number' }
                helperText={ data.scorematch === 1? 'Please input class name.' : 'Please input number.' }
                onChange={e =>setText(e.target.value)}
                onKeyPress={e =>handleKeyPress(e.key)}
              />
            </ThemeProvider>
            <ListItemIcon className={classes.addClassButtonGrid}>
              <GreenTextButton disabled={!text} className={classes.addClassButton} variant="outlined" onClick={handleAddItem}>
                <AddCircleIcon style={{ marginRight: 12 }}/>
                Add
              </GreenTextButton>
            </ListItemIcon>
          </ListItem>
        }
        { lists && classAction === 'edit' && data &&
          arrEdit.map( (d, i) =>{
            return (
              <ListItem key={i}>
                <ThemeProvider theme={theme}>
                  <TextField
                    fullWidth
                    autoFocus={i==0}
                    value={arrEdit[i] || ''}
                    onChange={e =>handleEditClass(d, e, i)}
                  />
                </ThemeProvider>
              </ListItem>
            )
          }
        )}
        { lists && classAction === 'delete' &&
          lists.map( (d, i) =>{
            return d && (
              <ListItem key={i}>
                <ListItemText primary={d.classname} />
                <ListItemSecondaryAction>
                  <IconButton onClick={()=>handleDeleteItem(d)}>
                    <DeleteIcon classes={{ root: classes.deleteIcon }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        )}
      </List>
      { classAction === 'edit' && lists && lists.length > 0 && data &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenButton className={classes.saveButton} onClick={handleSave}>Save</GreenButton>
        </div>
      }
      <TemplateDialog
        maxWidth={400}
        open={confirmDeleteState} handleClose={handleConfirmCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            Are you sure you want to delete?
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            ( Class : { selectedDeleteItem && selectedDeleteItem.classname } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmCancel} className={classes.confirmButton}>
            Cancel
          </GreenTextButton>
          <RedButton onClick={handleConfirmDelete} className={classes.confirmButton}>
            Delete
          </RedButton>
        </div>
      </TemplateDialog>
    </div>
  );
}