import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { matchPath } from 'react-router'
import { makeStyles, fade, useTheme } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  Paper,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  MobileStepper,
  Stepper,
  Step,
  Collapse,
  List,
  ListItem,
  ListItemText,
  IconButton,

} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ArrowDropDown,
  ExpandMore,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const MBOverview = Loadable({
  loader: () => import(/* webpackChunkName: "MBOverview" */'./MBOverview'),
  loading: () => <LDCircular />
});

const MBPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayer" */'./MBPlayer'),
  loading: () => <LDCircular />
});

const MBSchedule = Loadable({
  loader: () => import(/* webpackChunkName: "MBSchedule" */'./MBSchedule'),
  loading: () => <LDCircular />
});

const MBPlayoff = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayoff" */'./MBPlayoff'),
  loading: () => <LDCircular />
});

const MBScoreEditor = Loadable({
  loader: () => import(/* webpackChunkName: "MBScoreEditor" */'./MBScoreEditor'),
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
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../GoBack'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../LabelText'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    flexGrow: 1,
    minHeight: 300,
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  paper: {
    maxWidth: 900,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.default,
  },
  expandButton: {
    maxWidth: 900,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

}))

function SetUpMatchComponent(props){
  const classes = useStyles();
  const theme = useTheme();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer, pageData, param, setData, data } = props
  const passingProps = {
    ...props,
    matchid: param
  }
  const labelSetUpSteps = [
    ( ( sess && sess.language === 'TH' ) ? "รายละเอียด" : 'Detail' ),
    ( ( sess && sess.language === 'TH' ) ? "Class" : 'ประเภท' ),
    ( ( sess && sess.language === 'TH' ) ? "การเชิญ และ ตารางเวลา" : 'Invitation & Schedule' ),
    ( ( sess && sess.language === 'TH' ) ? "ระบบจัดการผู้เล่น" : 'Player management' ),
  ]
  const maxSetUpSteps = labelSetUpSteps.length;
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ activeStep, setActiveStep ] = React.useState(getHashData());
  const [ expanded, setExpanded ] = React.useState(getHashExpand());

  function handleExpand(){
    setExpanded(!expanded)
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenu(index){
    handleClose()
    setActiveStep(index);
  }

  function getHashExpand(){
    if(window.location.hash){
      const hashRaw = window.location.hash.split('#')
      const hashType = hashRaw[hashRaw.length - 2]
      return hashType === 'setup'
    }else{
      return true
    }
  }

  function getHashData(){
    if(window.location.hash){
      const hashRaw = window.location.hash.split('#')
      var returnedData = 0
      const hashType = hashRaw[hashRaw.length - 2]
      const hashData = parseInt(hashRaw[hashRaw.length - 1])
      if(hashType === 'setup'){
        switch (true) {
          case hashData >= maxSetUpSteps - 1:
            returnedData = maxSetUpSteps - 1
            break;
          case hashData <= 0:
            returnedData = 0
            break;
          default:
            return hashData
        }
      }
      return parseInt(returnedData)
    }else{
      return 0
    }
  }

  function getComponent(){
    switch (activeStep) {
      case 0:
        return <MBOverview {...passingProps} setData={setData} data={data} />
        break;
      case 1:
        return <MBSchedule {...passingProps} />
        break;
      case 2:
        return <MBPlayer {...passingProps} />
        break;
      case 3:
        return <MBScoreEditor {...passingProps} />
        break;
      case 4:
        return <MBPlayoff {...passingProps} />
        break;
      case 5:
        return <MBReward {...passingProps} />
        break;
      default:
        return <MBMatchAdmin {...passingProps} />
    }
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

  return (
    <React.Fragment>
      <List className={classes.expandButton} disablePadding>
        <ListItem button onClick={handleExpand}
          style={{
            marginTop: 16,
            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
          }}>
          <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "ตั้งค่าการแข่งขัน" : 'Set up Match' } />
          <IconButton
            disableRipple
            className={classes.expandIcon}
            style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
            onClick={handleExpand}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMore />
          </IconButton>
        </ListItem>
      </List>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Paper className={classes.paper}>
          <Button style={{ boxSizing: 'border-box', marginLeft: 36, marginTop: 16, textTransform: 'none' }} onClick={handleClick}>
            <LabelText paddingTop={0} paddingLeft={0} text={labelSetUpSteps[activeStep]} />
            <ArrowDropDown fontSize="large" style={{ marginLeft: 8, marginTop: 12 }} />
          </Button>
          <MobileStepper
            style={{ backgroundColor: 'inherit', marginTop: 24 }}
            steps={maxSetUpSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`${window.location.pathname}#setup#${activeStep === maxSetUpSteps - 1 ? maxSetUpSteps - 1 : activeStep + 1}`}>
                <BTN.PrimaryText size="small" onClick={handleNext} disabled={activeStep === maxSetUpSteps - 1}>
                  { ( sess && sess.language === 'TH' ) ? "ถัดไป" : 'Next' }
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </BTN.PrimaryText>
              </Link>
            }
            backButton={
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`${window.location.pathname}#setup#${activeStep === 0 ? 0 : activeStep - 1}`}>
                <BTN.PrimaryText size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  { ( sess && sess.language === 'TH' ) ? "ย้อนกลับ" : 'Back' }
                </BTN.PrimaryText>
              </Link>
            }
          />
        </Paper>
        <Paper className={classes.paper} style={{ marginTop: 24 }}>
          {getComponent()}
        </Paper>

      </Collapse>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          labelSetUpSteps.map( (d, i) =>
          <Link
            key={d}
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`${window.location.pathname}#setup#${i}`}>
            <MenuItem
              onClick={()=>( activeStep === i ) ? console.log() : handleMenu(i)}
              style={{ ...(activeStep === i  && { backgroundColor: grey[400] }) }}>
              {d}
            </MenuItem>
          </Link>
        )}
      </Menu>
    </React.Fragment>
  );
}

function ManagementMatchComponent(props){
  const classes = useStyles();
  const theme = useTheme();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer, pageData, param, setData, data } = props
  const passingProps = {
    ...props,
    matchid: param
  }

  const labelManagementSteps = [
    ( ( sess && sess.language === 'TH' ) ? "การคำนวนคะแนน" : 'Score calculation' ),
    ( ( sess && sess.language === 'TH' ) ? "เพลย์ออฟ" : 'Playoff' ),
    ( ( sess && sess.language === 'TH' ) ? "รางวัล" : 'Reward' ),
    ( ( sess && sess.language === 'TH' ) ? "ผู้ดูแลการแข่งขัน" : 'Admin' ),
  ]
  const maxManagementSteps = labelManagementSteps.length;
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ activeStep, setActiveStep ] = React.useState(getHashData());
  const [ expanded, setExpanded ] = React.useState(getHashExpand());

  function handleExpand(){
    setExpanded(!expanded)
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenu(index){
    handleClose()
    setActiveStep(index);
  }

  function getHashExpand(){
    if(window.location.hash){
      const hashRaw = window.location.hash.split('#')
      const hashType = hashRaw[hashRaw.length - 2]
      return hashType === 'management'
    }else{
      return false
    }
  }

  function getHashData(){
    if(window.location.hash){
      const hashRaw = window.location.hash.split('#')
      var returnedData = 0
      const hashType = hashRaw[hashRaw.length - 2]
      const hashData = parseInt(hashRaw[hashRaw.length - 1])
      if(hashType === 'management'){
        switch (true) {
          case hashData >= maxManagementSteps - 1:
            returnedData = maxManagementSteps - 1
            break;
          case hashData <= 0:
            returnedData = 0
            break;
          default:
            return hashData
        }
      }
      return parseInt(returnedData)
    }else{
      return 0
    }
  }

  function getComponent(){
    switch (activeStep) {
      case 0:
        return <MBScoreEditor {...passingProps} />
        break;
      case 1:
        return <MBPlayoff {...passingProps} />
        break;
      case 2:
        return <MBReward {...passingProps} />
        break;
      default:
        return <MBMatchAdmin {...passingProps} />
    }
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

  return (
    <React.Fragment>
      <List className={classes.expandButton} disablePadding>
        <ListItem button onClick={handleExpand}
          style={{
            marginTop: 16,
            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
          }}>
          <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "การจัดการแข่งขัน" : 'Match Management' } />
          <IconButton
            disableRipple
            className={classes.expandIcon}
            style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
            onClick={handleExpand}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMore />
          </IconButton>
        </ListItem>
      </List>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Paper className={classes.paper}>
          <Button style={{ boxSizing: 'border-box', marginLeft: 36, marginTop: 16, textTransform: 'none' }} onClick={handleClick}>
            <LabelText paddingTop={0} paddingLeft={0} text={labelManagementSteps[activeStep]} />
            <ArrowDropDown fontSize="large" style={{ marginLeft: 8, marginTop: 12 }} />
          </Button>
          <MobileStepper
            style={{ backgroundColor: 'inherit', marginTop: 24 }}
            steps={maxManagementSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`${window.location.pathname}#management#${activeStep === maxManagementSteps - 1 ? maxManagementSteps - 1 : activeStep + 1}`}>
                <BTN.PrimaryText size="small" onClick={handleNext} disabled={activeStep === maxManagementSteps - 1}>
                  { ( sess && sess.language === 'TH' ) ? "ถัดไป" : 'Next' }
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </BTN.PrimaryText>
              </Link>
            }
            backButton={
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`${window.location.pathname}#management#${activeStep === 0 ? 0 : activeStep - 1}`}>
                <BTN.PrimaryText size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  { ( sess && sess.language === 'TH' ) ? "ย้อนกลับ" : 'Back' }
                </BTN.PrimaryText>
              </Link>
            }
          />
        </Paper>
        <Paper className={classes.paper} style={{ marginTop: 24 }}>
          {getComponent()}
        </Paper>

      </Collapse>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          labelManagementSteps.map( (d, i) =>
          <Link
            key={d}
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`${window.location.pathname}#management#${i}`}>
            <MenuItem
              onClick={()=>( activeStep === i ) ? console.log() : handleMenu(i)}
              style={{ ...(activeStep === i  && { backgroundColor: grey[400] }) }}>
              {d}
            </MenuItem>
          </Link>
        )}
      </Menu>
    </React.Fragment>
  );
}

export default function MatchEditor(props){
  const classes = useStyles();
  const theme = useTheme();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer, pageData } = props
  const [ param, setParam ] = React.useState(null)
  const [ data, setData ] = React.useState(null)

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
        if(
          d.status !== 'class database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      }else{
        if(d.chkadminpermission.status){
          if(
            d.status !== 'class database error' ||
            d.status !== 'wrong matchid' ||
            d.status !== 'wrong action' ||
            d.status !== 'wrong params'
          ){
            setData(d)
          }else{
            handleSnackBar({
              state: true,
              message: d.status,
              variant: 'error',
              autoHideDuration: 5000
            })
          }
        }else{
          handleSnackBar({
            state: true,
            message: 'You have no permission to access !!!',
            variant: 'error',
            autoHideDuration: 10000,
          })
          setTimeout(()=>{
            window.location.pathname = '/user'
          }, 11000)
        }
      }
    })
  }

  React.useEffect(()=>{
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: sess.typeid === 'admin' ?
        "/admin/match/:matchparam" :
        `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/:matchparam`
      });
      if(match){
        handleFetch(parseInt(match.params.matchparam))
        setParam(parseInt(match.params.matchparam))
      }
    }

  },[ /*props.location*/ ])

  return param && (
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        { BTN && param &&
          <BTN.NoStyleLink to={`/match/${param}`}>
            <Box className={classes.title} fontWeight={600} m={1} style={{ cursor: 'pointer' }}>
              {data && data.title}
            </Box>
          </BTN.NoStyleLink>
        }
      </Typography>
      <SetUpMatchComponent {...props} param={param} data={data} setData={setData} />
      <ManagementMatchComponent {...props} param={param} data={data} setData={setData} />
    </div>
  );
}
