import React from 'react';
import Loadable from 'react-loadable';
import { Route, Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { primary, grey } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { LDCircular } from './../loading/LDCircular'

const RouteAnnouncement = Loadable.Map({
  loader: {
    Announcement: () => import(/* webpackChunkName: "Announcement" */'./Announcement/Announcement'),
  },
  render(loaded, props) {
    let Component = loaded.Announcement.default;
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

const RouteNews = Loadable.Map({
  loader: {
    News: () => import(/* webpackChunkName: "MatchList" */'./News/News'),
  },
  render(loaded, props) {
    let Component = loaded.News.default;
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

const RouteUser = Loadable.Map({
  loader: {
    User: () => import(/* webpackChunkName: "User" */'./User/User'),
  },
  render(loaded, props) {
    let Component = loaded.User.default;
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
    color: primary[900],
    backgroundColor: primary[100],
    '&:hover': {
      backgroundColor: primary[300],
    },
  },
}))(Button);

export default function Dashboard(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props

  const passingProps = {
    sess: sess,
    token: token,
    setCSRFToken: setCSRFToken,
    handleSnackBar: handleSnackBar,
    isSupportWebp: isSupportWebp
  }

  function SystemComponent(){
    return sess && sess.status === 1 && (
      <React.Fragment>
        <div style={{ marginTop: 36 }}>
          <Link to={`/admin/announce`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Announcement
            </StyledButton>
          </Link>
          <Link to={`/admin/news`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              News
            </StyledButton>
          </Link>
          <Link to={`/admin/matchlist`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Match List
            </StyledButton>
          </Link>
        </div>
        <div style={{ marginTop: 36 }}>
          <Link to={`/admin/match`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Match
            </StyledButton>
          </Link>
          <Link to={`/admin/course`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Course
            </StyledButton>
          </Link>
          <Link to={`/admin/user`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              User
            </StyledButton>
          </Link>
          <Link to={`/admin/page`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Page
            </StyledButton>
          </Link>
        </div>
      </React.Fragment>
    )
  }

  return(
    <Paper className={classes.root}>
      { sess && sess.status === 1 &&
        <React.Fragment>
          <Route exact path={`/admin`} component={SystemComponent} />
          <RouteAnnouncement path={`/admin/announce`} {...passingProps}/>
          <RouteNews path={`/admin/news`} {...passingProps}/>
          <RouteMatchList path={`/admin/matchlist`} {...passingProps}/>
          <RouteMatch path={`/admin/match`} {...passingProps}/>
          <RouteUser path={`/admin/user`} {...passingProps}/>
        </React.Fragment>
      }
    </Paper>
  );
}
