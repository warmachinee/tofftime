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

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
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
  const { COLOR, sess, token, setCSRFToken, data, matchid, setData, handleSnackBar } = props
  const [ lists, setLists ] = React.useState([])
  const [ text, setText ] = React.useState('')
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ classAction, setClassAction ] = React.useState('')
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
        classname: text
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        if(data.scorematch === 0){
          setText('')
        }
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
        classno: arrEditClassno
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
        }
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
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
        classno: parseInt(d)
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
        if(data.scorematch !== 0){
          let classColor = []
          for(var j = 0;j < data.class.length;j++){
            classColor.push(data.class[j].color)
          }
          setArrEditColor(classColor)
        }
      }
    }
  },[ data ])

  function ListColorSelector(props){
    const { index } = props
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ buttonHover, setButtonHover ] = React.useState(null)

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
          color: color
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
        <Button variant="outlined" onClick={handleMenuClick}
          style={{
            marginLeft: 8,
            color: ( arrEditColor[index] !=='' && arrEditColor[index] !=='none' ) ? COLOR[arrEditColor[index]][600] : COLOR.grey[600] ,
            backgroundColor: buttonHover ? ( ( arrEditColor[index] !=='' && arrEditColor[index] !=='none' ) ? COLOR[arrEditColor[index]][100] : COLOR.grey[100] ) : 'inherit',
            transition: '.2s',
            padding: 8
          }}
          onMouseEnter={()=>setButtonHover(true)}
          onMouseLeave={()=>setButtonHover(false)}>
          { ( arrEditColor[index] !=='' && arrEditColor[index] !=='none' ) ?
            <div style={{
                width: 16, height: 16,
                backgroundColor: COLOR[arrEditColor[index]][600],
                borderRadius: '50%',
                boxSizing: 'border-box'
              }} />
            :
            'No Color'
          }
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
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

  function ButtonVariant(props) {
    const { variant, classAction } = props
    const textInButton = {
      add: ( ( sess && sess.language === 'TH' ) ? "เพิ่ม" : 'Add' ),
      edit: ( ( sess && sess.language === 'TH' ) ? "แก้ไข" : 'Edit' ),
      delete: ( ( sess && sess.language === 'TH' ) ? "ลบ" : 'Remove' )
    }
    return (
      <React.Fragment>
        { classAction === variant ?
          <GreenButton className={classes.button} onClick={()=>setClassAction('')}>
            {textInButton[variant]}
          </GreenButton>
          :
          <GreenTextButton variant="outlined" className={classes.button} onClick={()=>setClassAction(variant)}>
            {textInButton[variant]}
          </GreenTextButton>
        }
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className={classes.controls}>
        <ButtonGroup fullWidth>
          <ButtonVariant variant="add" classAction={classAction} />
          <ButtonVariant variant="edit" classAction={classAction} />
          <ButtonVariant variant="delete" classAction={classAction} />
        </ButtonGroup>
      </div>
      <List className={classes.root}>
        { lists && lists.length === 0 && data &&
          <ListItem>
            <ListItemText
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: primary[900] }}
              primary={function(){
                switch (data.scorematch) {
                  case 0:
                    return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No flight'
                    break;
                  case 1:
                    return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No class'
                    break;
                  default:
                    return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No Team'
                }
              }()} />
          </ListItem>
        }
        { lists && ( classAction === '' || classAction === 'add' ) &&
          lists.map( (d, i) =>{
            return d && (
              <ListItem key={i}>
                <ListItemText primary={ data.scorematch === 0? (
                    arrEdit[i] + '  -  ' + ( ( i + 1 >= arrEdit.length )? 'Up' : arrEdit[i + 1] - 1 )
                  ) : d.classname } />
                { data.scorematch !== 0 &&
                  <ListItemIcon>
                    <ListColorSelector index={i} />
                  </ListItemIcon>
                }
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
                type={ data.scorematch === 0? 'number' : 'text' }
                helperText={function(){
                  switch (data.scorematch) {
                    case 0:
                      return ( sess && sess.language === 'TH' ) ? 'ใส่ตัวเลข (HC)' : 'Please input number (HC).'
                      break;
                    case 1:
                      return ( sess && sess.language === 'TH' ) ? 'ใส่ชื่อประเภท' : 'Please input class name.'
                      break;
                    default:
                      return  ( sess && sess.language === 'TH' ) ? 'ใส่ชื่อทีม' : 'Please input team name.'
                  }
                }()}
                onChange={e =>setText(e.target.value)}
                onKeyPress={e =>handleKeyPress(e.key)}
              />
            </ThemeProvider>
            <ListItemIcon className={classes.addClassButtonGrid}>
              <GreenTextButton disabled={!text} className={classes.addClassButton} variant="outlined" onClick={handleAddItem}>
                <AddCircleIcon style={{ marginRight: 12 }} />
                { ( sess && sess.language === 'TH' ) ? "เพิ่ม" : 'Add' }
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
                    onKeyPress={e => ( e.key === 'Enter' )? handleSave() : console.log() }
                  />
                </ThemeProvider>
                { data.scorematch === 0 &&
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ marginTop: 'auto', marginBottom: 8, textAlign: 'center', width: 64 }}> {
                        ( sess && sess.language === 'TH' ) ? 'ถึง' : 'to'
                      } </div>
                    <TextField
                      disabled
                      fullWidth
                      value={ ( i + 1 >= arrEdit.length )? 'Up' : arrEdit[i + 1] - 1 }
                    />
                  </div>
                }
                { data.scorematch !== 0 &&
                  <ListColorSelector index={i} />
                }
              </ListItem>
            )
          }
        )}
        { lists && classAction === 'delete' &&
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
        )}
      </List>
      { classAction === 'edit' && lists && lists.length > 0 && data &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenButton className={classes.saveButton} onClick={handleSave}>
            { ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save' }
          </GreenButton>
        </div>
      }
      <TemplateDialog
        maxWidth={400}
        open={confirmDeleteState} handleClose={handleConfirmCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { ( sess && sess.language === 'TH' ) ? "ต้องการลบหรือไม่ ?" : 'Are you sure you want to delete?' }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            ( { ( sess && sess.language === 'TH' ) ? "ประเภท" : 'Class' } : { selectedDeleteItem && selectedDeleteItem.classname } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmCancel} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </GreenTextButton>
          <RedButton onClick={handleConfirmDelete} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ลบ" : 'Delete' }
          </RedButton>
        </div>
      </TemplateDialog>
    </div>
  );
}
