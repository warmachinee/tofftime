import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  TextField,
  Collapse,
  Typography,
  Box,
  Divider,
  Avatar,

} from '@material-ui/core';

import {
  Delete as DeleteIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {

  },
  textFieldGrid: {
    padding: 16,
    marginTop: 36,
    border: `3px solid ${primary[800]}`,
  },
  buttonGrid: {
    display: 'flex',
  },
  confirmButton: {
    width: '100%',
    marginTop: 16,
    padding: theme.spacing(1, 3),
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  textField: {
    width: '100%',
    margin: theme.spacing(1, 0)
  },
  confirmDeleteTitle: {
    textAlign: 'center',
    fontSize: 20,
    [theme.breakpoints.up(500)]: {
      fontSize: 24,
    },
  },
  confirmDeleteSubtitle: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  confirmDeleteButton: {
    padding: theme.spacing(1, 4.5)
  },
}))

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

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function ListDummy(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, data, editting, setEditting, removeState, setDummyData, handleOpen } = props
  const [ fullname, setFullname ] = React.useState(data.fullname)
  const [ lastname, setLastname ] = React.useState(data.lastname)

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleEditDummy()
    }
  }

  async function handleEditDummy(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mmatchmember', {
          action: 'dummy',
          matchid: matchid,
          fullname: fullname,
          lastname: lastname,
          dmaction: 'edit',
          userid: data.userid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          setEditting(false)
        }
        handleLoadDummy()
      })
    }
  }

  async function handleLoadDummy(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mloadmatch', {
          action: 'dummy',
          matchid: matchid,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setDummyData(d)
      })
    }
  }

  return (
    <ListItem>
      <ListItemText
        style={{ padding: '0 16px', width: '100%' }}
        primary={
          editting ?
          <TextField
            className={classes.textField}
            label={API._getWord(sess && sess.language).First_name}
            value={fullname}
            onChange={e =>setFullname(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
            />
          :
          <Typography variant="body1">{fullname}</Typography>
        } />
      <ListItemText
        style={{ padding: '0 16px', width: '100%' }}
        primary={
          editting ?
          <TextField
            className={classes.textField}
            label={API._getWord(sess && sess.language).Last_name}
            value={lastname}
            onChange={e =>setLastname(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
            />
          :
          <Typography variant="body1">{lastname}</Typography>
        } />
      { (editting || removeState) &&
        <React.Fragment>
          { ( editting || !removeState ) &&
            <ListItemIcon>
              <GreenButton onClick={handleEditDummy}>Save</GreenButton>
            </ListItemIcon>
          }
          { ( !editting || removeState ) &&
            <ListItemIcon>
              <IconButton onClick={()=>handleOpen(data)}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          }
        </React.Fragment>
      }
    </ListItem>
  );
}

export default function DummyPlayer(props){
  const classes = useStyles();
  const { BTN, playerAction, sess, token, setCSRFToken, matchid, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ fullname, setFullname ] = React.useState('')
  const [ lastname, setLastname ] = React.useState('')
  const [ editting, setEditting ] = React.useState(false)
  const [ removeState, setRemoveState ] = React.useState(false)
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(false)

  function handleOpen(d){
    setOpen(true)
    handleSelectedDeleteItem(d)
  }

  function handleClose(){
    setOpen(false)
    handleSelectedDeleteItem(null)
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleCreateDummy()
    }
  }

  async function handleRemoveDummy(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mmatchmember', {
          action: 'removedummy',
          matchid: matchid,
          userid: selectedDeleteItem.userid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          handleClose()
        }
        handleLoadDummy()
      })
    }
  }

  async function handleCreateDummy(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mmatchmember', {
          action: 'dummy',
          matchid: matchid,
          fullname: fullname,
          lastname: lastname,
          dmaction: 'add'
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          setFullname('')
          setLastname('')
        }
        handleLoadDummy()
      })
    }
  }

  async function handleLoadDummy(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mloadmatch', {
          action: 'dummy',
          matchid: matchid,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setData(d)
      })
    }
  }

  React.useEffect(()=>{
    handleLoadDummy()
  },[ ])

  return(
    <div className={classes.root}>
      <LabelText text={API._getWord(sess && sess.language).Create_Dummy} />
      <div className={classes.textFieldGrid}>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            className={classes.textField}
            variant="outlined"
            label={API._getWord(sess && sess.language).First_name}
            value={fullname}
            onChange={e =>setFullname(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
            />
          <TextField
            className={classes.textField}
            variant="outlined"
            label={API._getWord(sess && sess.language).Last_name}
            value={lastname}
            onChange={e =>setLastname(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
            />
        </ThemeProvider>
        <div className={classes.buttonGrid}>
          <Typography component="div">
            <Box className={classes.notice} m={1}>
              {API._getWord(sess && sess.language)['Fill the form and click confirm']}
              <br></br>
              {API._getWord(sess && sess.language)['to create a new player.']}
            </Box>
          </Typography>
          <div style={{ flex: 1 }} />
          <GreenButton
            className={classes.confirmButton}
            onClick={()=> sess.typeid === 'admin' ? handleCreatePlayer() : handleCreateDummy()}>
            {API._getWord(sess && sess.language).Confirm}
          </GreenButton>
        </div>
      </div>
      <LabelText text={API._getWord(sess && sess.language).Edit_Dummy} style={{ marginBottom: 24 }} />
      <div style={{ display: 'flex', padding: '0 12px' }}>
        { ( editting || !removeState ) &&
          <GreenTextButton variant="outlined" onClick={()=>setEditting(!editting)}>
            {editting ?
              (API._getWord(sess && sess.language).Done)
              :
              (API._getWord(sess && sess.language).Edit)
            }
          </GreenTextButton>
        }
        <div style={{ flexGrow: 1 }} />
        { ( !editting || removeState ) &&
          <GreenTextButton variant="outlined" onClick={()=>setRemoveState(!removeState)}>
            {removeState ?
              (API._getWord(sess && sess.language).Done)
              :
              (API._getWord(sess && sess.language).Remove)
            }
          </GreenTextButton>
        }
      </div>
      <List>
        { data &&
          ( data.length > 0 ?
            data.map( d =>
              <ListDummy {...props} key={d.userid} data={d}
                editting={editting} setEditting={setEditting}
                removeState={removeState} setDummyData={setData} handleOpen={handleOpen} />
            )
            :
            <ListItem>
              <ListItemText style={{ textTransform: 'capitalize' }}
                primary={API._getWord(sess && sess.language).No_Dummy} />
            </ListItem>
          )
        }

      </List>
      <TemplateDialog
        maxWidth={400}
        open={open} handleClose={handleClose}>
        <Typography component="div">
          <Box className={classes.confirmDeleteTitle} fontWeight={600} m={1}>
            { API._getWord(sess && sess.language)['Are you sure you want to delete?'] }
          </Box>
          <Box className={classes.confirmDeleteSubtitle} m={3}>
            ( { selectedDeleteItem && `${selectedDeleteItem.fullname} ${selectedDeleteItem.lastname}` } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BTN.PrimaryText onClick={handleClose} className={classes.confirmDeleteButton}>
            { API._getWord(sess && sess.language).Cancel }
          </BTN.PrimaryText>
          <BTN.Red onClick={handleRemoveDummy} className={classes.confirmDeleteButton}>
            { API._getWord(sess && sess.language).Delete }
          </BTN.Red>
        </div>
      </TemplateDialog>
    </div>
  );
}
