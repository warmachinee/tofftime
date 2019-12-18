import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  FormControlLabel,
  Switch,
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,

} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImageIcon from '@material-ui/icons/Image';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => <LDCircular />
});

const PageOrganizerPostEditor = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerPostEditor" */ './PageOrganizerPostEditor'),
  loading: () => <LDCircular />
});

const MatchStepper = Loadable({
  loader: () => import(/* webpackChunkName: "MatchStepper" */ './../Panel/Match/MatchStepper'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  body: {
    marginTop: 64,
    [theme.breakpoints.up(500)]: {
      marginTop: 80,
    },
  },
  tableHead: {
    backgroundColor: grey[900],
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  listRoot: {
    overflow: 'auto',
    width: '100%',
  },
  listDetail: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  greenIcon: {
    color: primary[600]
  },

}))

const StyledSwitch = withStyles({
  switchBase: {
    color: primary[300],
    '&$checked': {
      color: primary[500],
    },
    '&$checked + $track': {
      backgroundColor: primary[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

export default function PagePost(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageData } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(null)
  const [ editing, setEditing ] = React.useState(false)
  const [ editingData, setEditingData ] = React.useState(null)
  const [ clickAction, setClickAction ] = React.useState('')
  const [ selectedTypePost, setSelectedTypePost ] = React.useState('post')
  const [ dialog, setDialog ] = React.useState({
    createMatch: false,
    post: false,
    setAdmin: false
  })
  const [ isCreateAfterDone, setIsCreateAfterDone ] = React.useState(true)

  const passingProps = {
    ...props,
    dialog: dialog,
    dialogOpen: dialogOpen,
    dialogCloseAll: dialogCloseAll,
    ...(pageData) && { pageid: pageData.pageid  }
  }

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function dialogCloseAll(){
    setDialog({
      createMatch: false,
      post: false,
      setAdmin: false
    })
    setClickAction('')
    setEditingData(null)
  }

  function handleOpen(action){
    setClickAction(action)
    dialogOpen('post')
    if(action === 'create'){
      setSelectedTypePost('post')
    }
  }

  function handleSelectPagePost(d){
    setClickAction('edit')
    dialogOpen('post')
    setEditingData(d)
  }

  function handleClose(){
    dialogClose('post')
    setClickAction('')
    setEditingData(null)
  }

  function handleConfirmCancel(){
    handleSelectedDeleteItem(null)
    handleConfirmDeleteState(!confirmDeleteState)
  }

  function handleDeleteItem(d){
    handleConfirmDeleteState(!confirmDeleteState)
    handleSelectedDeleteItem(d)
  }

  function handleConfirmDelete(){
    handleFetchDelete(selectedDeleteItem)
  }

  async function handleFetchDelete(data){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ppagesection', {
        action: 'deletepost',
        pageid: pageData.pageid,
        postid: data.postid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      try {
        handleFetch()
        if(/success/.test(d.status)){
          handleConfirmDeleteState(false)
        }
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postlist',
        pageid: pageData.pageid,
        userid: sess.userid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      document.title = `Post Management - T-off Time`
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ open, confirmDeleteState, dialog ])

  return(
    <div className={classes.root}>
      <LabelText text={ API._getWord(sess && sess.language).Page_post } />
      <div style={{ display: 'flex', marginTop: 16 }}>
        <RedButton variant="contained" color="secondary"
          onClick={()=>handleOpen('create')}
          startIcon={<AddCircleIcon color="inherit" />}>
          { API._getWord(sess && sess.language).Create }
        </RedButton>
        <div style={{ flex: 1 }} />
        <GreenTextButton style={{ padding: '8px 24px' }}
          variant={ editing? 'text' : 'outlined' }
          onClick={()=>setEditing(!editing)}>
          { editing?
            ( API._getWord(sess && sess.language).Done )
            :
            ( API._getWord(sess && sess.language).Remove )
          }
        </GreenTextButton>
      </div>
      <List>
        <ListItem className={classes.tableHead}>
          <ListItemAvatar style={{ marginRight: 16 }}>
            <div style={{ margin: 10, width: 60, height: 24 }}></div>
          </ListItemAvatar>
          <StyledText primary={ API._getWord(sess && sess.language).Post } />
        </ListItem>
      </List>
      <List className={classes.listRoot}>
        { data && !data.status &&
          data.length > 0 ? /*API._sortArrByDate(data, 'createdate', 'title')*/
          data.map( d =>{
            return d &&
            <React.Fragment key={d.postid}>
              <ListItem>
                <ListItemAvatar style={{ marginRight: 16 }}>
                  {
                    d.photopath?
                      <Avatar
                        alt={d.message.split('<$$split$$>')[0]}
                        src={API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}
                        className={classes.bigAvatar} />
                      :
                      <img className={classes.bigAvatar}
                        src="https://thai-pga.com/default/match/matchcard.png" />
                      /*<ImageIcon className={classes.bigAvatar} />*/
                  }
                </ListItemAvatar>
                <ListItemText className={classes.listDetail}
                  primary={
                    <Typography className={classes.name} component="div">
                      { d.type === 'match' ?
                        (
                          d.messagedetail && d.messagedetail.matchname
                        )
                        :
                        d.message.split('<$$split$$>')[0]
                      }
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                      {d.type}
                    </Typography>
                  } />
                <ListItemIcon>
                  { editing?
                    <IconButton onClick={()=>handleDeleteItem(d)}>
                      <DeleteIcon classes={{ root: classes.greenIcon }} />
                    </IconButton>
                    :
                    <IconButton onClick={()=>handleSelectPagePost(d)}>
                      <CreateIcon />
                    </IconButton>
                  }
                </ListItemIcon>
              </ListItem>
              <Divider />
            </React.Fragment>
          })
          :
          <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
            <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
              { API._getWord(sess && sess.language).No_post }
            </Box>
          </Typography>
        }
      </List>
      <TemplateDialog maxWidth={selectedTypePost === 'match' ? "md" : "sm"}
        open={dialog.post} handleClose={dialogCloseAll} elementId="create-post-dialog">
        <div className={classes.root}>
          <LabelText text={ API._getWord(sess && sess.language)[ clickAction === 'edit' ? 'Edit_post' : 'Create_post'] } />
          <PageOrganizerPostEditor {...passingProps}
            clickAction={clickAction}
            editingData={editingData}
            handleCloseEditor={dialogCloseAll}
            selectedTypePost={selectedTypePost}
            setSelectedTypePost={setSelectedTypePost} />
        </div>
      </TemplateDialog>
      <TemplateDialog maxWidth="md" open={dialog.createMatch} handleClose={()=>dialogClose('createMatch')}>
        <LabelText text={ API._getWord(sess && sess.language).Create_Match } />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <StyledSwitch checked={isCreateAfterDone} onChange={e =>setIsCreateAfterDone(e.target.checked)} />
            }
            label={ API._getWord(sess && sess.language)['Add to your page after create.'] }
          />
        </div>
        <MatchStepper {...passingProps} isCreateAfterDone={isCreateAfterDone} />
      </TemplateDialog>
      <ConfirmDialog
        sess={sess}
        open={confirmDeleteState}
        onClose={handleConfirmCancel}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          selectedDeleteItem &&
          <Typography variant="body1" align="center">
            { API._getWord(sess && sess.language).Post } : { selectedDeleteItem && selectedDeleteItem.message }
          </Typography>
        }
        onSubmit={handleConfirmDelete}
        submitButton="Red" />
    </div>
  );
}
