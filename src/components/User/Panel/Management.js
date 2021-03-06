import React from 'react';
import Loadable from 'react-loadable';
import { Route, Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { primary, grey } from './../../../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const RouteMatch = Loadable.Map({
  loader: {
    Match: () => import(/* webpackChunkName: "Match" */'./../../SystemAdmin/Match/Match'),
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
    Course: () => import(/* webpackChunkName: "Course" */'./../../SystemAdmin/Course/Course'),
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

const RoutePostManagement = Loadable.Map({
  loader: {
    PostManagement: () => import(/* webpackChunkName: "PostManagement" */'./../PageOrganizer/PostManagement'),
  },
  render(loaded, props) {
    let Component = loaded.PostManagement.default;
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
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(0, 2),
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

export default function Management(props) {
  const classes = useStyles();
  const { API, sess, pageOrganizer, pageData } = props

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
    location: props.location,
    pageid: props.pageid,
    pageOrganizer: props.pageOrganizer,
    pageData: props.pageData,
    ...(sess && sess.typeid !== 'admin' && {
      open: props.open,
      handleDrawerClick: props.handleDrawerClick,
      handleDrawerOpen: props.handleDrawerOpen,
      handleDrawerClose: props.handleDrawerClose,
      notiState: props.notiState,
      toggleNoti: props.toggleNoti,
    })
  }

  function SystemComponent(){
    return (sess && sess.status === 1) && (
      <React.Fragment>
        <LabelText text={ API._getWord(sess && sess.language).Management } />
        <div style={{ marginTop: 36 }}>
          <Link to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              { API._getWord(sess && sess.language).Match }
            </StyledButton>
          </Link>
          <Link to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`} className={classes.linkElement}>
            <StyledButton variant="contained" color="primary" className={classes.button}>
              { API._getWord(sess && sess.language).Course }
            </StyledButton>
          </Link>
          { pageOrganizer &&
            <Link to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/post`} className={classes.linkElement}>
              <StyledButton variant="contained" color="primary" className={classes.button}>
                { API._getWord(sess && sess.language).Post }
              </StyledButton>
            </Link>
          }
        </div>
      </React.Fragment>
    )
  }

  React.useEffect(()=>{
    document.title = `Management - T-off Time`
  },[ window.location.pathname ])

  return (
    <div className={classes.root}>
      { (sess && sess.status === 1) &&
        <React.Fragment>
          <Route exact path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`} component={SystemComponent} />
          <RouteMatch path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`} {...passingProps} />
          <RouteCourse path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`} {...passingProps} />
          { pageOrganizer &&
            <RoutePostManagement path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/post`} {...passingProps} />
          }
        </React.Fragment>
      }
    </div>
  );
}
