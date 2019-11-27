import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    width: '100%',
    textAlign: 'left'
  },
  listStatus: {
    margin: theme.spacing(1, 0),
    width: '40%',
    display: 'flex', justifyContent: 'flex-start'
  },
  menuButton: {
    textTransform: 'capitalize',
    padding: '6px 8px',
    left: -8
  },
  controls: {
    position: 'relative',
    cursor: 'auto',
    display: 'block',
    [theme.breakpoints.up(700)]: {
      display: 'flex',
    },
  },
  addAdminButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },

}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

function ListMenu(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, setMBData, primary } = props
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
      { primary.permission !== 'host' ?
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

export default function MBMatchAdmin(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar } = props
  const [ open, setOpen ] = React.useState(false);
  const [ data, setData ] = React.useState(null)

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

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
      <ListItem disableGutters className={classes.controls}>
        <Button className={classes.addAdminButton} variant="contained"
          onClick={handleOpen}>
          <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }} />
          { API._getWord(sess && sess.language).Add_admin }
        </Button>
        <div style={{ flex: 1 }} />
      </ListItem>
      <List>
        <ListItem className={classes.listLabel}>
          <StyledText className={classes.listText}
            primary={ API._getWord(sess && sess.language).First_name } />
          { window.innerWidth >= 600 &&
            <StyledText className={classes.listText}
              primary={ API._getWord(sess && sess.language).Last_name } />
          }
          <StyledText className={classes.listStatus}
            primary={ API._getWord(sess && sess.language).Role } />
        </ListItem>
        { data &&
          data.map( d =>
          <React.Fragment key={d.userid}>
            <ListItem>
              <ListItemText className={classes.listText}
                primary={
                  ( window.innerWidth >= 450 && window.innerWidth < 600 )?
                  <div style={{ display: 'flex' }}>
                    { d.fullname }<div style={{ width: 20 }}></div>{ d.lastname }
                  </div>
                  : d.fullname
                }
                secondary={
                  window.innerWidth < 450 &&
                  <React.Fragment>
                    <br></br>
                    <Typography
                      component="span"
                      variant="body1"
                      color="textPrimary"
                    >
                      { d.lastname }
                    </Typography>
                  </React.Fragment>
                }
                />
              { window.innerWidth >= 600 &&
                <ListItemText className={classes.listText} primary={ d.lastname } />
              }
              <ListItemText className={classes.listStatus}
                primary={
                  <ListMenu
                    {...props}
                    primary={d}
                    data={data}
                    setMBData={setData} />
                } />
            </ListItem>
            <Divider />
          </React.Fragment>
        )}
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
