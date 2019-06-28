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
    backgroundColor: 'black',
    borderRadius: 4
  },
  tableRow: {
    //border: '1px solid'
  },
  tableDate: {
    width: 120,
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
  const { token, setCSRFToken, handleSelected, selected } = props
  const [ data, setData ] = React.useState([])


  async function handleFetch(){
    const newToken = await token? token : API.xhrGet('main')
    await API.xhrPost(
      token? token : newToken,
      'adminloadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      console.log(d);
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
        <ArrowBackIcon classes={{ root: classes.backIcon }} onClick={()=>window.history.go(-1)}/>
      </IconButton>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match
        </Box>
      </Typography>
      <List>
        <ListItem key="Table Head" className={classes.tableHead}>
          <StyledText inset primary="Date" className={classes.tableDate}/>
          <StyledText inset primary="Title" className={classes.tableTitle}/>
          <StyledText inset primary="Location" className={classes.tableLocation}/>
        </ListItem>

        {data && !data.status &&
          data.map( (d, i) =>
            <React.Fragment key={i}>
              <Link to='/user/match/editor' className={classes.linkElement}>
                <ListItem key={d.matchid} button className={classes.tableRow} onClick={()=>handleSelected(d)}>
                  <ListItemText inset primary={d.date} className={classes.tableDate} classes={{ primary: classes.tableDateText }}/>
                  <ListItemText inset primary={d.title} className={classes.tableTitle}/>
                  <ListItemText inset primary={d.location} className={classes.tableLocation}/>
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
