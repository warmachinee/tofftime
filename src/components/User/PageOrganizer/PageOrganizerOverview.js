import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import ReactHtmlParser from 'react-html-parser';
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
    top: 0,
    right: 0,
    zIndex: 2
  },
  imageGrid: {
    margin: 12,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  avatar: {
    fontSize: 120,
    [theme.breakpoints.down(500)]: {
      fontSize: 60,
    },
  },
  avatarImage: {
    width: 120,
    height: 120,
    [theme.breakpoints.down(500)]: {
      width: 60,
      height: 60,
    },
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
  aboutPage800: {
    display: 'flex',
    padding: '12px 0px',
    flexDirection: 'column',
    [theme.breakpoints.up(800)]: {
      flexDirection: 'row',
    },
  },
  aboutPage1040: {
    display: 'flex',
    padding: '12px 0px',
    flexDirection: 'column',
    [theme.breakpoints.up(1040)]: {
      flexDirection: 'row',
    },
  },
  aboutDetail: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
  },
  aboutLabel800: {
    maxWidth: 100,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: `4px solid ${primary[600]}`,
    borderRight: 'none',
    paddingRight: 8,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up(800)]: {
      marginRight: 12,
      paddingRight: 12,
      borderRight: `4px solid ${primary[600]}`,
      borderBottom: 'none',
      paddingBottom: 8,
    },
  },
  aboutLabel1040: {
    maxWidth: 100,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: `4px solid ${primary[600]}`,
    borderRight: 'none',
    paddingRight: 8,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up(1040)]: {
      marginRight: 12,
      paddingRight: 12,
      borderRight: `4px solid ${primary[600]}`,
      borderBottom: 'none',
      paddingBottom: 8,
    },
  },
  moreThan600: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  lessThan600: {
    [theme.breakpoints.up(600)]: {
      display: 'none'
    },
  },
  moreThan840: {
    [theme.breakpoints.down(840)]: {
      display: 'none'
    },
  },
  lessThan840: {
    [theme.breakpoints.up(840)]: {
      display: 'none'
    },
  },

}));

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function DetailComponent(props){
  const { id, detail } = props

  return(
    <div id={id} className="ql-container ql-snow" style={{ border: 'none' }}>
      <div className="ql-editor" style={{ overflow: 'hidden', height: 'auto', padding: '2px 15px 0 15px' }}>
        {ReactHtmlParser(detail)}
      </div>
    </div>
  );
}

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
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ moreState, setMoreState ] = React.useState(false)
  const aboutElement = document.getElementById(`about-page-${pageData.pageid}`)

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
      if(/success/.test(d.status)){
        confirmCloseAll()
      }
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
            <div style={{ display: 'flex', flex: 1 }}>
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
                    {`${
                      ( sess && sess.language === 'TH' ) ? 'การดู ' : ''
                    }${API._shotnessNumber(pageData.view)} ${
                      ( sess && sess.language === 'TH' ) ? 'ครั้ง' : ` view${pageData.view > 1 ? 's' : ''}`
                    }`}
                  </Typography>
                  { ( pageData.pagedetail && pageData.pagedetail !== '<p></p>' && pageData.pagedetail !== '<p><br></p>' ) ?
                    <div
                      className={clsx({
                        [classes.moreThan840]: props.open,
                        [classes.moreThan600]: !props.open
                      })}>
                      <div
                        className={clsx({
                          [classes.aboutPage1040]: props.open,
                          [classes.aboutPage800]: !props.open
                        })}>
                        <div>
                          <BTN.NoStyleLink to={`/organizer/${pageData.pageid}/profile/`}>
                            <Typography variant="body1"
                              className={clsx({
                                [classes.aboutLabel1040]: props.open,
                                [classes.aboutLabel800]: !props.open
                              })}>{ API._getWord(sess && sess.language).About }</Typography>
                          </BTN.NoStyleLink>
                        </div>
                        <div>
                          <div className={classes.aboutDetail} style={{ maxHeight: moreState ? '100%' : 140, transition: '.2s' }}>
                            <DetailComponent id={`about-page-${pageData.pageid}`} detail={pageData.pagedetail} />
                          </div>
                          { aboutElement && aboutElement.offsetHeight > 140 &&
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <BTN.PrimaryText onClick={()=>setMoreState(!moreState)}>
                                { API._getWord(sess && sess.language)[moreState ? 'Collapse' : 'More' ] }
                              </BTN.PrimaryText>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    :
                    <div style={{ marginBottom: 16 }}>
                      <BTN.NoStyleLink to={`/organizer/${pageData.pageid}/profile/`}>
                        <BTN.PrimaryOutlined startIcon={<AddCircle color="inherit" />}>
                          { API._getWord(sess && sess.language).Add_about_group }
                        </BTN.PrimaryOutlined>
                      </BTN.NoStyleLink>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          { ( pageData.pagedetail && pageData.pagedetail !== '<p></p>' && pageData.pagedetail !== '<p><br></p>' ) &&
            <div
              className={clsx({
                [classes.lessThan840]: props.open,
                [classes.lessThan600]: !props.open
              })}>
              <div
                className={clsx({
                  [classes.aboutPage1040]: props.open,
                  [classes.aboutPage800]: !props.open
                })}
                style={{ marginLeft: 16 }}>
                <div>
                  <BTN.NoStyleLink to={`/organizer/${pageData.pageid}/profile/`}>
                    <Typography variant="body1"
                      className={clsx({
                        [classes.aboutLabel1040]: props.open,
                        [classes.aboutLabel800]: !props.open
                      })}>{ API._getWord(sess && sess.language).About }</Typography>
                  </BTN.NoStyleLink>
                </div>
                <div>
                  <div className={classes.aboutDetail} style={{ maxHeight: moreState ? '100%' : 140, transition: '.2s' }}>
                    <DetailComponent id={`about-page-${pageData.pageid}`} detail={pageData.pagedetail} />
                  </div>
                  { aboutElement && aboutElement.offsetHeight > 140 &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <BTN.PrimaryText onClick={()=>setMoreState(!moreState)}>
                        { API._getWord(sess && sess.language)[moreState ? 'Collapse' : 'More' ] }
                      </BTN.PrimaryText>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
          <Divider />
          <div style={{ padding: 16, display: 'flex' }}>
            {/*
              <BTN.PrimaryOutlined className={classes.panelButton} style={{ paddingRight: 16 }} onClick={()=>props.dialogOpen('createMatch')}>
                <AddCircle style={{ marginRight: 8 }} />
                { API._getWord(sess && sess.language).Create_Match }
              </BTN.PrimaryOutlined>*/
            }
            <div>
              <BTN.PrimaryOutlined className={classes.panelButton} style={{ paddingRight: 16 }} onClick={()=>props.dialogOpen('createPost')}>
                <AddCircle style={{ marginRight: 8 }} />
                { API._getWord(sess && sess.language).Post }
              </BTN.PrimaryOutlined>
            </div>
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
              autoFocus={API._isDesktopBrowser()}
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
        title={API._getWord(sess && sess.language)['Send a request to show this Group on the Toff-time page.']}
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
        onSubmit={handleRequestMain}
        submitText={ API._getWord(sess && sess.language).Request } />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={()=>confirmOpen('request')}>{ API._getWord(sess && sess.language).Request_mainpage_BTN }</MenuItem>
        <MenuItem onClick={()=>props.dialogOpen('setAdmin')}>{ API._getWord(sess && sess.language).Group_admin }</MenuItem>
        { pageData &&
          <BTN.NoStyleLink to={`/organizer/${pageData.pageid}/profile/`}>
            <MenuItem onClick={handleClose}>{ API._getWord(sess && sess.language).Setting }</MenuItem>
          </BTN.NoStyleLink>
        }
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
        <MenuItem onClick={()=>confirmOpen('delete')}>{ API._getWord(sess && sess.language).Delete_group }</MenuItem>
      </Menu>
    </div>
  );
}
