import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import teal from '@material-ui/core/colors/teal';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const AddMatchModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddMatchModal" */'./AddMatchModal'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  back: {
    position: 'absolute',
    top: -12,
    left: 8,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: teal[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
  tableHead: {
    minWidth: 650,
    backgroundColor: 'black',
    borderRadius: 4
  },
  tableTitle: {
    width: '50%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  tableLocation: {
    width: '40%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  tableAction: {
    width: '5%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  tableRow: {
    //border: '1px solid'
    minWidth: 650,
  },

}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

export default function Match(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState([])
  const [ open, setOpen ] = React.useState(false);
  const [ editting, setEditting ] = React.useState(false)

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  async function handleRemove(d){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchmain', {
        action: 'remove',
        matchid: d.matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error'
      })
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
      'loadmainpage', {
        action: 'match',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <IconButton className={classes.back} >
        <ArrowBackIcon classes={{ root: classes.backIcon }}/>
      </IconButton>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match List
        </Box>
      </Typography>
      <div style={{ display: 'flex', margin: '24px 16px 0 16px' }}>
        <Button variant="contained" color="secondary"
          onClick={handleOpen}>
          <AddCircleIcon style={{ marginRight: 8 }}/>
          Add match
        </Button>
        <div style={{ flex: 1 }}></div>
        <Button color="primary" onClick={()=>setEditting(!editting)}>
          { editting? 'Done':'Edit' }
        </Button>
      </div>
      <List>
        <ListItem className={classes.tableHead}>
          <StyledText inset={ window.innerWidth > 600 } primary="Title" className={classes.tableTitle}/>
          <StyledText inset={ window.innerWidth > 600 } primary="Location" className={classes.tableLocation}/>
          <ListItemSecondaryAction className={classes.tableAction}>
            <div style={{ width: 48 }}></div>
          </ListItemSecondaryAction>
        </ListItem>
        { data &&
          data.map( d =>
            <React.Fragment key={d.matchid}>
              <ListItem className={classes.tableRow}>
                <ListItemText inset={ window.innerWidth > 600 } primary={d.title} className={classes.tableTitle}/>
                <ListItemText inset={ window.innerWidth > 600 } primary={d.location} className={classes.tableLocation}/>
                <ListItemSecondaryAction className={classes.tableAction}>
                  { editting &&
                    <IconButton edge="end" onClick={()=>handleRemove(d)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        }

      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <AddMatchModal token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar} setData={setData}/>
      </TemplateDialog>
    </div>
  );
}
