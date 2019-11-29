import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primary, grey, red } from './../../../api/palette'

import {
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  IconButton,
  Menu,
  MenuItem,

} from '@material-ui/core';

import {
  AddCircle,
  AccountCircle as AccountCircleIcon,
  Help as HelpIcon,
  MoreVert,

} from '@material-ui/icons';

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
    padding: 12,
    boxSizing: 'border-box'
  },
  paper: {
    marginTop: 16,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  moreButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2
  },
  imageGrid: {
    margin: 12,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  avatar: {
    fontSize: 120
  },
  avatarImage: {
    width: 120,
    height: 120,
  },
  pageDetailGrid: {
    display: 'flex',
    flexGrow: 1,
    alignSelf: 'center',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  pageDetail: {
    marginLeft: 8,
  },
  pageTitle: {
    cursor: 'pointer'
  },
  followers: {
    color: grey[500]
  },
  panelButton: {
    marginRight: 16
  },

}));

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function PageOrganizerOverview(props) {
  const classes = useStyles();
  const { API, BTN, token, setCSRFToken, handleSnackBar, sess, pageData, isSupportWebp } = props
  const [ isFollow, setIsFollow ] = React.useState(false)
  const [ confirmPassword, setConfirmPassword ] = React.useState(null)
  const [ dialog, setDialog ] = React.useState({
    delete: false,
    password: false,
    request: false
  })
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function confirmOpen(type){
    handleClose()
    setDialog({ ...dialog, [type]: true })
  }

  function confirmClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function confirmCloseAll(){
    setDialog({
      delete: false,
      password: false,
      request: false
    })
  }

  function handleConfirmDelete(){
    if( sess && !(sess.typeid === 'f-auth' || sess.typeid === 'g-auth')){
      confirmOpen('password')
    }else{
      handleFetchRemove()
    }
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleFetchRemove()
    }
  }

  async function handleRequestMain(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ppagesection', {
        action: 'mainpagerequest',
        pageid: pageData.pageid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
    })
  }

  async function handleFetchRemove(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'delete',
      pageid: pageData.pageid,
    }

    if( !(sess.typeid === 'f-auth' || sess.typeid === 'g-auth')){
      Object.assign(sendObj, { password: confirmPassword });
    }else{
      Object.assign(sendObj, { password: '1234' });
    }

    await API._xhrPost(
      token? token : resToken.token,
      'ppagesystem', {
        ...sendObj
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      confirmCloseAll()
      try {
        if(/success/.test(d.status)){
          window.location.pathname = '/user'
        }
      }catch(err) { console.log(err.message) }
    })
  }

  return (
    <div className={classes.root}>
      { pageData &&
        <Paper>
          <div className={classes.paper} style={{ paddingBottom: 0, position: 'relative' }}>
            <div className={classes.moreButton}>
              <IconButton onClick={handleClick}>
                <MoreVert />
              </IconButton>
            </div>
            <div className={classes.imageGrid}>
              <BTN.NoStyleLink to={`/page/${pageData.pageid}`}>
                { pageData.logo ?
                  <Avatar className={classes.avatarImage}
                    src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                  :
                  <AccountCircleIcon classes={{ root: classes.avatar }} />
                }
              </BTN.NoStyleLink>
            </div>
            <div className={classes.pageDetailGrid}>
              <div className={classes.pageDetail}>
                <BTN.NoStyleLink to={`/page/${pageData.pageid}`}>
                  <Typography gutterBottom variant="h5" className={classes.pageTitle}>
                    {pageData.pagename}
                  </Typography>
                </BTN.NoStyleLink>
                <Typography gutterBottom variant="body1" className={classes.followers}>
                  {pageData.subscriber} { (
                    API._getWord(sess && sess.language).follower
                  ) + ( pageData.subscriber > 1 ? ( API._getWord(sess && sess.language).s ) : '')}
                </Typography>
                <Typography gutterBottom variant="body2" className={classes.followers}>
                  {API._shotnessNumber(pageData.view)} {` view${pageData.view > 1 ? 's' : ''}`}
                </Typography>
              </div>
            </div>
          </div>
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <div style={{ padding: 16 }}>
            <BTN.PrimaryOutlined className={classes.panelButton} style={{ paddingRight: 16 }} onClick={()=>props.dialogOpen('createMatch')}>
              <AddCircle style={{ marginRight: 8 }} />
              { API._getWord(sess && sess.language).Create_Match }
            </BTN.PrimaryOutlined>
            <BTN.PrimaryOutlined className={classes.panelButton} style={{ paddingRight: 16 }} onClick={()=>props.dialogOpen('createPost')}>
              <AddCircle style={{ marginRight: 8 }} />
              { API._getWord(sess && sess.language).Post }
            </BTN.PrimaryOutlined>
          </div>
        </Paper>
      }
      <ConfirmDialog
        sess={sess}
        open={dialog.delete}
        onClose={()=>confirmClose('delete')}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          pageData &&
          <Typography variant="body1" align="center">
            { pageData && pageData.pagename }
          </Typography>
        }
        onSubmit={handleConfirmDelete}
        submitButton="Red" />
      <ConfirmDialog
        sess={sess}
        open={dialog.password}
        onClose={confirmCloseAll}
        icon="Lock"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Fill your password']}
        content={
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus
              fullWidth
              style={{ marginTop: 16 }}
              className={classes.margin}
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              onKeyPress={e =>handleKeyPress(e)}
            />
          </ThemeProvider>
        }
        onSubmit={handleFetchRemove}
        submitButton="Red" />
      <ConfirmDialog
        sess={sess}
        open={dialog.request}
        onClose={confirmCloseAll}
        icon={{ width: 96, height: 96 }}
        iconColor={primary[600]}
        title={API._getWord(sess && sess.language)['Send a request to show this Page on the Toff-time page.']}
        content={
          pageData && pageData.pageid &&
          <Typography component="div" style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <div style={{ marginRight: 16 }}>
              { pageData.logo ?
                <Avatar style={{ width: 64, height: 64 }}
                  src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                :
                <AccountCircleIcon style={{ fontSize: 64 }} />
              }
            </div>
            <Typography variant="h6" style={{ marginTop: 'auto', marginBottom: 'auto' }}>{pageData.pagename}</Typography>
          </Typography>
        }
        onSubmit={handleFetchRemove}
        submitText="Request" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>confirmOpen('request')}>{ API._getWord(sess && sess.language).Request_mainpage_BTN }</MenuItem>
        <MenuItem onClick={()=>props.dialogOpen('setAdmin')}>{ API._getWord(sess && sess.language).Set_admin }</MenuItem>
        { pageData &&
          <BTN.NoStyleLink to={`/organizer/${pageData.pageid}/profile/`}>
            <MenuItem onClick={handleClose}>{ API._getWord(sess && sess.language).Setting }</MenuItem>
          </BTN.NoStyleLink>
        }
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
        <MenuItem onClick={()=>confirmOpen('delete')}>{ API._getWord(sess && sess.language).Delete_page }</MenuItem>
      </Menu>
    </div>
  );
}
