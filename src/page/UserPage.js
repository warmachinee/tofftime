import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const PageOrganizerOverview = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerOverview" */ './../components/User/PageOrganizer/PageOrganizerOverview'),
  loading: () => null
});

const Upcoming = Loadable({
  loader: () => import(/* webpackChunkName: "Upcoming" */ './../components/User/Upcoming'),
  loading: () => null
});

const UpcomingList = Loadable({
  loader: () => import(/* webpackChunkName: "UpcomingList" */ './../components/User/UpcomingList'),
  loading: () => null
});

const History = Loadable({
  loader: () => import(/* webpackChunkName: "History" */ './../components/User/History'),
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

const UserTutorial = Loadable({
  loader: () => import(/* webpackChunkName: "UserTutorial" */ './../components/Tutorial/UserTutorial'),
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

const PageOrganizerBody = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerBody" */ './../components/User/PageOrganizer/PageOrganizerBody'),
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
          <Component {...props} />
        )} />
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
          <Component {...props} />
        )} />
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
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteSimulator = Loadable.Map({
  loader: {
    Simulator: () => import(/* webpackChunkName: "Simulator" */'./../components/Simulator/Simulator'),
  },
  render(loaded, props) {
    let Component = loaded.Simulator.default;
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
    /*margin: 'auto',*/
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
  const [ notiData, setNotiData ] = React.useState(null);
  const [ dialog, setDialog ] = React.useState({
    loginFirst: false
  })

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
    setOpen: setOpen,
    handleDrawerClick: handleDrawerClick,
    handleDrawerOpen: handleDrawerOpen,
    handleDrawerClose: handleDrawerClose,
    addFriendState: addFriendState,
    toggleAddFriend: toggleAddFriend,
    handleAddFriendClose: handleAddFriendClose,
    notiState: notiState,
    toggleNoti: toggleNoti,

  }

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function dialogCloseAll(){
    setDialog({
      loginFirst: false
    })
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
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'uusersystem', {
        action: 'readnotification'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
    })
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData({
        ...d,
        photopath: (
          d.photopath ?
          API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
          :
          null
        )
      })
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
      window.location.pathname = '/system_admin'
    }
    window.scrollTo(0, 0)
    setDialog({ ...dialog, loginFirst: sess && sess.loginfirst === 1 })
  },[ sess, props.location ])

  React.useEffect(()=>{
    const p = window.location.pathname
    if((p === '/user' || p === '/user/') && sess && (('fullname', 'lastname') in sess)){
      document.title = `${sess.fullname} ${sess.lastname}`
    }
    if(/upcoming/.test(p)){
      document.title = `Upcoming - T-off Time`
    }
    if(/history/.test(p)){
      document.title = `History - T-off Time`
    }
    if(/create_match/.test(p)){
      document.title = `Create match - T-off Time`
    }
    if(/create_page/.test(p)){
      document.title = `Create page - T-off Time`
    }
  },[ sess, window.location.pathname ])

  return (
    <div className={classes.root}>
      <UserHeader {...props} {...dialogProps} notiData={notiData} setNotiData={setNotiData} />
      <SideMenu {...props} {...dialogProps} notiData={notiData} setNotiData={setNotiData} />
      <main className={classes.content} style={{ width: `calc(100% - ${open ? 240 : 73}px)` }}>
        <div className={classes.toolbar} />
        <Route exact path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }`}
          render={()=> <UserDashboard {...props} {...dialogProps} />} />
        <RouteProfile path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer ? '' : ':userid' }`}
          {...passingProps} />
        { !pageOrganizer &&
          <RouteTimeline path="/user/timeline/:userid"
            {...passingProps} location={props.location} />
        }
        <RouteSimulator path={`/user/simulator`}
          {...passingProps} {...dialogProps} />
        <RouteManagement path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`}
          {...passingProps} {...dialogProps} location={props.location} />

        <Route path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_match`}
          render={()=> <CreateMatchDialog {...props} {...dialogProps} />} />
        <Route path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_page`}
          render={()=> <CreatePage {...props} {...dialogProps} />} />
        <Route path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/history`}
          render={()=> <History {...props} {...dialogProps} />} />
        <Route path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/upcoming`}
          render={()=> <UpcomingList {...props} {...dialogProps} />} />
      </main>
      <UserTutorial {...props} open={dialog.loginFirst} handleClose={dialogCloseAll} />
      <NotificationsDialog
        {...props}
        {...dialogProps}
        notiData={notiData}
        setNotiData={setNotiData} />

    </div>
  );
}

function UserDashboard(props){
  const classes = useStyles();
  const { COLOR, sess, open, pageOrganizer, pageList } = props

  return(
    <React.Fragment>
      { pageOrganizer ?
        <PageOrganizerBody {...props} />
        :
        <React.Fragment>
          <Upcoming {...props} />
          <History {...props} />
        </React.Fragment>
      }
      { sess && sess.status !== 1 && sess.typeid === 'admin' &&
        <Redirect to={`/system_admin`} />
      }
    </React.Fragment>
  );
}
