import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Route } from "react-router-dom";
import * as API from './../api'
import { primary, blueGrey, red } from './../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import { LDMatchList } from './../components/loading/LDMatchList';
import { LDCircular } from './../components/loading/LDCircular';

const RouteUserPageBody = Loadable.Map({
  loader: {
    UserPageBody: () => import(/* webpackChunkName: "UserPageBody" */'./UserPageBody'),
  },
  render(loaded, props) {
    let Component = loaded.UserPageBody.default;
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

const RouteAnnouncement = Loadable.Map({
  loader: {
    Announcement: () => import(/* webpackChunkName: "Announcement" */'./../components/Dashboard/Announcement/Announcement'),
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
    News: () => import(/* webpackChunkName: "MatchList" */'./../components/Dashboard/News/News'),
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
    MatchList: () => import(/* webpackChunkName: "MatchList" */'./../components/Dashboard/MatchList/MatchList'),
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
    Match: () => import(/* webpackChunkName: "Match" */'./../components/Dashboard/Match/Match'),
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
    User: () => import(/* webpackChunkName: "User" */'./../components/Dashboard/User/User'),
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

const RoutePagePost = Loadable.Map({
  loader: {
    PagePost: () => import(/* webpackChunkName: "PagePost" */'./../components/Page/PagePost'),
  },
  render(loaded, props) {
    let Component = loaded.PagePost.default;
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

const RoutePageEditor = Loadable.Map({
  loader: {
    PageEditor: () => import(/* webpackChunkName: "PageEditor" */'./../components/Page/PageEditor'),
  },
  render(loaded, props) {
    let Component = loaded.PageEditor.default;
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

}))

export default function UserPage(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, setHPageData } = props

  const passingProps = {
    sess: sess,
    token: token,
    setCSRFToken: setCSRFToken,
    handleSnackBar: handleSnackBar,
    isSupportWebp: isSupportWebp,
    setHPageData: setHPageData
  }

  return (
    <Paper className={classes.root}>
      <RouteUserPageBody exact path={`/user`} {...passingProps}/>
      <RouteAnnouncement path={`/user/announce`} {...passingProps}/>
      <RouteNews path={`/user/news`} {...passingProps}/>
      <RouteMatchList path={`/user/matchlist`} {...passingProps}/>
      <RouteMatch path={`/user/match/:pageParam`} {...passingProps}/>
      <RouteUser path={`/user/user`} {...passingProps}/>
      <RoutePagePost path="/user/post/:pageParam" {...passingProps}/>
      <RoutePageEditor path="/user/page/:pageParam" {...passingProps}/>
    </Paper>
  );
}
