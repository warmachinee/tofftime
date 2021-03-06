import React from 'react';
import Loadable from 'react-loadable';
import { Route, Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { primary, grey } from './../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const RouteAnnouncement = Loadable.Map({
  loader: {
    Announcement: () => import(/* webpackChunkName: "Announcement" */'./../components/SystemAdmin/Announcement/Announcement'),
  },
  render(loaded, props) {
    let Component = loaded.Announcement.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteNews = Loadable.Map({
  loader: {
    News: () => import(/* webpackChunkName: "News" */'./../components/SystemAdmin/News/News'),
  },
  render(loaded, props) {
    let Component = loaded.News.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteMatchList = Loadable.Map({
  loader: {
    MatchList: () => import(/* webpackChunkName: "MatchList" */'./../components/SystemAdmin/MatchList/MatchList'),
  },
  render(loaded, props) {
    let Component = loaded.MatchList.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteAdminPageList = Loadable.Map({
  loader: {
    PageList: () => import(/* webpackChunkName: "PageList" */'./../components/SystemAdmin/Page/PageList'),
  },
  render(loaded, props) {
    let Component = loaded.PageList.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteMatch = Loadable.Map({
  loader: {
    Match: () => import(/* webpackChunkName: "Match" */'./../components/SystemAdmin/Match/Match'),
  },
  render(loaded, props) {
    let Component = loaded.Match.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteCourse = Loadable.Map({
  loader: {
    Course: () => import(/* webpackChunkName: "Course" */'./../components/SystemAdmin/Course/Course'),
  },
  render(loaded, props) {
    let Component = loaded.Course.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteUser = Loadable.Map({
  loader: {
    User: () => import(/* webpackChunkName: "User" */'./../components/SystemAdmin/User/User'),
  },
  render(loaded, props) {
    let Component = loaded.User.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteEntireLog = Loadable.Map({
  loader: {
    EntireLog: () => import(/* webpackChunkName: "EntireLog" */'./../components/SystemAdmin/Log/EntireLog'),
  },
  render(loaded, props) {
    let Component = loaded.EntireLog.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
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


}));

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

export default function SystemAdmin(props) {
  const classes = useStyles();
  const { API, sess } = props

  const passingProps = {
    API: props.API,
    COLOR: props.COLOR,
    BTN: props.BTN,
    sess: props.sess,
    handleSess: props.handleSess,
    accountData: props.accountData,
    handleAccountData: props.handleAccountData,
    token: props.token,
    setCSRFToken: props.setCSRFToken,
    isSupportWebp: props.isSupportWebp,
    handleSnackBar: props.handleSnackBar,
    location: props.location
  }

  //const passingProps = { ...API.objectException(props, ['path'])}

  function SystemComponent(){
    return sess && sess.status === 1 && (
      <React.Fragment>
        <div style={{ marginTop: 36 }}>
          <Link to={`/system_admin/announce`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Announcement
            </StyledButton>
          </Link>
          <Link to={`/system_admin/news`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              News
            </StyledButton>
          </Link>
          <Link to={`/system_admin/matchlist`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Match List
            </StyledButton>
          </Link>
          <Link to={`/system_admin/page`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Page
            </StyledButton>
          </Link>
        </div>
        <div style={{ marginTop: 36 }}>
          <Link to={`/system_admin/match`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Match
            </StyledButton>
          </Link>
          <Link to={`/system_admin/course`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Course
            </StyledButton>
          </Link>
          <Link to={`/system_admin/log`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              Log
            </StyledButton>
          </Link>
        </div>
      </React.Fragment>
    )
  }

  React.useEffect(()=>{

  },[ ])

  return (
    <Paper className={classes.root}>
      { sess && sess.status === 1 &&
        <React.Fragment>
          <Route exact path={`/system_admin`} component={SystemComponent} />
          <RouteAnnouncement path={`/system_admin/announce`} {...passingProps} />
          <RouteNews path={`/system_admin/news`} {...passingProps} />
          <RouteMatchList path={`/system_admin/matchlist`} {...passingProps} />
          <RouteAdminPageList path={`/system_admin/page`} {...passingProps} />

          <RouteMatch path={`/system_admin/match`} {...passingProps} />
          <RouteCourse path={`/system_admin/course`} {...passingProps} />
          <RouteUser path={`/system_admin/user`} {...passingProps} />
          <RouteEntireLog path={`/system_admin/log`} {...passingProps} />
        </React.Fragment>
      }
    </Paper>
  );
}
