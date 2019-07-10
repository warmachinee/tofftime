import React from 'react';
import Loadable from 'react-loadable';
import { Route, Link } from "react-router-dom";
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
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

import { LDCircular } from '../../loading/LDCircular'

const CreateMatch = Loadable({
  loader: () => import(/* webpackChunkName: "CreateMatch" */'./CreateMatch'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  back: {
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
  tableRow: {
    //border: '1px solid'
    minWidth: 650,
  },
  tableDate: {
    width: 120,
  },
  tableView: {
    width: 60,
    textAlign: 'center'
  },
  tableDateText: {
    fontStyle: 'oblique',
    fontFamily: 'monospace'
  },
  tableTitle: {
    width: '60%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  tableLocation: {
    width: '40%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  checkbox: {
    position: 'absolute',
    left: 8
  }
}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

export default function MatchBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)

  async function handleSetDisplay(d){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'displaymatchsystem', {
        action: 'match',
        matchid: d.matchid
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error'
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
        action: 'list',
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
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match
        </Box>
      </Typography>
      <CreateMatch MBSetData={setData} token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
      <div style={{ display: 'flex', margin: '24px 16px 0 0' }}>
        <div style={{ flex: 1 }}></div>
        <Button color="primary" onClick={()=>setEditting(!editting)}>
          { editting? 'Done':'Edit Display'}
        </Button>
      </div>
      <List style={{ overflow: 'auto' }}>
        { editting?
          <ListItem key="Table Head" className={classes.tableHead}>
            <ListItemIcon>
              <div style={{ width: 42 }}></div>
            </ListItemIcon>
            <StyledText inset={ window.innerWidth > 600 } primary="Title" className={classes.tableTitle}/>
          </ListItem>
          :
          <ListItem key="Table Head" className={classes.tableHead}>
            <StyledText primary="Date" className={classes.tableDate}/>
            <StyledText primary="Views" className={classes.tableView}/>
            <StyledText inset={ window.innerWidth > 600 } primary="Title" className={classes.tableTitle}/>
            <StyledText inset={ window.innerWidth > 600 } primary="Location" className={classes.tableLocation}/>
          </ListItem>
        }

        {data && !data.status &&
          data.map( (d, i) =>
            editting?
              (d &&
              <React.Fragment key={i}>
                <ListItem key={d.matchid} button className={classes.tableRow} onClick={()=>handleSetDisplay(d)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={d.display === 1}
                      tabIndex={-1}
                      disableRipple/>
                  </ListItemIcon>
                  <ListItemText inset={ window.innerWidth > 600 } primary={d.title} className={classes.tableTitle}/>
                </ListItem>
                <Divider />
              </React.Fragment>
              ):
              (d &&
              <React.Fragment key={i}>
                <Link to={`/user/match/${d.matchid}`} className={classes.linkElement}>
                  <ListItem key={d.matchid} button className={classes.tableRow}>
                    <ListItemText primary={d.date} className={classes.tableDate} classes={{ primary: classes.tableDateText }}/>
                    <ListItemText primary={d.views} className={classes.tableView}/>
                    <ListItemText inset={ window.innerWidth > 600 } primary={d.title} className={classes.tableTitle}/>
                    <ListItemText inset={ window.innerWidth > 600 } primary={d.location} className={classes.tableLocation}/>
                  </ListItem>
                </Link>
                <Divider />
              </React.Fragment>
          ))
        }
      </List>
    </div>
  )
}
