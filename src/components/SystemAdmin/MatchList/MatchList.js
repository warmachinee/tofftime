import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

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

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const AddMatchModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddMatchModal" */'./AddMatchModal'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: primary[900],
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
    color: primary[600]
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

export default function MatchList(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false);
  const [ editing, setEditing ] = React.useState(false)

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  async function handleRemove(d){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'matchmain', {
        action: 'remove',
        matchid: d.matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmainpage', {
        action: 'match',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(!d.status){
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
      <GoBack to='/system_admin/' />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match List
        </Box>
      </Typography>
      <div style={{ display: 'flex', margin: '24px 16px 0 16px' }}>
        <RedButton variant="contained" color="secondary"
          onClick={handleOpen}>
          <AddCircleIcon style={{ marginRight: 8 }} />
          Add match
        </RedButton>
        <div style={{ flex: 1 }} />
        <GreenTextButton color="primary" onClick={()=>setEditing(!editing)}>
          { editing? 'Done':'Remove from list' }
        </GreenTextButton>
      </div>
      <List>
        <ListItem className={classes.tableHead}>
          { window.innerWidth >= 500 &&
            <StyledText primary="Date" className={classes.tableDate} />
          }
          <StyledText inset={window.innerWidth < 700 && window.innerWidth >=450} primary="Title" className={classes.tableTitle} />
          { window.innerWidth >= 700 &&
            <StyledText inset primary="Location" className={classes.tableLocation} />
          }
          <ListItemIcon className={classes.tableAction}>
            <IconButton disabled edge="end">
              <div style={{ width: 24 }}></div>
            </IconButton>
          </ListItemIcon>
        </ListItem>
        { data &&
          API._sortArrByDate(data, 'date', 'title').map( d =>
            d &&
            <React.Fragment key={d.matchid}>
              <ListItem>
                { window.innerWidth >= 500 &&
                  <ListItemText primary={API._dateToString(d.date)} className={classes.tableDate} classes={{ primary: classes.tableDateText }} />
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
                          {API._dateToString(d.date)}
                        </Typography>
                        <br></br>
                        {d.location}
                      </React.Fragment>
                    )
                  } />
                { window.innerWidth >= 700 &&
                  <ListItemText inset primary={d.location} className={classes.tableLocation} />
                }
                <ListItemIcon className={classes.tableAction}>
                  { editing?
                    <IconButton style={{ padding: 0 }} edge="end" onClick={()=>handleRemove(d)}>
                      <DeleteIcon classes={{ root: classes.deleteIcon }} />
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
      <TemplateDialog maxWidth="md" open={open} handleClose={handleClose}>
        <AddMatchModal {...props} setData={setData} />
      </TemplateDialog>
    </div>
  );
}
