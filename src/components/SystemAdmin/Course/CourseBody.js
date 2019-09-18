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

} from '@material-ui/icons'

const CourseEditor = Loadable({
  loader: () => import(/* webpackChunkName: "CourseEditor" */'./CourseEditor'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../GoBack'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
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
  confirmTitle: {
    textAlign: 'center',
    fontSize: 20,
    [theme.breakpoints.up(500)]: {
      fontSize: 24,
    },
  },
  confirmSubtitle: {
    fontFamily: 'monospace',
    color: COLOR.grey[600],
    fontWeight: 600,
  },
  confirmButton: {
    padding: theme.spacing(1, 4.5)
  },

}))

export default function CourseBody(props){
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ searchField, setSearchField ] = React.useState('')
  const [ editting, setEditting ] = React.useState(false)
  const [ removeState, setRemoveState ] = React.useState(false)
  const [ edittingField, setEdittingField ] = React.useState(null)
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
    setEdittingField(null)
    toggleEditting()
  }

  function toggleEditting(){
    setEditting(!editting)
  }

  function handleEdittingClose(){
    setEditting(false)
  }

  function handleEditCourse(data){
    setEdittingField(data)
    toggleEditting()
  }

  async function handleDeleteField(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        handleClose()
      }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'loadusersystem', {
        ...(sess.typeid === 'admin') ? { action: 'list' } : {
          action: 'fieldlist',
          ...pageOrganizer && { type: 1 }
        }
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ open, editting ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          { ( sess && sess.language === 'EN' ) ? "Course" : 'สนาม' }
        </Box>
      </Typography>
      <List>
        <ListItem style={{ marginTop: 24, cursor: 'auto' }}>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.searchBox}
              variant="outlined"
              placeholder={ !searchField? ( ( sess && sess.language === 'EN' ) ? "Search" : 'ค้นหา' ) : '' }
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
        <BTN.PrimaryText onClick={handleCreateCourse}>{ ( sess && sess.language === 'EN' ) ? "Create" : 'สร้าง' }</BTN.PrimaryText>
        <BTN.PrimaryText onClick={()=>setRemoveState(!removeState)}>
          { !removeState ?
            ( ( sess && sess.language === 'EN' ) ? "Remove" : 'ลบ' )
            :
            ( ( sess && sess.language === 'EN' ) ? "Done" : 'เสร็จ' )
          }
        </BTN.PrimaryText>
      </div>
      <List style={{ backgroundColor: COLOR.grey[900], }}>
        <ListItem>
          <ListItemIcon className={classes.listOfficial}>
            <Typography style={{ color: 'white' }}>
              { ( sess && sess.language === 'EN' ) ? "Official" : 'เป็นทางการ' }
            </Typography>
          </ListItemIcon>
          <ListItemIcon className={classes.listImage}>
            <Skeleton className={classes.image} style={{ margin: 0, backgroundColor: 'inherit', height: 0 }} disableAnimate />
          </ListItemIcon>
          <ListItemText style={{ color: 'white' }} primary={ ( sess && sess.language === 'EN' ) ? "Course" : 'สนาม' } />
        </ListItem>
      </List>
      <List>
        { data &&
          data.filter((item)=>{
              return (
                (item.fieldname.search(searchField) !== -1) ||
                (item.fieldname.toLowerCase().search(searchField.toLowerCase()) !== -1)
              )
            }).map( d =>
            <React.Fragment key={d.fieldid}>
              <ListItem className={classes.list}>
                <ListItemIcon className={classes.listOfficial}>
                  { d.custom === 0 ?
                    <CheckCircle style={{ color: COLOR.primary[600] }}/> : <div style={{ width: 24, fontSize: 28 }}>{'-'}</div>
                  }
                </ListItemIcon>
                <ListItemIcon className={classes.listImage}>
                  { d.photopath ?
                    <img className={classes.image}
                      src={API.getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toString() } />
                    :
                    <Skeleton className={classes.image} style={{ margin: 0 }} disableAnimate />
                  }
                </ListItemIcon>
                <ListItemText primary={d.fieldname}
                  {...(sess && sess.typeid !== 'admin' && d.fieldversion > 1)?
                    { secondary: d.fieldversion + ( ( sess && sess.language === 'EN' ) ? ' version' : ' เวอร์ชัน') } : null }
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
        }
      </List>
      <TemplateDialog open={editting} handleClose={handleEdittingClose} maxWidth={700}>
        <CourseEditor
          {...props}
          handleEdittingClose={handleEdittingClose}
          edittingField={edittingField}
          setEdittingField={setEdittingField} />
      </TemplateDialog>
      <TemplateDialog
        maxWidth={400}
        open={open} handleClose={handleClose}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { ( sess && sess.language === 'EN' ) ? "Are you sure you want to delete?" : 'ต้องการลบหรือไม่ ?' }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            ( { selectedDeleteItem && selectedDeleteItem.fieldname } : { selectedDeleteItem && selectedDeleteItem.fieldid } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BTN.PrimaryText onClick={handleClose} className={classes.confirmButton}>
            { ( sess && sess.language === 'EN' ) ? "Cancel" : 'ยกเลิก' }
          </BTN.PrimaryText>
          <BTN.Red onClick={handleDelete} className={classes.confirmButton}>
            { ( sess && sess.language === 'EN' ) ? "Delete" : 'ลบ' }
          </BTN.Red>
        </div>
      </TemplateDialog>
    </div>
  )
}
