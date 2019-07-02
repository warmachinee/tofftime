import React from 'react';
import Loadable from 'react-loadable';
import { Route, Link } from "react-router-dom";
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../api'

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

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

import { LDCircular } from '../loading/LDCircular'

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
  const { token, setCSRFToken, handleSnackBar, handleSelected, selected } = props
  const [ data, setData ] = React.useState([])


  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'adminloadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      //console.log(d);
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])
  return(
    <div className={classes.root}>
      <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
        <ArrowBackIcon classes={{ root: classes.backIcon }} />
      </IconButton>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match
        </Box>
      </Typography>
      <CreateMatch MBSetData={setData} token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
      <List style={{ overflow: 'auto' }}>
        <ListItem key="Table Head" className={classes.tableHead}>
          <StyledText primary="Date" className={classes.tableDate}/>
          <StyledText primary="Views" className={classes.tableView}/>
          <StyledText inset={ window.innerWidth > 600 } primary="Title" className={classes.tableTitle}/>
          <StyledText inset={ window.innerWidth > 600 } primary="Location" className={classes.tableLocation}/>
        </ListItem>

        {data && !data.status &&
          data.map( (d, i) =>
            <React.Fragment key={i}>
              <Link to='/user/match/editor' className={classes.linkElement}>
                <ListItem key={d.matchid} button className={classes.tableRow} onClick={()=>handleSelected(d)}>
                  <ListItemText primary={d.date} className={classes.tableDate} classes={{ primary: classes.tableDateText }}/>
                  <ListItemText primary={d.views} className={classes.tableView}/>
                  <ListItemText inset={ window.innerWidth > 600 } primary={d.title} className={classes.tableTitle}/>
                  <ListItemText inset={ window.innerWidth > 600 } primary={d.location} className={classes.tableLocation}/>
                </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
          )
        }
      </List>
    </div>
  )
}
