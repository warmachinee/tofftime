import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import { LDCircular } from './../../loading/LDCircular'

import {
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  Menu,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,

} from '@material-ui/core'

import {
  AddCircle
} from '@material-ui/icons';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../Utils/TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../../Utils/LabelText'),
  loading: () => null
});

const AddAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "AddAdmin" */ './AddAdmin'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24,
    boxSizing: 'border-box'
  },
  grid: {
    boxSizing: 'border-box',
    marginTop: 24,
    padding: 12
  },
  listLabel: {
    cursor: 'auto',
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

}));

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

function ListMenu(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, primary, setData, pageData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function getAdminRole(role){
    switch (true) {
      case role === 'host':
        return ( sess && sess.language === 'TH' ) ? "เจ้าของเพจ" : 'Host'
        break;
      case role === 'admin':
        return ( sess && sess.language === 'TH' ) ? "ผู้ดูแล" : 'Admin'
        break;
      default:
        return ( sess && sess.language === 'TH' ) ? "สมาชิก" : 'Member'
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
      'ppagesection', {
        action: 'setadmin',
        pageid: pageData.pageid,
        userid: val.userid,
        setadmin: role
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleFetch()
      }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'admin',
        pageid: pageData.pageid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
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
        { primary.permission !== 'host' &&
          <MenuItem onClick={()=>handleSelectRole(primary, 'unset')}>{ ( sess && sess.language === 'TH' ) ? "ลบ" : 'Remove' }</MenuItem>
        }
        <div />
      </Menu>
    </div>
  );
}

export default function PageOrganizerSetAdmin(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, setAdminState, toggleSetAdmin, pageData } = props
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
      'ploadpage', {
        action: 'admin',
        pageid: pageData.pageid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(setAdminState || open){
      handleFetch()
    }
  },[ setAdminState, open ])

  return (
    <TemplateDialog open={setAdminState} handleClose={toggleSetAdmin} maxWidth={800}>
      <div className={classes.root}>
        <LabelText text={ ( sess && sess.language === 'TH' ) ? "แต่งตั้งผู้ดูแล" : 'Set admin' } />
        <div className={classes.grid}>
          <Button className={classes.addAdminButton} variant="contained"
            onClick={handleOpen}>
            <AddCircle style={{ marginRight: 8, marginLeft: 12 }} />
            Add admin
          </Button>
          <List style={{ cursor: 'auto' }}>
            <ListItem className={classes.listLabel}>
              <StyledText className={classes.listText}
                primary={ ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'First name' } />
              { window.innerWidth >= 600 &&
                <StyledText className={classes.listText}
                  primary={ ( sess && sess.language === 'TH' ) ? "นามสกุล" : 'Last name' } />
              }
              <StyledText className={classes.listStatus}
                primary={ ( sess && sess.language === 'TH' ) ? "ตำแหน่ง" : 'Role' } />
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
                        setData={setData} />
                    } />
                </ListItem>
                <Divider />
              </React.Fragment>
            )}
          </List>
        </div>
        <TemplateDialog open={open} handleClose={handleClose}>
          <AddAdmin
            {...props}
            admin={data}
            setAdminData={setData} />
        </TemplateDialog>
      </div>
    </TemplateDialog>
  );
}
