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
        )} />
    )
  },
  loading: () => null
});

export default function Course(props){
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
      setAdminState: props.setAdminState,
      toggleSetAdmin: props.toggleSetAdmin,
      createPostState: props.createPostState,
      setCreatePostState: props.setCreatePostState,
      toggleCreatePost: props.toggleCreatePost,
    })
  }

  return(
    <Switch>
      { ( sess && sess.status === 1 && sess.typeid === 'admin' ) ?
        <RouteCourseBody exact path="/system_admin/course"
          {...passingProps} />
        :
        <RouteCourseBody exact path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`}
          {...passingProps} />
      }
    </Switch>
  );
}
