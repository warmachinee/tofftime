import React from 'react';
import Loadable from 'react-loadable';
import { Link, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faTable, faSitemap, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { matchPath } from 'react-router'
import { makeStyles, fade, useTheme, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  Paper,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
  Badge,
  Divider,
  Card,
  CardActionArea,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  FormControlLabel,

} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ArrowDropDown,
  ExpandMore,
  Description,
  People,
  PersonAdd,
  Schedule,
  SupervisedUserCircle,
  Error as ErrorIcon,
  Help as HelpIcon,
  ArrowForwardIos,
  ArrowBackIos,
  Share as ShareIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const MBOverview = Loadable({
  loader: () => import(/* webpackChunkName: "MBOverview" */'./MBOverview'),
  loading: () => <LDCircular />
});

const MBGroup = Loadable({
  loader: () => import(/* webpackChunkName: "MBGroup" */'./MBGroup'),
  loading: () => <LDCircular />
});

const MBInvitation = Loadable({
  loader: () => import(/* webpackChunkName: "MBInvitation" */'./MBInvitation'),
  loading: () => <LDCircular />
});

const MBSchedule = Loadable({
  loader: () => import(/* webpackChunkName: "MBSchedule" */'./MBSchedule'),
  loading: () => <LDCircular />
});

const MBPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayer" */'./MBPlayer'),
  loading: () => <LDCircular />
});

const MBScoreEditor = Loadable({
  loader: () => import(/* webpackChunkName: "MBScoreEditor" */'./MBScoreEditor'),
  loading: () => <LDCircular />
});

const MBPlayoff = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayoff" */'./MBPlayoff'),
  loading: () => <LDCircular />
});

const MBReward = Loadable({
  loader: () => import(/* webpackChunkName: "MBReward" */'./MBReward'),
  loading: () => <LDCircular />
});

const MBMatchAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "MBMatchAdmin" */'./MBMatchAdmin'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
  loading: () => <LDCircular />
});

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    flexGrow: 1,
    minHeight: 300,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  card: {
    width: 120,
    height: 120,
    margin: '24px auto'
  },
  cardActionArea: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: primary[800]
  },
  cardGrid: {
    padding: '24px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    boxSizing: 'border-box',
  },
  menuCardIconGrid: {
    height: 56,
    marginTop: 16
  },
  anchorOriginTopRightRectangle: {
    top: 16,
    right: -8,
    color: red[600]
  },

}))

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: primary[50],
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${primary[200]}`,
  },
}))(Tooltip);

const GreenSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: primary[500],
    },
    '&$checked + $track': {
      backgroundColor: primary[500],
    },
  },
  checked: {
    color: primary[500],
  },
  track: {
    color: primary[500],
  }
})(props => <Switch color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function SetUpMatchComponent(props){
  const classes = useStyles();
  const { sess, warning, isAvailableEditing } = props
  const SETUP_STEP = [
    {
      variant: 'detail',
      icon: <Description style={{ fontSize: 52 }} />,
    },
    {
      variant: 'invitation',
      icon: <PersonAdd style={{ fontSize: 52 }} />
    },
    {
      variant: 'group',
      icon: <People style={{ fontSize: 52 }} />
    },
    {
      variant: 'schedule',
      icon: <Schedule style={{ fontSize: 52 }} />
    },
    {
      variant: 'player',
      icon: <FontAwesomeIcon icon={faUserCog} style={{ fontSize: 40 }} />
    },
  ]

  return (
    <div className={classes.cardGrid}>
      {SETUP_STEP.map( d =>
        <MenuCard
          key={d.variant}
          icon={d.icon}
          variant={d.variant}
          warning={warning ? warning[d.variant] : false}
          sess={sess}
          isAvailableEditing={isAvailableEditing} />
      )}
    </div>
  );
}

function ManagementMatchComponent(props){
  const classes = useStyles();
  const { sess, warning, isSetup, isAvailableEditing } = props

  const MANAGEMENT_STEP = [
    {
      variant: 'scorecard',
      icon: <FontAwesomeIcon icon={faTable} style={{ fontSize: 40 }} />,
    },
    {
      variant: 'playoff',
      icon: <FontAwesomeIcon icon={faSitemap} style={{ fontSize: 40 }} />,
    },
    {
      variant: 'reward',
      icon: <FontAwesomeIcon icon={faTrophy} style={{ fontSize: 40 }} />,
    },
    {
      variant: 'admin',
      icon: <SupervisedUserCircle style={{ fontSize: 52 }} />,
    },
  ]

  return (
    <div className={classes.cardGrid}>
      {MANAGEMENT_STEP.map( d =>
        <MenuCard
          key={d.variant}
          icon={d.icon}
          variant={d.variant}
          warning={warning ? warning[d.variant] : false}
          greyScale={warning ? (isSetup ? false : warning[d.variant]) : false}
          sess={sess}
          isAvailableEditing={isAvailableEditing} />
      )}
      <div style={{ width: 120, margin: '24px auto' }} />
    </div>
  );
}

function MenuCard(props){
  const classes = useStyles();
  const { sess, variant, icon, warning, greyScale, isAvailableEditing } = props
  const warningStyle = (warning) && (
    (greyScale) ?
    { color: grey[600], opacity: .7, background: grey[200] }
    :
    { border: `3px solid ${red[600]}` }
  )

  function getVariant(){
    switch (variant) {
      case 'invitation':
        return {
          label: ( API._getWord(sess && sess.language).Invitation ),
        }
        break;
      case 'group':
        return {
          label: ( API._getWord(sess && sess.language).Group_M ),
        }
        break;
      case 'schedule':
        return {
          label: ( API._getWord(sess && sess.language).Schedule_M ),
        }
        break;
      case 'player':
        return {
          label: ( API._getWord(sess && sess.language).Manage_Player ),
        }
        break;
      case 'scorecard':
        return {
          label: ( API._getWord(sess && sess.language).Scorecard_M ),
        }
        break;
      case 'playoff':
        return {
          label: ( API._getWord(sess && sess.language).Playoff ),
        }
        break;
      case 'reward':
        return {
          label: ( API._getWord(sess && sess.language).Reward ),
        }
        break;
      case 'admin':
        return {
          label: ( API._getWord(sess && sess.language).Admin_M ),
        }
        break;
      default:
        return {
          label: ( API._getWord(sess && sess.language).Detail_M ),
        }
    }
  }

  return (
    <Card className={classes.card} elevation={3}>
      { isAvailableEditing ?
        ( (warning && greyScale) ?
          <div className={classes.cardActionArea} style={{ alignItems: 'center', ...warningStyle  }}>
            <Badge
              invisible={!(warning ? (greyScale ? false : true) : (false))}
              badgeContent={<ErrorIcon />}
              classes={{ anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle }}>
              <div className={classes.menuCardIconGrid}>{icon}</div>
            </Badge>
            <Typography style={{ textAlign: 'center', textTransform: 'capitalize', marginBottom: 16 }}>
              {getVariant().label}
            </Typography>
          </div>
          :
          <Link to={`${window.location.pathname}#${variant}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardActionArea
              className={classes.cardActionArea} style={{ ...warningStyle  }}>
              <Badge
                invisible={!warning}
                badgeContent={<ErrorIcon />}
                classes={{ anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle }}>
                <div className={classes.menuCardIconGrid}>{icon}</div>
              </Badge>
              <Typography style={{ textAlign: 'center', textTransform: 'capitalize', marginBottom: 16 }}>
                {getVariant().label}
              </Typography>
            </CardActionArea>
          </Link>
        )
        :
        <div className={classes.cardActionArea} style={{ alignItems: 'center', color: grey[600], opacity: .7, background: grey[200]  }}>
          <div className={classes.menuCardIconGrid}>{icon}</div>
          <Typography style={{ textAlign: 'center', textTransform: 'capitalize', marginBottom: 16 }}>
            {getVariant().label}
          </Typography>
        </div>
      }
    </Card>
  );
}

export default function MatchEditor(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer, pageData } = props
  const [ param, setParam ] = React.useState(null)
  const [ hashParam, setHashParam ] = React.useState(window.location.hash.substring(1, window.location.hash.length))
  const [ data, setData ] = React.useState(null)
  const [ isHost, setIsHost ] = React.useState(false)
  const [ isAvailableEditing, setIsAvailableEditing ] = React.useState(false)
  const [ warningObj, setWarningObj ] = React.useState(null)
  const [ helpState, setHelpState ] = React.useState(false)
  const [ mainRequest, setMainRequest ] = React.useState(false)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ dialog, setDialog ] = React.useState({
    request: false
  })
  const isSetup = warningObj && !(
    warningObj.detail ||
    warningObj.invitation ||
    warningObj.group ||
    /*warningObj.schedule ||*/
    warningObj.player
  )

  const passingProps = {
    ...props,
    matchid: param,
    isSetup: isSetup,
    warningObj: warningObj,
    isHost: isHost,
    isAvailableEditing: isAvailableEditing
  }

  const shareClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const shareClose = () => {
    setAnchorEl(null);
  };

  function handleChange(){
    setIsAvailableEditing(!isAvailableEditing)
    handleResetStatus()
  }

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function dialogCloseAll(){
    setDialog({
      request: false
    })
  }

  function handleClickHelpState(){
    setHelpState(!helpState)
  }

  function handleCopyLink(){
    const str = `${API._getWebURL()}/match/${param}`
    const el = <textarea value={str}></textarea>;
    el.select();
    document.execCommand('copy');
    console.log(str, el);
    handleSnackBar({
      state: true,
      message: 'Copied link',
      variant: 'success',
      autoHideDuration: 2000
    })
    shareClose()
  }

  function handleShareFacebook(){
    console.log('Share facebook', ` ${API._getWebURL()}/match/${param}`);
    shareClose()
  }

  async function handleResetStatus(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin'? 'matchsystem' : 'mmatchsystem', {
        action: 'restatus',
        matchid: parseInt(param),
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      /*
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })*/
      if(/success/.test(d.status)){
        handleFetch(parseInt(param))
      }
    })
  }

  async function handleRequestMain(){
    setMainRequest('pending')
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'mainpagerequest',
        matchid: parseInt(param),
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      dialogCloseAll()
    })
  }

  async function handleFetchStep(matchid){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin'? 'loadmatch' : 'mloadmatch', {
        action: 'warning',
        matchid: matchid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setWarningObj({
        detail: false,
        invitation: 'formlist' in d,
        group: 'classgroup' in d,
        schedule: 'schedule' in d,
        player: 'classgroup' in d && 'formlist' in d,
        scorecard: 'userscore' in d,
        playoff: 'userscore' in d,
        reward: 'reward' in d,
        admin: false,
      })
    })
  }

  function setInitialData(d){
    if(
      d.status !== 'class database error' ||
      d.status !== 'wrong matchid' ||
      d.status !== 'wrong action' ||
      d.status !== 'wrong params'
    ){
      setData(d)
      if(d && ('hostid' in d) && sess && ('userid' in sess)){
        /*console.log({
          hostid: d.hostid,
          sess: sess.userid,
          isHost: d.hostid === sess.userid
        });*/
        setIsHost(d.hostid === sess.userid || sess.typeid === 'admin')
      }
      if(d && ('status' in d)){
        //console.log(d.status === 0);
        setIsAvailableEditing(d.status === 0)
      }
      if(d && ('title' in d)){
        document.title = `${d.title} (Management) - T-off Time`
      }
      setMainRequest(function(){
        switch (true) {
          case d.mainstatus === 0 && d.mainrequest === 'complete':
            return 'complete'
            break;
          case d.mainstatus === 1 || d.mainrequest === 'complete':
            return 'reject'
            break;
          case d.mainstatus === 0 && d.mainrequest === 'pending':
            return 'pending'
            break;
          default:
            return 'none'
        }
      }())
    }else{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: 'error',
        autoHideDuration: 5000
      })
    }
  }

  async function handleFetch(matchid){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin'? 'loadmatch' : 'mloadmatch', {
        action: 'detail',
        matchid: matchid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(sess.typeid === 'admin'){
        setInitialData(d)
      }else{
        if(d.chkadminpermission.status){
          setInitialData(d)
        }else{
          handleSnackBar({
            state: true,
            message: 'You have no permission to access !!!',
            variant: 'error',
            autoHideDuration: 10000,
          })
          setTimeout(()=>{
            //window.location.pathname = '/user'
            console.log(d);
          }, 11000)
        }
      }
    })
  }

  function getComponent(){
    switch (hashParam) {
      case 'invitation':
        return {
          id: 1,
          label: ( API._getWord(sess && sess.language).Invitation ),
          component: <MBInvitation {...passingProps} />
        }
        break;
      case 'group':
        return {
          id: 2,
          label: ( API._getWord(sess && sess.language).Group_M ),
          component: <MBGroup {...passingProps} data={data} setData={setData} />
        }
        break;
      case 'schedule':
        return {
          id: 3,
          label: ( API._getWord(sess && sess.language).Schedule_M ),
          component: <MBSchedule {...passingProps} />
        }
        break;
      case 'player':
        return {
          id: 4,
          label: ( API._getWord(sess && sess.language).Player_management ),
          component: <MBPlayer {...passingProps} />
        }
        break;
      case 'scorecard':
        return {
          id: 5,
          label: ( API._getWord(sess && sess.language).Player_Scorecard ),
          component: (
            <MBScoreEditor {...passingProps}
              warningObj={warningObj} />
          )
        }
        break;
      case 'playoff':
        return {
          id: 6,
          label: ( API._getWord(sess && sess.language).Playoff ),
          component: <MBPlayoff {...passingProps} />
        }
        break;
      case 'reward':
        return {
          id: 7,
          label: ( API._getWord(sess && sess.language).Reward ),
          component: <MBReward {...passingProps} />
        }
        break;
      case 'admin':
        return {
          id: 8,
          label: ( API._getWord(sess && sess.language).Admin_M ),
          component: <MBMatchAdmin {...passingProps} />
        }
        break;
      default:
        return {
          id: 0,
          label: ( API._getWord(sess && sess.language).Detail_M ),
          component: <MBOverview {...passingProps} setData={setData} data={data} />
        }
    }
  }

  function getComponentByIndex(index){
    switch (index) {
      case 1:
        return {
          hash: 'invitation',
          label: ( API._getWord(sess && sess.language).Invitation ),
        }
        break;
      case 2:
        return {
          hash: 'group',
          label: ( API._getWord(sess && sess.language).Group_M ),
        }
        break;
      case 3:
        return {
          hash: 'schedule',
          label: ( API._getWord(sess && sess.language).Schedule_M ),
        }
        break;
      case 4:
        return {
          hash: 'player',
          label: ( API._getWord(sess && sess.language).Player_management ),
        }
        break;
      case 5:
        return {
          hash: 'scorecard',
          label: ( API._getWord(sess && sess.language).Scorecard_M ),
        }
        break;
      case 6:
        return {
          hash: 'playoff',
          label: ( API._getWord(sess && sess.language).Playoff ),
        }
        break;
      case 7:
        return {
          hash: 'reward',
          label: ( API._getWord(sess && sess.language).Reward ),
        }
        break;
      case 8:
        return {
          hash: 'admin',
          label: ( API._getWord(sess && sess.language).Admin ),
        }
        break;
      default:
        return {
          hash: 'detail',
          label: ( API._getWord(sess && sess.language).Detail_M ),
        }
    }
  }

  function requestMainPageComponent(){
    return (
      <div>
        { (mainRequest === 'pending') ?
          <Button disabled>{API._getWord(sess && sess.language).Pending}</Button>
          :
          <BTN.Primary
            style={{ textTransform: 'none' }} onClick={()=>dialogOpen('request')}>
            {API._getWord(sess && sess.language).Request_mainpage_BTN}
          </BTN.Primary>
        }
        <StyledTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={()=>setHelpState(false)}
          open={helpState}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Typography>
              { API._getWord(sess && sess.language)['Send a request to show this Match on the Toff-time page.'] }
            </Typography>
          }>
          <IconButton onClick={handleClickHelpState}>
            <HelpIcon fontSize="small" style={{ color: mainRequest === 'pending' ? 'inherit' : primary[600] }} />
          </IconButton>
        </StyledTooltip>
      </div>
    );
  }

  React.useEffect(()=>{
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: sess.typeid === 'admin' ?
        "/system_admin/match/:matchparam" :
        `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/:matchparam`
      });
      if(match){
        handleFetch(parseInt(match.params.matchparam))
        handleFetchStep(parseInt(match.params.matchparam))
        setParam(parseInt(match.params.matchparam))
      }
    }
  },[ props.location ])

  React.useEffect(()=>{
    setHashParam(window.location.hash.substring(1, window.location.hash.length))
  },[ window.location.hash ])

  return (
    <React.Fragment>
      { param && data &&
        <div className={classes.root}>
          <div style={{ position: 'relative' }}>
            <GoBack {...( hashParam === '' && {
              to: sess && sess.typeid === 'admin' ?
              '/system_admin/match' : `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`
              })} />
            { hashParam !== '' &&
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'absolute', top: 14 }}>
                <Link to={
                    sess.typeid === 'admin' ?
                    `/system_admin/match/${param}` :
                    `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${param}`
                  }
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <BTN.PrimaryOutlined style={{ textTransform: 'none' }}>
                    { API._getWord(sess && sess.language).Main_menu }
                  </BTN.PrimaryOutlined>
                </Link>
              </div>
            }
          </div>
          <Typography component="div">
            { BTN && param &&
              <BTN.NoStyleLink to={`/match/${param}`}>
                <Box className={classes.title} fontWeight={600} style={{ cursor: 'pointer' }}>
                  {data && data.title}
                </Box>
              </BTN.NoStyleLink>
            }
          </Typography>
          { hashParam === ''?
            <React.Fragment>
              <div style={{ display: 'flex', marginTop: 24 }}>
                { param && data &&
                  function(){
                    switch (mainRequest) {
                      case 'complete':
                        return false
                        break;
                      case 'pending':
                        return true
                        break;
                      case 'reject':
                        return false
                        break;
                      default:
                        return true
                    }
                  }() &&
                  requestMainPageComponent()
                }
                <div style={{ flex: 1 }} />
                <BTN.PrimaryOutlined style={{ padding: '8px 12px' }} onClick={shareClick}>
                  <ShareIcon style={{ color: primary[600], marginRight: 8 }} />
                  {API._getWord(sess && sess.language).Share}
                </BTN.PrimaryOutlined>
              </div>
              { !isAvailableEditing &&
                <React.Fragment>
                  <Typography variant="h5" align="center">
                    { API._getWord(sess && sess.language)['This match is over'] }
                  </Typography>
                </React.Fragment>
              }
              { !isAvailableEditing && isHost &&
                <Typography component="div" align="center">
                  <ThemeProvider theme={theme}>
                    <FormControl component="fieldset">
                      <FormControlLabel
                        labelPlacement="start"
                        label={ API._getWord(sess && sess.language).Edit }
                        control={
                          <GreenSwitch checked={isAvailableEditing} onChange={handleChange} />
                        }
                      />
                    </FormControl>
                  </ThemeProvider>
                </Typography>
              }
              <LabelText paddingTop={0} text={API._getWord(sess && sess.language).Match_Setup} />
              <SetUpMatchComponent warning={warningObj} sess={sess} isAvailableEditing={isAvailableEditing} />
              <Divider style={{ margin: '16px auto', width: '80%' }} />
              <LabelText text={API._getWord(sess && sess.language).Match_Management} />
              <ManagementMatchComponent warning={warningObj} isSetup={isSetup} sess={sess} isAvailableEditing={isAvailableEditing} />
            </React.Fragment>
            :
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'absolute' }}>
                { getComponent().id > 0 &&
                  getComponent().id < (data.scorematch === 0 ? 4 : 5) &&
                  <Typography>{`${getComponent().id}/${data.scorematch === 0 ? 3 : 4}`}</Typography>
                }
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                { getComponent().id > 1 && getComponent().id < (data.scorematch === 0 ? 4 : 5) &&
                  <Link to={`${window.location.pathname}#${getComponentByIndex(getComponent().id - 1).hash}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BTN.PrimaryText style={{ textTransform: 'none' }}>
                      <ArrowBackIos />
                      {getComponentByIndex(getComponent().id - 1).label}
                    </BTN.PrimaryText>
                  </Link>
                }
                <div style={{ flex: 1 }} />
                { getComponent().id === 0 || getComponent().id >= (data.scorematch === 0 ? 3 : 4) ?
                  <Link to={`${window.location.pathname}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BTN.PrimaryText style={{ textTransform: 'none' }}>
                      { API._getWord(sess && sess.language).Finish }
                    </BTN.PrimaryText>
                  </Link>
                  :
                  <Link to={`${window.location.pathname}#${getComponentByIndex(getComponent().id + 1).hash}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BTN.PrimaryText style={{ textTransform: 'none' }}>
                      {getComponentByIndex(getComponent().id + 1).label}
                      <ArrowForwardIos />
                    </BTN.PrimaryText>
                  </Link>
                }
              </div>
              <Divider style={{ margin: '12px auto', width: '80%' }} />
              { !isAvailableEditing &&
                <Typography variant="h5" align="center">
                  { API._getWord(sess && sess.language)['This match is over'] }
                </Typography>
              }
              <LabelText text={`${getComponent().label}`} paddingTop={0} />
              {getComponent().component}
            </div>
          }
          <ConfirmDialog
            sess={sess}
            open={dialog.request}
            onClose={dialogCloseAll}
            icon={{ width: 96, height: 96 }}
            iconColor={primary[600]}
            title={API._getWord(sess && sess.language)['Send a request to show this Match on the Toff-time page.']}
            content={
              data &&
              <Typography variant="h6" align="center">{data.title}</Typography>
            }
            onSubmit={handleRequestMain}
            submitText={ API._getWord(sess && sess.language).Request } />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={shareClose}
          >
            {/*<MenuItem onClick={handleCopyLink}>Copy link</MenuItem>*/}
            <a href={`/session/share?url=/match/${param}`}
              target='_blank'
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={handleShareFacebook}>Facebook</MenuItem>
            </a>
          </Menu>
        </div>
      }
    </React.Fragment>
  );
}
