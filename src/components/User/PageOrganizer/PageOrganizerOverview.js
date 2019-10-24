import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primary, grey } from './../../../api/palette'

import {
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
  TextField,

} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  AddCircle,

} from '@material-ui/icons';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
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
    borderRadius: 0
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
  const { API, BTN, token, setCSRFToken, handleSnackBar, sess, pageData, isSupportWebp, toggleSetAdmin, toggleCreateMatch, toggleCreatePost } = props
  const [ isFollow, setIsFollow ] = React.useState(false)
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ confirmPasswordState, handleConfirmPasswordState ] = React.useState(false)
  const [ confirmPassword, setConfirmPassword ] = React.useState(null)

  function handleConfirmPasswordCancel(){
    handleConfirmPasswordState(false)
    handleConfirmDeleteState(false)
  }

  function handleConfirmCancel(){
    handleConfirmDeleteState(false)
  }

  function handleConfirmDelete(){
    if( !(sess.typeid === 'f-auth' || sess.typeid === 'g-auth')){
      handleConfirmPasswordState(true)
    }else{
      handleFetchRemove()
    }
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleFetchRemove()
    }
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
        <Paper className={classes.paper}>
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
                  ( sess && sess.language === 'TH' ) ? "ผู้ติดตาม" : 'follower'
                ) + ( pageData.subscriber > 1 ? ( ( sess && sess.language === 'TH' ) ? '' : 's' ) : '')}
              </Typography>
              <Typography gutterBottom variant="body2" className={classes.followers}>
                {API._shotnessNumber(pageData.view)} {` view${pageData.view > 1 ? 's' : ''}`}
              </Typography>
            </div>
          </div>
        </Paper>
      }
      <Paper className={classes.paper}>
        <BTN.Primary className={classes.panelButton} style={{ paddingRight: 16 }} onClick={toggleCreateMatch}>
          <AddCircle style={{ marginLeft: 4, marginRight: 8 }} />
          { ( sess && sess.language === 'TH' ) ? "สร้างการแข่งขัน" : 'Create match' }
        </BTN.Primary>
        <BTN.PrimaryOutlined className={classes.panelButton} style={{ paddingRight: 16 }} onClick={toggleCreatePost}>
          <AddCircle style={{ marginLeft: 4, marginRight: 8 }} />
          { ( sess && sess.language === 'TH' ) ? "โพสต์" : 'Post' }
        </BTN.PrimaryOutlined>
        <BTN.PrimaryOutlined className={classes.panelButton} onClick={toggleSetAdmin}>
          { ( sess && sess.language === 'TH' ) ? "แต่งตั้งผู้ดูแล" : 'Set admin' }
        </BTN.PrimaryOutlined>
        <div style={{ flex: 1 }} />
        <BTN.Red onClick={()=>handleConfirmDeleteState(true)}>
          { ( sess && sess.language === 'TH' ) ? "ลบเพจ" : 'Delete page' }
        </BTN.Red>
      </Paper>

      <TemplateDialog
        maxWidth={400}
        open={confirmDeleteState} handleClose={handleConfirmCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { ( sess && sess.language === 'TH' ) ? "ต้องการลบหรือไม่ ?" : 'Are you sure you want to delete?' }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            { pageData && pageData.pagename }
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BTN.PrimaryText onClick={handleConfirmCancel} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </BTN.PrimaryText>
          <BTN.Red onClick={handleConfirmDelete} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ลบ" : 'Delete' }
          </BTN.Red>
        </div>
      </TemplateDialog>

      <TemplateDialog
        maxWidth={400}
        open={confirmPasswordState} handleClose={handleConfirmPasswordCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            Fill password
          </Box>
        </Typography>
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
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BTN.PrimaryText onClick={handleConfirmPasswordCancel} className={classes.confirmButton}>
            Cancel
          </BTN.PrimaryText>
          <BTN.Red onClick={handleFetchRemove} className={classes.confirmButton}>
            Delete
          </BTN.Red>
        </div>
      </TemplateDialog>

    </div>
  );
}
