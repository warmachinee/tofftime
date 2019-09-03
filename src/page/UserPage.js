import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const Announce = Loadable({
  loader: () => import(/* webpackChunkName: "Announce" */ './../components/Announce/Announce'),
  loading: () => null
});

const OverviewProfile = Loadable({
  loader: () => import(/* webpackChunkName: "OverviewProfile" */ './../components/User/OverviewProfile'),
  loading: () => null
});

const Statistics = Loadable({
  loader: () => import(/* webpackChunkName: "Statistics" */ './../components/Statistics/Statistics'),
  loading: () => null
});

const Upcoming = Loadable({
  loader: () => import(/* webpackChunkName: "Upcoming" */ './../components/User/Upcoming'),
  loading: () => null
});

const History = Loadable({
  loader: () => import(/* webpackChunkName: "History" */ './../components/User/History'),
  loading: () => null
});

const FriendFollowList = Loadable({
  loader: () => import(/* webpackChunkName: "FriendFollowList" */ './../components/SideComponent/FriendFollowList'),
  loading: () => null
});

const UserHeader = Loadable({
  loader: () => import(/* webpackChunkName: "UserHeader" */ './../components/User/UserHeader'),
  loading: () => null
});

const SideMenu = Loadable({
  loader: () => import(/* webpackChunkName: "SideMenu" */ './../components/SideComponent/SideMenu'),
  loading: () => null
});

const RouteProfile = Loadable.Map({
  loader: {
    Profile: () => import(/* webpackChunkName: "Profile" */'./../components/User/Profile'),
  },
  render(loaded, props) {
    let Component = loaded.Profile.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props}/>
        )}/>
    )
  },
  loading: () => null
});

const RouteTimeline = Loadable.Map({
  loader: {
    Timeline: () => import(/* webpackChunkName: "Timeline" */'./../components/User/Timeline'),
  },
  render(loaded, props) {
    let Component = loaded.Timeline.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props}/>
        )}/>
    )
  },
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.up(870)]: {
      flexDirection: 'row',
    },
  },
  content: {
    flexGrow: 1,
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

}));

export default function UserPage(props) {
  const classes = useStyles();
  const {
    COLOR, API, BTN, isSupportWebp, sess, handleSess, accountData, handleAccountData,
    token, setCSRFToken, drawerState, drawerClose
  } = props
  const [ open, setOpen ] = React.useState( window.innerWidth >= 900 );

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
    handleSnackBar: props.handleSnackBar
  }

  function handleDrawerClick(){
    setOpen(!open)
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  /*
  function handleChangeField(e){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      socket.emit('search-client-message', {
        action: "field",
        userid: sess.userid,
        text: e.target.value
      })
    }
  }

  function responseField(){
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`${sess.userid}-field-search-server-message`, (messageNew) => {
      console.log("field : ", messageNew.result.infolist);
    })
  }
  */

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d[0])
      console.log(d[0]);
    })
  }

  React.useEffect(()=>{
    if(sess && sess.status === 1 && sess.typeid !== 'admin'){
      handleFetchInfo()
      //responseField()
    }
    if(sess && sess.status !== 1){
      window.location.pathname = '/'
    }
    console.log(props);
  },[ sess, props.location ])

  return (
    <div className={classes.root}>
      <UserHeader {...props} open={open} handleDrawerClick={handleDrawerClick}/>
      <SideMenu {...props} open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { true ?
          <React.Fragment>
            { true ?
              <Route exact path="/user" render={()=> <UserDashboard {...props} open={open}/>} />
              :
              <Route exact path={"/"} render={()=> <UserDashboard {...props} open={open}/>} />
            }
            <RouteProfile path="/user/profile/:userid"
              {...passingProps} />
            <RouteTimeline path="/user/timeline/:userid"
              {...passingProps} location={props.location} />
          </React.Fragment>
          :
          <RouteProfile exact path="/"
            {...props} />
        }
      </main>
    </div>
  );
}

function UserDashboard(props){
  const classes = useStyles();
  const { sess, open } = props

  /*
  React.useEffect(()=>{
    if(props.computedMatch && sess){
      console.log(props.computedMatch);
      console.log('sess : ', parseInt(sess.userid), ' userid : ', props.computedMatch.params.userid);
    }
  },[ ])*/

  return(
    <React.Fragment>
      { /*
        <div className={classes.grid}>
          <OverviewProfile {...props} />
          <Statistics userid={sess && sess.userid} {...props} />
        </div>
        <FriendFollowList {...props}/>*/
      }
      <Statistics {...props} />
      <Upcoming {...props} />

      <History {...props} open={open}/>

      {/* sess && sess.status === 1 && sess.typeid !== 'admin' &&
        props.computedMatch &&
        parseInt(props.computedMatch.params.userid) !== parseInt(sess.userid) &&
        <Redirect to={`/user`/${sess.userid}} />
        */
      }
      { sess && sess.status !== 1 && sess.typeid === 'admin' &&
        <Redirect to={`/admin`} />
      }
    </React.Fragment>
  );
}
