import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import { LDCircular } from '../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 48,
    maxHeight: window.innerHeight * .8
  },
}));

export default function LocationList(props){
  const classes = useStyles();
  const { token, setCSRFToken, setSelectedField, handleSnackBar } = props
  const [ data, setData ] = React.useState([])
  const [ open, setOpen ] = React.useState(false)
  const [ editting, setEditting ] = React.useState(false)
  const [ selected, setSelected ] = React.useState('')

  function handleDelete(){
    handleDeleteField()
  }

  function handleOpen(d){
    setOpen(true)
    setSelected(d)
  }

  function handleClose(){
    setOpen(false)
  }

  async function handleLoadField(d){
    await API.xhrPost(
      props.token,
      'adminloadfield', {
        action: 'list'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleDeleteField(){
    await API.xhrPost(
      props.token,
      'adminfieldsystem', {
        action: 'delete',

    }, (csrf, d) =>{
      setCSRFToken(csrf)
    })
  }

  React.useEffect(()=>{
    handleLoadField()
  },[ ])

  return(
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}></div>
        <Button onClick={()=>setEditting(!editting)}>Edit</Button>
      </div>
      <List>
        { data &&
          data.map( d =>
            <ListItem key={d.fieldid} button onClick={()=>setSelectedField(d)}>
              <ListItemText primary={d.fieldname}/>
              { editting &&
                <ListItemSecondaryAction>
                  <IconButton onClick={()=>handleOpen(d)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              }
            </ListItem>
          )
        }
      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <div>Are you sure you want to delete {selected && selected.fieldname}?</div>
          <div style={{ display: 'flex', marginTop: 48, marginBottom: 16 }}>
            <Button fullWidth onClick={handleClose}>Cancel</Button>
            <Button fullWidth variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
          </div>
      </TemplateDialog>
    </div>
  );
}
