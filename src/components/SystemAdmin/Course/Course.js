import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from "react-router-dom";

const RouteCourseBody = Loadable.Map({
  loader: {
    CourseBody: () => import(/* webpackChunkName: "CourseBody" */'./CourseBody'),
  },
  render(loaded, props) {
    let Component = loaded.CourseBody.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )}/>
    )
  },
  loading: () => null
});

export default function Course(props){
  const { sess } = props

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
      createPageState: props.createPageState,
      toggleCreatePage: props.toggleCreatePage,
      createMatchState: props.createMatchState,
      toggleCreateMatch: props.toggleCreateMatch,
      historyState: props.historyState,
      toggleHistory: props.toggleHistory,
      upcomingState: props.upcomingState,
      toggleUpcoming: props.toggleUpcoming
    })
  }

  return(
    <Switch>
      { ( sess && sess.status === 1 && sess.typeid === 'admin' ) ?
        <RouteCourseBody exact path="/admin/course"
          {...passingProps} />
        :
        <RouteCourseBody exact path="/user/management/course"
          {...passingProps} />
      }
    </Switch>
  );
}
