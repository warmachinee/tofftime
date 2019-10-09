import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../../api'
import { primary, grey, red } from './../../../../api/palette'

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Typography,
  Divider,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,

} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

import {
  CheckCircle,
  Clear,
  Search,
  Create,
  Delete,

} from '@material-ui/icons'

import { LDCircular } from './../../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 48,
  },
  list: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: 0,
    paddingBottom: 0,
    margin: theme.spacing(2, 1),
  },
  searchGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 16,
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  editButtonGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  editButton: {
    padding: theme.spacing(1, 3),
    width: 'auto',
    marginTop: 16,
    [theme.breakpoints.up(500)]: {
      marginTop: 0,
      padding: theme.spacing(1, 4.5),
    },
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
  createIcon: {
    color: primary[600]
  },
  deleteIcon: {
    color: primary[600]
  },
  listImage: {
    width: 36,
    marginRight: 0,
    [theme.breakpoints.up(500)]: {
      width: 48,
      marginRight: 16,
    },
  },
  image: {
    width: 36,
    height: 36,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
    [theme.breakpoints.up(500)]: {
      width: 48,
      height: 48,
    },
  },

}));

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

export default function LocationList(props){
  const classes = useStyles();
  const {
    sess, token, setCSRFToken, pageOrganizer,
    selectedField, setSelectedField, handleSnackBar, setPageState, setEdittingField
  } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ searchField, setSearchField ] = React.useState('')
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(false)
  const [ editting, setEditting ] = React.useState(false)

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

  function handleEdit(d){
    setPageState('edit')
    setEdittingField(d)
  }

  function handleChangeField(e){
    if(e){
      setSearchField(e.target.value)
      if(sess){
        const socket = socketIOClient( API.getWebURL() )
        socket.emit('search-client-message', {
          action: "field",
          userid: sess.userid,
          text: e.target.value
        })
      }
    }else{
      setSearchField('')
    }
  }

  function responseField(){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      socket.on(`${sess.userid}-field-search-server-message`, (messageNew) => {
        setData(messageNew.result.infolist)
      })
    }
  }

  async function handleLoadField(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'loadusersystem', {
        ...(sess.typeid === 'admin')? { action: 'list' } : {
          action: 'fieldlist',
          ...pageOrganizer && { type: 1 }
        }
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
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
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleClose()
      }
    })
  }

  React.useEffect(()=>{
    handleLoadField()
    responseField()
  },[ open, editting ])

  return(
    <div>
      <div className={classes.searchGrid}>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            className={classes.searchBox}
            variant="outlined"
            placeholder={ !searchField? ( ( sess && sess.language === 'TH' ) ? "ค้นหา" : 'Search' ) : '' }
            value={searchField}
            onChange={handleChangeField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary"/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  { searchField?
                    <IconButton onClick={()=>handleChangeField(null)}>
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
        <div className={classes.editButtonGrid}>
          <GreenTextButton className={classes.editButton}
            variant={ editting? 'text' : 'outlined' }
            onClick={()=>setEditting(!editting)}>
            {
              editting?
              ( ( sess && sess.language === 'TH' ) ? "เสร็จ" : 'Done' )
              :
              ( ( sess && sess.language === 'TH' ) ? "แก้ไข" : 'Edit' )
            }
          </GreenTextButton>
        </div>
      </div>
      <List className={classes.list}>
        <Divider />
        { data &&
          data.map( d =>{
            return d && (
              /*onClick={()=>setSelectedField(d)}*/
              <ListField
                key={d.fieldid}
                {...props}
                data={d}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                handleEdit={handleEdit}
                handleOpen={handleOpen}
                editting={editting}
                />
            );
          })
        }
      </List>
      <TemplateDialog
        maxWidth={400}
        open={open} handleClose={handleClose}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { ( sess && sess.language === 'TH' ) ? "ต้องการลบหรือไม่ ?" : 'Are you sure you want to delete?' }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            ( { selectedDeleteItem && selectedDeleteItem.fieldname } : { selectedDeleteItem && selectedDeleteItem.fieldid } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleClose} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </GreenTextButton>
          <RedButton onClick={handleDelete} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ลบ" : 'Delete' }
          </RedButton>
        </div>
      </TemplateDialog>
    </div>
  );
}

function ListField(props){
  const classes = useStyles();
  const {
    API, sess, token, setCSRFToken, isSupportWebp,
    selectedField, setSelectedField, selectedFieldVersion, setSelectedFieldVersion,
    data, handleEdit, handleOpen, editting
  } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ fieldVersion, setFieldVersion ] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectField(d, event){
    if(d.fieldversion > 1){
      handleClick(event)
    }else{
      setSelectedField(data)
      setSelectedFieldVersion(1)
    }
  }

  function selectVersion(d){
    handleClose()
    setSelectedField(data)
    setSelectedFieldVersion(d)
  }

  async function handleFetchLoadFieldVersion(fieldid){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
        action: 'versioncount',
        fieldid: fieldid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setFieldVersion(d)
    })
  }

  React.useEffect(()=>{
    handleFetchLoadFieldVersion(data.fieldid)
  },[ ])

  return (
    <React.Fragment>
      <ListItem
        button
        style={{
          transition: '.2s',
          color: primary[900],
          ...(selectedField && selectedField.fieldid === data.fieldid) && { backgroundColor:  grey[400] }
        }}
        onClick={e =>handleSelectField(data, e)}>
        <ListItemIcon className={classes.listImage}>
          { data.photopath ?
            <img className={classes.image}
              src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toString() } />
            :
            <Skeleton className={classes.image} style={{ margin: 0 }} disableAnimate />
          }
        </ListItemIcon>
        <ListItemText primary={data.fieldname}
          {...(sess && sess.typeid !== 'admin' && data.fieldversion > 1)? { secondary: data.fieldversion + ' version' } : null } />
        { editting &&
          <ListItemSecondaryAction>
            <IconButton onClick={()=>handleEdit(data)}>
              <Create classes={{ root: classes.createIcon }} />
            </IconButton>
            <IconButton onClick={()=>handleOpen(data)}>
              <Delete classes={{ root: classes.deleteIcon }} />
            </IconButton>
          </ListItemSecondaryAction>
        }
      </ListItem>
      <Divider />
      { data && data.fieldversion > 1 &&
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          { fieldVersion &&
            fieldVersion.map( d =>
              <MenuItem key={d.createdate} onClick={()=>selectVersion(d)}>{'Version ' + d.version}</MenuItem>
            )
          }
        </Menu>
      }
    </React.Fragment>
  );
}
