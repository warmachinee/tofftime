import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import * as API from '../../../api'
import { ThemeProvider } from '@material-ui/styles';

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

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'../TemplateDialog'),
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
    textAlign: 'center', color: teal[900],
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
    color: teal[600]
  },
  deleteIcon: {
    color: teal[600]
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
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[600],
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

export default function LocationList(props){
  const classes = useStyles();
  const { token, setCSRFToken, selectedField, setSelectedField, handleSnackBar, setPageState, setEdittingField } = props
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
    await API.xhrPost(
      props.token,
      'loadfield', {
        action: 'list'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleDeleteField(){
    await API.xhrPost(
      props.token,
      'fieldsystem', {
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
    /*
    var json = '[{"fullname":"fieldtest","lastname":"fieldtest","fieldid":216084,"fieldname":"testA","hostid":487614,"custom":0,"totalcord":2,"picture":null,"type":0},{"fullname":"fieldtest","lastname":"fieldtest","fieldid":231839,"fieldname":"testB","hostid":966207,"custom":0,"totalcord":2,"picture":null,"type":0},{"fullname":"fieldtest","lastname":"fieldtest","fieldid":669528,"fieldname":"testC","hostid":106916,"custom":0,"totalcord":2,"picture":null,"type":0},{"fullname":"fieldtest","lastname":"fieldtest","fieldid":104554,"fieldname":"testD","hostid":974619,"custom":0,"totalcord":2,"picture":null,"type":0},{"fullname":"fieldtest","lastname":"fieldtest","fieldid":612992,"fieldname":"testE","hostid":705509,"custom":0,"totalcord":2,"picture":null,"type":0},{"fullname":"fieldtest","lastname":"fieldtest","fieldid":378585,"fieldname":"testF","hostid":101785,"custom":0,"totalcord":2,"picture":null,"type":0},{"fullname":"test","lastname":"test","fieldid":434635,"fieldname":"aaa","hostid":383492,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"test","lastname":"test","fieldid":688619,"fieldname":"CustomFieldTest","hostid":383492,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"test","lastname":"test","fieldid":746465,"fieldname":"TestUpdateField","hostid":383492,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"test","lastname":"test","fieldid":778827,"fieldname":"06.28","hostid":383492,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"test","lastname":"test","fieldid":954225,"fieldname":"popo","hostid":383492,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":127238,"fieldname":"Northern Rangsit Golf Club","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":208213,"fieldname":"BANGKOK GOLF CLUB","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":235332,"fieldname":"Uniland Golf and Country Club","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":501938,"fieldname":"Field 1752","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":514152,"fieldname":"Royal Irri Gation","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":631932,"fieldname":"Watermill GOLF&GARDENS","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":653924,"fieldname":"Muang Ake Golf Club","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":758948,"fieldname":"BANGKOK GOLF CLUB","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"เอกชัย","lastname":"ปัตถาวโร ","fieldid":891849,"fieldname":"BANGKOK GOLF CLUB","hostid":659293,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"thanapat","lastname":"taweerat","fieldid":567595,"fieldname":"Test Create Field","hostid":123456,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"thanapat","lastname":"taweerat","fieldid":953458,"fieldname":"TestFieldJames","hostid":123456,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"Jack","lastname":"Dawson","fieldid":785896,"fieldname":"DocWich","hostid":511165,"custom":1,"totalcord":2,"picture":null,"type":0},{"fullname":"Jack","lastname":"Dawson","fieldid":798744,"fieldname":"สนามกอล์ฟไพน์เฮิทร์ กอล์ฟ แอนด์ คันทรี่ คลับ","hostid":511165,"custom":1,"totalcord":2,"picture":null,"type":0}]';
    var obj = JSON.parse(json);
    setData(obj)
    */
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
                    color: teal[900],
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
            Are you sure to delete?
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
