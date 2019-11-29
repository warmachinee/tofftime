import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

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

  function handleOpen(action){
    setClickAction(action)
    setOpen(!open)
  }

  function handleSelectPagePost(d){
    handleOpen('edit')
    setEditingData(d)
  }

  function handleClose(){
    setOpen(!open)
    handleOpen('')
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
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ open, confirmDeleteState ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          { API._getWord(sess && sess.language).Page_post }
        </Box>
      </Typography>
      <div style={{ display: 'flex' }}>
        <RedButton style={{ padding: '8px 16px 8px 0' }} variant="contained" color="secondary"
          onClick={()=>handleOpen('create')}>
          <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }} />
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
          API.sortArrByDate(data, 'createdate', 'title').map( d =>{
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
                      <ImageIcon className={classes.bigAvatar} />
                  }
                </ListItemAvatar>
                <ListItemText className={classes.listDetail}
                  primary={
                    <Typography className={classes.name} component="div">
                      {d.message.split('<$$split$$>')[0]}
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
        })}
      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <div>
          <LabelText
            text={
              clickAction === 'edit' ?
              ( API._getWord(sess && sess.language).Edit_post )
              :
              ( API._getWord(sess && sess.language).Create_post )
            } />
          <PageOrganizerPostEditor {...props} clickAction={clickAction} editingData={editingData} handleCloseEditor={handleClose} />
        </div>
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
