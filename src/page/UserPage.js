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

const PageOrganizerOverview = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerOverview" */ './../components/User/PageOrganizer/PageOrganizerOverview'),
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

const NotificationsDialog = Loadable({
  loader: () => import(/* webpackChunkName: "NotificationsDialog" */ './../components/User/NotificationsDialog'),
  loading: () => null
});

const HistoryDialog = Loadable({
  loader: () => import(/* webpackChunkName: "HistoryDialog" */ './../components/User/HistoryDialog'),
  loading: () => null
});

const UpcomingDialog = Loadable({
  loader: () => import(/* webpackChunkName: "UpcomingDialog" */ './../components/User/UpcomingDialog'),
  loading: () => null
});

const CreatePage = Loadable({
  loader: () => import(/* webpackChunkName: "CreatePage" */ './../components/User/Panel/CreatePage'),
  loading: () => null
});

const CreateMatchDialog = Loadable({
  loader: () => import(/* webpackChunkName: "CreateMatchDialog" */ './../components/User/Panel/CreateMatchDialog'),
  loading: () => null
});

const PageOrganizerSetAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerSetAdmin" */ './../components/User/PageOrganizer/PageOrganizerSetAdmin'),
  loading: () => null
});

const PageOrganizerCreatePost = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerCreatePost" */ './../components/User/PageOrganizer/PageOrganizerCreatePost'),
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

const RouteManagement = Loadable.Map({
  loader: {
    Management: () => import(/* webpackChunkName: "Management" */'./../components/User/Panel/Management'),
  },
  render(loaded, props) {
    let Component = loaded.Management.default;
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
    pageOrganizer, pageData,
    token, setCSRFToken, drawerState, drawerClose
  } = props
  const [ open, setOpen ] = React.useState( window.innerWidth >= 900 );
  const [ pageList, setPageList ] = React.useState(null)
  const [ addFriendState, setAddFriendState ] = React.useState(false);
  const [ notiState, setNotiState ] = React.useState(false);
  const [ createPageState, setCreatePageState ] = React.useState(false);
  const [ createMatchState, setCreateMatchState ] = React.useState(false);
  const [ historyState, setHistoryState ] = React.useState(false);
  const [ upcomingState, setUpcomingState ] = React.useState(false);
  const [ setAdminState, setSetAdminState ] = React.useState(false);
  const [ createPostState, setCreatePostState ] = React.useState(false);
  const [ notiData, setNotiData ] = React.useState(null);

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
    pageOrganizer: props.pageOrganizer,
    pageData: props.pageData,
    editPageRefresh: props.editPageRefresh,
    setEditPageRefresh: props.setEditPageRefresh,

  }

  const dialogProps = {
    pageList: pageList,
    setPageList: setPageList,
    open: open,
    handleDrawerClick: handleDrawerClick,
    handleDrawerOpen: handleDrawerOpen,
    handleDrawerClose: handleDrawerClose,
    addFriendState: addFriendState,
    toggleAddFriend: toggleAddFriend,
    handleAddFriendClose: handleAddFriendClose,
    notiState: notiState,
    toggleNoti: toggleNoti,
    createPageState: createPageState,
    toggleCreatePage: toggleCreatePage,
    createMatchState: createMatchState,
    toggleCreateMatch: toggleCreateMatch,
    handleCreateMatchClose: handleCreateMatchClose,
    historyState: historyState,
    toggleHistory: toggleHistory,
    upcomingState: upcomingState,
    toggleUpcoming: toggleUpcoming,
    setAdminState: setAdminState,
    toggleSetAdmin: toggleSetAdmin,
    createPostState: createPostState,
    setCreatePostState: setCreatePostState,
    toggleCreatePost: toggleCreatePost,

  }

  function toggleSetAdmin(){
    setSetAdminState(!setAdminState)
  }

  function toggleCreatePost(){
    setCreatePostState(!createPostState)
  }

  function toggleAddFriend(){
    setAddFriendState(!addFriendState)
  }

  function handleAddFriendClose(){
    setAddFriendState(false)
  }

  function toggleNoti(){
    setNotiState(!notiState)
    if(notiState){
      handleReadNoti()
    }
  }

  function toggleCreatePage(){
    setCreatePageState(!createPageState)
  }

  function toggleHistory(){
    setHistoryState(!historyState)
  }

  function toggleUpcoming(){
    setUpcomingState(!upcomingState)
  }

  function toggleCreateMatch(){
    setCreateMatchState(!createMatchState)
  }

  function handleCreateMatchClose(){
    setCreateMatchState(false)
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

  async function handleReadNoti(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'uusersystem', {
        action: 'readnotification'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
    })
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d[0])
    })
  }

  React.useEffect(()=>{
    if(sess && sess.status === 1 && sess.typeid !== 'admin'){
      handleFetchInfo()
    }
    if (pageOrganizer && !sess) {
      handleFetchInfo()
    }
    if(sess && sess.status === 1 && sess.typeid === 'admin'){
      window.location.pathname = '/admin'
    }
    window.scrollTo(0, 0)
  },[ sess, props.location ])

  return (
    <div className={classes.root}>
      <UserHeader {...props} {...dialogProps} notiData={notiData} setNotiData={setNotiData} />
      <SideMenu {...props} {...dialogProps} notiData={notiData} setNotiData={setNotiData} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route exact path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }`}
          render={()=> <UserDashboard {...props} {...dialogProps}/>} />
        <RouteProfile path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer ? '' : ':userid' }`}
          {...passingProps} />
        { !pageOrganizer &&
          <RouteTimeline path="/user/timeline/:userid"
            {...passingProps} location={props.location} />
        }
        <RouteManagement path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`}
          {...passingProps} {...dialogProps} location={props.location} />
      </main>

      <NotificationsDialog
        {...props}
        {...dialogProps}
        notiData={notiData}
        setNotiData={setNotiData} />

      <HistoryDialog
        {...props}
        {...dialogProps} />

      <UpcomingDialog
        {...props}
        {...dialogProps} />

      <CreatePage
        {...props}
        {...dialogProps}  />

      <CreateMatchDialog
        {...props}
        {...dialogProps} />

      <PageOrganizerSetAdmin
        {...props}
        {...dialogProps} />

      <PageOrganizerCreatePost
        {...props}
        {...dialogProps} />

    </div>
  );
}

function UserDashboard(props){
  const classes = useStyles();
  const { sess, open, pageOrganizer, pageList } = props

  return(
    <React.Fragment>
      { /*
        <div className={classes.grid}>
          <OverviewProfile {...props} />
          <Statistics userid={sess && sess.userid} {...props} />
        </div>
        <FriendFollowList {...props}/>*/
      }
      { pageOrganizer &&
        <PageOrganizerOverview {...props} />
      }
      { !pageOrganizer &&
        <Statistics {...props} />
      }
      { pageList &&
        <React.Fragment>
          <Upcoming {...props} />
          <History {...props} open={open}/>
        </React.Fragment>
      }
      { sess && sess.status !== 1 && sess.typeid === 'admin' &&
        <Redirect to={`/admin`} />
      }
    </React.Fragment>
  );
}
