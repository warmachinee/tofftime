import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import * as API from '../../../api'
import { ThemeProvider } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

export default function MatchClass(props) {
  const classes = useStyles();
  const { token, setCSRFToken, data, matchid, setData, handleSnackBar } = props
  const [ lists, setLists ] = React.useState([])
  const [ text, setText ] = React.useState('')
  const [ classAction, setClassAction ] = React.useState('')
  const [ arrEdit, setArrEdit ] = React.useState([])
  const [ arrEditClassno, setArrEditClassno ] = React.useState([])

  function handleAddItem(){
    if(text){
      handleFetchAdd()
    }
  }

  function handleDeleteItem(d){
    handleFetchRemove(d.classno)
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
    const newClassno = [...arrEditClassno]
    newClassname[index] = event.target.value
    newClassno[index] = data.classno
    setArrEdit(newClassname)
    setArrEditClassno(newClassno)
  }

  async function handleFetchAdd(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchsection', {
        action: 'classadd',
        matchid: matchid,
        classname: text
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error'
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }
      catch(err) {
        console.log(err.message);
      }
    })
  }

  async function handleFetchEdit(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchsection', {
        action: 'classedit',
        matchid: matchid,
        classname: arrEdit,
        classno: arrEditClassno
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error'
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }
      catch(err) {
        console.log(err.message);
      }
    })
  }

  async function handleFetchRemove(d){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchsection', {
        action: 'classremove',
        matchid: matchid,
        classno: parseInt(d)
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error'
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }
      catch(err) {
        console.log(err.message);
      }
    })
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmatch', {
        action: 'detail',
        matchid: matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(data){
      let classname = [];
      let classno = [];
      for(var i = 0;i < data.length;i++){
        classname.push(data[i].classname)
        classno.push(data[i].classno)
      }
      setArrEdit(classname)
      setArrEditClassno(classno)
      setLists(data)
    }
  },[ data ])
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Button variant="outlined" color="primary" className={classes.button} onClick={()=>setClassAction('add')}>Add</Button>
        <Button variant="outlined" color="primary" className={classes.button} onClick={()=>setClassAction('edit')}>Edit</Button>
        <Button variant="outlined" color="primary" className={classes.button} onClick={()=>setClassAction('delete')}>Remove</Button>
      </div>
      <List className={classes.root}>
        { lists &&
          lists.map( (d, i) =>{
            return(
              <ListItem key={i}>
                { classAction === 'edit' ?
                  <ThemeProvider theme={theme}>
                    <TextField
                      autoFocus
                      value={arrEdit[i]}
                      onChange={e =>handleEditClass(d, e, i)}
                    />
                  </ThemeProvider>
                  :
                  <ListItemText inset primary={d.classname} />
                }

                { classAction === 'delete' &&
                  <ListItemSecondaryAction>
                      <IconButton onClick={()=>handleDeleteItem(d)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                }
              </ListItem>
            )
          }
        )}
        { classAction === 'add' &&
          <ListItem>
            <ListItemIcon>
              <IconButton onClick={handleAddItem}>
                <AddCircleIcon />
              </IconButton>
            </ListItemIcon>
            <ThemeProvider theme={theme}>
              <TextField
                autoFocus
                value={text}
                onChange={e =>setText(e.target.value)}
                onKeyPress={e =>handleKeyPress(e.key)}
              />
            </ThemeProvider>
          </ListItem>
        }
      </List>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
