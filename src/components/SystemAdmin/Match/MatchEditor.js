import React from 'react';
import Loadable from 'react-loadable';
import { matchPath } from 'react-router'
import { makeStyles, fade, useTheme } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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

}))

export default function MatchEditor(props){
  const classes = useStyles();
  const theme = useTheme();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageOrganizer, pageData } = props
  const [ param, setParam ] = React.useState(null)
  const [ data, setData ] = React.useState(null)
  const [ activeStep, setActiveStep ] = React.useState(0);
  const labelSteps = [
    ( ( sess && sess.language === 'EN' ) ? "Detail" : 'รายละเอียด' ),
    ( ( sess && sess.language === 'EN' ) ? "Invitation & Schedule" : 'การเชิญ และ ตารางเวลา' ),
    ( ( sess && sess.language === 'EN' ) ? "Player management" : 'ระบบจัดการผู้เล่น' ),
    ( ( sess && sess.language === 'EN' ) ? "Score calculation" : 'การคำนวนคะแนน' ),
    ( ( sess && sess.language === 'EN' ) ? "Playoff" : 'เพลย์ออฟ' ),
    ( ( sess && sess.language === 'EN' ) ? "Reward" : 'รางวัล' ),
    ( ( sess && sess.language === 'EN' ) ? "Admin" : 'ผู้ดูแลการแข่งขัน' ),
  ]
  const maxSteps = labelSteps.length;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const passingProps = {
    ...props,
    matchid: param
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

  async function handleFetch(matchid){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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
      <Paper className={classes.paper}>
        <Button style={{ boxSizing: 'border-box', marginLeft: 36, marginTop: 16 }} onClick={handleClick}>
          <LabelText paddingTop={0} paddingLeft={0} text={labelSteps[activeStep]} />
          <ArrowDropDownIcon fontSize="large" style={{ marginLeft: 8, marginTop: 12 }} />
        </Button>
        <MobileStepper
          style={{ backgroundColor: 'inherit', marginTop: 24 }}
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <BTN.PrimaryText size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              { ( sess && sess.language === 'EN' ) ? "Next" : 'ถัดไป' }
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </BTN.PrimaryText>
          }
          backButton={
            <BTN.PrimaryText size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              { ( sess && sess.language === 'EN' ) ? "Back" : 'ย้อนกลับ' }
            </BTN.PrimaryText>
          }
        />
      </Paper>
      <Paper className={classes.paper} style={{ marginTop: 24 }}>
        {getComponent()}
      </Paper>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          labelSteps.map( (d, i) =>
          <MenuItem key={d}
            onClick={()=>( activeStep === i ) ? console.log() : handleMenu(i)}
            style={{ ...(activeStep === i  && { backgroundColor: grey[400] }) }}>{d}</MenuItem>
        )}
      </Menu>

    </div>
  );
}
