import React from 'react';
import Loadable from 'react-loadable';
import { Route, Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../loading/LDCircular'

const RouteMatchList = Loadable.Map({
  loader: {
    MatchList: () => import(/* webpackChunkName: "MatchList" */'./MatchList/MatchList'),
  },
  render(loaded, props) {
    let Component = loaded.MatchList.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )}/>
    )
  },
  loading: () => <LDCircular />
});

const RouteMatch = Loadable.Map({
  loader: {
    Match: () => import(/* webpackChunkName: "Match" */'./Match/Match'),
  },
  render(loaded, props) {
    let Component = loaded.Match.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )}/>
    )
  },
  loading: () => <LDCircular />
});


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
  },
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  button: {
    width: '100%',
    margin: '4px 0',
    padding: theme.spacing(1, 0),
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(2, 0),
    },
  },
}))

const StyledButton = withStyles(theme => ({
  root: {
    fontWeight: 700,
    fontSize: 18,
    color: teal[900],
    backgroundColor: teal[100],
    '&:hover': {
      backgroundColor: teal[300],
    },
  },
}))(Button);

export default function Dashboard(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props

  function SystemComponent(){
    return(
      <div>
        <div style={{ marginTop: 36 }}>
          <Link to='/user/announcement' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Announcement
            </StyledButton>
          </Link>
          <Link to='/user/news' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              News
            </StyledButton>
          </Link>
          <Link to='/user/matchlist' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Match List
            </StyledButton>
          </Link>
        </div>
        <div style={{ marginTop: 36 }}>
          <Link to='/user/match' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Match
            </StyledButton>
          </Link>
          <Link to='/user/course' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Course
            </StyledButton>
          </Link>
          <Link to='/user/user' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              User
            </StyledButton>
          </Link>
          <Link to='/user/page' className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Page
            </StyledButton>
          </Link>
        </div>
      </div>
    )
  }
  return(
    <Paper className={classes.root}>
      <Route exact path='/user' component={SystemComponent} />
      <RouteMatchList path='/user/matchlist' token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
      <RouteMatch path='/user/match' token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
    </Paper>
  );
}
