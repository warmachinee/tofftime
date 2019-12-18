import React from 'react';
import Loadable from 'react-loadable';
import clsx from "clsx";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  Button,
  Menu,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Switch,

} from '@material-ui/core';

import {
  AddCircle as AddCircleIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const AddAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "AddAdmin" */'./AddAdmin'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    boxSizing: 'border-box'
  },
  listLabel: {
    backgroundColor: grey[900],
    borderRadius: 4
  },
  listText: {
    margin: theme.spacing(1, 0),
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '60%',
    textAlign: 'left'
  },
  listStatus: {
    margin: theme.spacing(1, 0),
    width: 100,
    display: 'flex', justifyContent: 'flex-start'
  },
  listDisplay: {
    margin: theme.spacing(1, 0),
    width: 250,
    display: 'flex', justifyContent: 'center'
  },
  menuButton: {
    textTransform: 'capitalize',
    padding: '6px 8px',
    left: -8
  },
  moreThan450: {
    [theme.breakpoints.down(450)]: {
      display: 'none'
    },
  },
  lessThan450: {
    [theme.breakpoints.up(450)]: {
      display: 'none'
    },
  },
  moreThan700: {
    [theme.breakpoints.down(700)]: {
      display: 'none'
    },
  },
  lessThan700: {
    [theme.breakpoints.up(700)]: {
      display: 'none'
    },
  },
  moreThan940: {
    [theme.breakpoints.down(940)]: {
      display: 'none'
    },
  },
  lessThan940: {
    [theme.breakpoints.up(940)]: {
      display: 'none'
    },
  },

}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

const StyledSwitch = withStyles({
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

function ListMenu(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, setMBData, primary, isAvailableEditing } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function getAdminRole(role){
    switch (true) {
      case role === 'host':
        return API._getWord(sess && sess.language).Host
        break;
      case role === 'admin':
        return API._getWord(sess && sess.language).Admin
        break;
      default:
        return API._getWord(sess && sess.language).Member
    }
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleSelectRole(val, role){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'setadmin',
        matchid: matchid,
        userid: val.userid,
        setaction: role
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleFetchUserList()
      }
    })
  }

  async function handleFetchUserList(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'admin',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleClose()
        setMBData(d)
      })
    }
  }

  return (
    <div>
      { ( isAvailableEditing && primary.permission !== 'host' ) ?
        <Button className={classes.menuButton} onClick={handleClick}>
          {getAdminRole(primary.permission)}
        </Button>
        :
        <div style={{ textTransform: 'capitalize' }}>{getAdminRole(primary.permission)}</div>
      }
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleSelectRole(primary, 'unset')}>{ API._getWord(sess && sess.language).Remove }</MenuItem>
      </Menu>
    </div>
  );
}

function ListSwitch(props){
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar, data, setMBData, isAvailableEditing } = props
  const [ showing, setShowing ] = React.useState(data.display === 1)

  async function handleSetDisplay(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'displaymatchsystem' : 'mdisplaymatchsystem', {
          action: 'user',
          matchid: matchid,
          userid: data.userid,
          type: 'form'
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          handleFetchUserList()
        }
      })
    }
  }

  async function handleFetchUserList(){
    if(matchid){
      setShowing(!showing)
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'admin',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setMBData(d)
      })
    }
  }

  React.useEffect(()=>{
    setShowing(data.display === 1)
  },[ data ])

  return (
    <div>
      { data.display === 0 ?
        <Typography variant="h6">{'-'}</Typography>
        :
        <StyledSwitch disabled={!isAvailableEditing} checked={showing} onChange={handleSetDisplay} />
      }
    </div>
  );
}

export default function MBMatchAdmin(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar, isAvailableEditing } = props
  const [ open, setOpen ] = React.useState(false);
  const [ data, setData ] = React.useState(null)

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  async function handleFetchSwitchHostForm(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'switchhostform',
          matchid: matchid,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(/success/.test(d.status)){
          handleFetch()
          handleSnackBar({
            state: true,
            message: d.action,
            variant: 'success',
            autoHideDuration: 5000
          })
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: /success/.test(d.status) ? 'success' : 'error',
            autoHideDuration: /success/.test(d.status)? 2000 : 5000
          })
        }
      })
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
        action: 'admin',
        matchid: matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()

  },[ ])

  return(
    <div className={classes.root}>
      { isAvailableEditing &&
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <BTN.Red className={classes.addAdminButton}
            onClick={handleOpen}
            startIcon={<AddCircleIcon />}>
            { API._getWord(sess && sess.language).Add_admin }
          </BTN.Red>
          <BTN.Primary onClick={handleFetchSwitchHostForm}>
            { API._getWord(sess && sess.language).Switch_Host }
          </BTN.Primary>
        </div>
      }
      <List>
        <ListItem className={classes.listLabel}>
          <StyledText className={clsx(classes.listStatus, classes.moreThan450)}
            primary={ API._getWord(sess && sess.language).Role } />
          <StyledText className={classes.listText}
            primary={ API._getWord(sess && sess.language).Full_name } />
          <StyledText className={classes.listDisplay}
            primary={
              <React.Fragment>
                <span className={clsx({
                  [classes.moreThan940]: props.open,
                  [classes.moreThan700]: !props.open
                })}>{ API._getWord(sess && sess.language)['Show in Registration player'] }</span>
                <span className={clsx({
                  [classes.lessThan940]: props.open,
                  [classes.lessThan700]: !props.open
                })}>{ API._getWord(sess && sess.language).Show }</span>
              </React.Fragment>
            } />
        </ListItem>
        { data ?
          data.map( d =>
            <React.Fragment key={d.userid}>
              <ListItem>
                <ListItemText className={clsx(classes.listStatus, classes.moreThan450)}
                  primary={
                    <ListMenu
                      {...props}
                      primary={d}
                      data={data}
                      setMBData={setData} />
                  } />
                <ListItemText className={classes.listText}
                  primary={
                    <React.Fragment>
                      <div style={{ display: 'flex' }}>
                        <Typography
                          component="span"
                          variant="body1"
                          color="textPrimary"
                        >
                          { d.fullname }
                        </Typography>
                        <div style={{ width: 16 }} />
                        <Typography
                          component="span"
                          variant="body1"
                          color="textPrimary"
                        >
                          { d.lastname }
                        </Typography>
                      </div>
                      <div style={{ marginTop: 16, marginLeft: 12 }} className={classes.lessThan450}>
                        <ListMenu
                          {...props}
                          primary={d}
                          data={data}
                          setMBData={setData} />
                      </div>
                    </React.Fragment>
                  } />
                <ListItemText className={classes.listDisplay}
                  primary={<ListSwitch {...props} data={d} setMBData={setData} />} />
              </ListItem>
              <Divider />
            </React.Fragment>
          )
          :
          <LDCircular />
        }
      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <AddAdmin
          {...props}
          admin={data}
          setDataAdmin={setData}
          handleClose={handleClose} />
      </TemplateDialog>
    </div>
  );
}
