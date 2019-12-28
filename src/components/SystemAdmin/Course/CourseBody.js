import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as COLOR from './../../../api/palette'

import { LDCircular } from './../../loading/LDCircular'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Box,
  Divider,
  IconButton,
  TextField,
  InputAdornment,

} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

import {
  CheckCircle,
  Delete,
  Create,
  Search,
  Clear,
  RemoveCircleOutline,
  AddCircle as AddCircleIcon,

} from '@material-ui/icons'

const CourseEditor = Loadable({
  loader: () => import(/* webpackChunkName: "CourseEditor" */'./CourseEditor'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => <LDCircular />
});

const theme = createMuiTheme({
  palette: {
    primary: COLOR.primary,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: COLOR.primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  listImage: {
    width: 48,
    marginRight: 24,
    [theme.breakpoints.up(500)]: {
      width: 64,
    },
  },
  image: {
    width: 48,
    height: 48,
    backgroundColor: COLOR.grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
    [theme.breakpoints.up(500)]: {
      width: 64,
      height: 64,
    },
  },
  listOfficial: {
    width: 100,
    justifyContent: 'center'
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(600)]: {
      width: 'auto'
    },
  },

}))

export default function CourseBody(props){
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ searchField, setSearchField ] = React.useState('')
  const [ editing, setEditing ] = React.useState(false)
  const [ removeState, setRemoveState ] = React.useState(false)
  const [ editingField, setEditingField ] = React.useState(null)
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(false)

  function handleDelete(){
    handleDeleteField()
  }

  function handleOpen(d){
    setOpen(true)
    handleSelectedDeleteItem(d)
  }

  function handleClose(){
    setOpen(false)
    handleSelectedDeleteItem(null)
  }

  function handleCreateCourse(){
    setEditingField(null)
    toggleEditing()
  }

  function toggleEditing(){
    setEditing(!editing)
  }

  function handleEditingClose(){
    setEditing(false)
  }

  function handleEditCourse(data){
    setEditingField(data)
    toggleEditing()
  }

  async function handleFetchToggleOfficial(data){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'fieldsystem', {
        action: 'togglecustom',
        fieldid: data.fieldid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleFetch()
      }
    })
  }

  async function handleDeleteField(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem', {
        action: 'delete',
        fieldid: selectedDeleteItem.fieldid,
        usertarget: selectedDeleteItem.hostid,
        realdel: 'true'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleClose()
      }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {}
    var urlAPI = ''
    if(sess.typeid === 'admin'){
      urlAPI = 'loadfield'
      Object.assign(sendObj, { action: 'list' });
    }else{
      urlAPI = pageOrganizer ? 'mloadpage' : 'loadusersystem'
      if(pageOrganizer && pageData){
        Object.assign(sendObj, {
          action: 'fieldlist',
          pageid: pageData.pageid
        });
      }else{
        Object.assign(sendObj, { action: 'fieldlist' });
      }
    }

    await API._xhrPost(
      token? token : resToken.token,
      urlAPI, {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      document.title = `Course Management - T-off Time`
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ open, editing ])

  return(
    <div className={classes.root}>
      { sess && sess.typeid === 'admin' &&
        <GoBack to='/system_admin/' />
      }
      <LabelText text={ API._getWord(sess && sess.language).Course } />
      <List>
        <ListItem style={{ marginTop: 24, cursor: 'auto' }}>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.searchBox}
              variant="outlined"
              placeholder={ !searchField? ( API._getWord(sess && sess.language).Search ) : ' ' }
              value={searchField}
              onChange={e =>setSearchField(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary"/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    { searchField?
                      <IconButton onClick={()=>setSearchField('')}>
                        <Clear color="inherit" fontSize="small"/>
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
      </List>
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
        <BTN.Red onClick={handleCreateCourse}
          startIcon={<AddCircleIcon color="inherit" />}>
          { API._getWord(sess && sess.language).Create }
        </BTN.Red>
        <BTN.PrimaryOutlined onClick={()=>setRemoveState(!removeState)}>
          { !removeState ?
            ( API._getWord(sess && sess.language).Remove )
            :
            ( API._getWord(sess && sess.language).Done )
          }
        </BTN.PrimaryOutlined>
      </div>
      <List style={{ backgroundColor: COLOR.grey[900], }}>
        <ListItem>
          <ListItemIcon className={classes.listOfficial}>
            <Typography style={{ color: 'white' }}>
              { API._getWord(sess && sess.language).Official }
            </Typography>
          </ListItemIcon>
          <ListItemIcon className={classes.listImage}>
            <Skeleton className={classes.image} style={{ margin: 0, backgroundColor: 'inherit', height: 0 }} disableAnimate />
          </ListItemIcon>
          <ListItemText style={{ color: 'white' }} primary={ API._getWord(sess && sess.language).Course } />
        </ListItem>
      </List>
      <List>
        { data ?
          ( data.filter((item)=>{
                return (
                  (item.fieldname.search(searchField) !== -1) ||
                  (item.fieldname.toLowerCase().search(searchField.toLowerCase()) !== -1)
                )
              }).length > 0 ?
            data.filter((item)=>{
                return (
                  (item.fieldname.search(searchField) !== -1) ||
                  (item.fieldname.toLowerCase().search(searchField.toLowerCase()) !== -1)
                )
              }).map( d =>
              <React.Fragment key={d.fieldid}>
                <ListItem className={classes.list}>
                  <ListItemIcon className={classes.listOfficial}>
                    <IconButton onClick={()=>handleFetchToggleOfficial(d)} disabled={sess && sess.typeid !== 'admin'}>
                      { d.custom === 0 ?
                        <CheckCircle style={{ color: COLOR.primary[600] }} />
                        :
                        <RemoveCircleOutline />
                      }
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon className={classes.listImage}>
                    { d.photopath ?
                      <img className={classes.image}
                        src={API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toString() } />
                      :
                      <img className={classes.image}
                        src={`https://${API._webURL()}/default/match/matchcard.png`} />
                      /*<Skeleton className={classes.image} style={{ margin: 0 }} disableAnimate />*/
                    }
                  </ListItemIcon>
                  <ListItemText primary={d.fieldname}
                    {...(sess && sess.typeid !== 'admin' && d.fieldversion > 1)?
                      { secondary: d.fieldversion + ( ` ${API._getWord(sess && sess.language).version}` ) } : null }
                      />
                  <ListItemSecondaryAction>
                    { removeState ?
                      <IconButton onClick={()=>handleOpen(d)}>
                        <Delete />
                      </IconButton>
                      :
                      <IconButton onClick={()=>handleEditCourse(d)}>
                        <Create />
                      </IconButton>
                    }
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
            :
            <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
              <Box style={{ textAlign: 'center', color: COLOR.primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_course }
              </Box>
            </Typography>
          )
          :
          <LDCircular />
        }
      </List>
      <TemplateDialog open={editing} handleClose={handleEditingClose}>
        <CourseEditor
          {...props}
          afterSuccess={handleEditingClose}
          editingField={editingField}
          setEditingField={setEditingField} />
      </TemplateDialog>
      <ConfirmDialog
        sess={sess}
        open={open}
        onClose={handleClose}
        icon="Delete"
        iconColor={COLOR.red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          selectedDeleteItem &&
          <Typography variant="body1" align="center">
            { selectedDeleteItem && selectedDeleteItem.fieldname }
          </Typography>
        }
        onSubmit={handleDelete}
        submitButton="Red" />
    </div>
  )
}
