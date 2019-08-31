import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
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
    overflow: 'auto',
    maxHeight: window.innerHeight * .5
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
  const { sess, token, setCSRFToken, selectedField, setSelectedField, handleSnackBar, setPageState, setEdittingField } = props
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

  async function handleLoadField(d){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'loadusersystem', {
        ...(sess.typeid === 'admin')?
        {
          action: 'matchlist'
        } :
        {
          action: 'fieldlist',
          type: 0
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
        usertarget: selectedDeleteItem.hostid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
    })
  }

  React.useEffect(()=>{
    handleLoadField()
  },[ ])

  return(
    <div>
      <div className={classes.searchGrid}>
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.searchBox}
            variant="outlined"
            placeholder={ !searchField? "Search" : '' }
            value={searchField}
            onChange={e =>setSearchField(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary"/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  { searchField?
                    <IconButton onClick={()=>setSearchField('')}>
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
        <div className={classes.editButtonGrid}>
          <GreenTextButton className={classes.editButton}
            variant={ editting? 'text' : 'outlined' }
            onClick={()=>setEditting(!editting)}>
            { editting? 'Done' : 'Edit' }
          </GreenTextButton>
        </div>
      </div>
      <List className={classes.list}>
        <Divider />
        { data &&
          data.filter((item)=>{
              return (
                (item.fieldname.search(searchField) !== -1) ||
                (item.fieldname.toLowerCase().search(searchField.toLowerCase()) !== -1)
              )
            }).map( d =>{
            return d && (
              <React.Fragment key={d.fieldid}>
                <ListItem
                  button
                  style={{
                    transition: '.2s',
                    color: primary[900],
                    ...(selectedField && selectedField.fieldid === d.fieldid) && { backgroundColor:  grey[400] }
                  }}
                  onClick={()=>setSelectedField(d)}>
                  <ListItemText primary={d.fieldname}/>
                  { editting &&
                    <ListItemSecondaryAction>
                      <IconButton onClick={()=>handleEdit(d)}>
                        <CreateIcon classes={{ root: classes.createIcon }}/>
                      </IconButton>
                      <IconButton onClick={()=>handleOpen(d)}>
                        <DeleteIcon classes={{ root: classes.deleteIcon }}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  }
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        }
      </List>
      <TemplateDialog
        maxWidth={400}
        open={open} handleClose={handleClose}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            Are you sure you want to delete?
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            ( { selectedDeleteItem && selectedDeleteItem.fieldname } : { selectedDeleteItem && selectedDeleteItem.fieldid } )
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleClose} className={classes.confirmButton}>
            Cancel
          </GreenTextButton>
          <RedButton onClick={handleDelete} className={classes.confirmButton}>
            Delete
          </RedButton>
        </div>
      </TemplateDialog>
    </div>
  );
}
