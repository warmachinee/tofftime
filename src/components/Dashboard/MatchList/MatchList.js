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
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
  loading: () => <LDCircular />
});

const AddMatchModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddMatchModal" */'./AddMatchModal'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'../../GoBack'),
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
  tableHead: {
    backgroundColor: grey[900],
  },
  tableDate: {
    width: 120,
  },
  tableDateText: {
    fontStyle: 'oblique',
    fontFamily: 'monospace'
  },
  tableTitle: {
    width: '100%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    [theme.breakpoints.up(700)]: {
      width: '50%',
    },
  },
  tableLocation: {
    width: '40%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  tableAction: {
    width: '10%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    justifyContent: 'center'
  },
  deleteIcon: {
    color: teal[600]
  },

}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

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
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
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

export default function Match(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
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
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
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

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match List
        </Box>
      </Typography>
      <div style={{ display: 'flex', margin: '24px 16px 0 16px' }}>
        <RedButton variant="contained" color="secondary"
          onClick={handleOpen}>
          <AddCircleIcon style={{ marginRight: 8 }}/>
          Add match
        </RedButton>
        <div style={{ flex: 1 }} />
        <GreenTextButton color="primary" onClick={()=>setEditting(!editting)}>
          { editting? 'Done':'Remove from list' }
        </GreenTextButton>
      </div>
      <List>
        <ListItem className={classes.tableHead}>
          { window.innerWidth >= 500 &&
            <StyledText primary="Date" className={classes.tableDate}/>
          }
          <StyledText inset={window.innerWidth < 700 && window.innerWidth >=450} primary="Title" className={classes.tableTitle}/>
          { window.innerWidth >= 700 &&
            <StyledText inset primary="Location" className={classes.tableLocation}/>
          }
          <ListItemIcon className={classes.tableAction}>
            <IconButton disabled edge="end">
              <div style={{ width: 24 }}></div>
            </IconButton>
          </ListItemIcon>
        </ListItem>
        { data &&
          API.handleSortArray(data, 'date', 'title').map( d =>
            d &&
            <React.Fragment key={d.matchid}>
              <ListItem>
                { window.innerWidth >= 500 &&
                  <ListItemText primary={d.date} className={classes.tableDate} classes={{ primary: classes.tableDateText }}/>
                }
                <ListItemText inset={window.innerWidth < 700 && window.innerWidth >=450} primary={d.title} className={classes.tableTitle}
                  secondary={
                    window.innerWidth < 700 &&
                    (
                      window.innerWidth >= 500?
                      d.location
                      :
                      <React.Fragment>
                        <Typography
                          style={{ fontStyle: 'oblique' }}
                          component="span"
                          variant="caption"
                          color="textPrimary"
                        >
                          {d.date}
                        </Typography>
                        <br></br>
                        {d.location}
                      </React.Fragment>
                    )
                  }/>
                { window.innerWidth >= 700 &&
                  <ListItemText inset primary={d.location} className={classes.tableLocation}/>
                }
                <ListItemIcon className={classes.tableAction}>
                  { editting?
                    <IconButton style={{ padding: 0 }} edge="end" onClick={()=>handleRemove(d)}>
                      <DeleteIcon classes={{ root: classes.deleteIcon }}/>
                    </IconButton>
                    :
                    <IconButton disabled edge="end">
                      <div style={{ width: 24 }}></div>
                    </IconButton>
                  }
                </ListItemIcon>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        }

      </List>
      <TemplateDialog maxWidth={700} open={open} handleClose={handleClose}>
        <AddMatchModal token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar} setData={setData}/>
      </TemplateDialog>
    </div>
  );
}
