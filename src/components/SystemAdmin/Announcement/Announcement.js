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

const AnnouncementEditor = Loadable({
  loader: () => import(/* webpackChunkName: "AnnouncementEditor" */'./AnnouncementEditor'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
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

export default function Announcement(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
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

  function handleSelectAnnounce(d){
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
      'announcemain', {
        action: 'delete',
        announceid: data.announceid
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
    const d = await API._xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcelist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    handleFetch()
  },[ open ])

  return(
    <div className={classes.root}>
      <GoBack to='/system_admin/' />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Announce
        </Box>
      </Typography>
      <div style={{ display: 'flex' }}>
        <RedButton style={{ padding: '8px 16px 8px 0' }} variant="contained" color="secondary"
          onClick={()=>handleOpen('create')}>
          <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }} />
          Create
        </RedButton>
        <div style={{ flex: 1 }} />
        <GreenTextButton style={{ padding: '8px 24px' }}
          variant={ editing? 'text' : 'outlined' }
          onClick={()=>setEditing(!editing)}>
          { editing? 'Done' : 'Remove' }
        </GreenTextButton>
      </div>
      <List>
        <ListItem className={classes.tableHead}>
          <ListItemAvatar style={{ marginRight: 16 }}>
            <div style={{ margin: 10, width: 60, height: 24 }}></div>
          </ListItemAvatar>
          <StyledText primary="Announce" />
        </ListItem>
      </List>
      <List className={classes.listRoot}>
        { data && !data.status && /*API._sortArrByDate(data, 'createdate', 'title')*/
          data.map( d =>{
            return d &&
            <React.Fragment key={d.announceid}>
              <ListItem>
                <ListItemAvatar style={{ marginRight: 16 }}>
                  {
                    d.picture?
                      <Avatar
                        alt={d.title}
                        src={API._getPictureUrl(d.picture) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}
                        className={classes.bigAvatar} />
                      :
                      <ImageIcon className={classes.bigAvatar} />
                  }
                </ListItemAvatar>
                <ListItemText className={classes.listDetail} primary={d.title} />
                <ListItemIcon>
                  { editing?
                    <IconButton onClick={()=>handleDeleteItem(d)}>
                      <DeleteIcon classes={{ root: classes.greenIcon }} />
                    </IconButton>
                    :
                    <IconButton onClick={()=>handleSelectAnnounce(d)}>
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
        <AnnouncementEditor
          {...props}
          handleClose={handleClose}
          clickAction={clickAction}
          editingData={editingData} />
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
            { selectedDeleteItem && selectedDeleteItem.title }
          </Typography>
        }
        onSubmit={handleConfirmDelete}
        submitButton="Red" />
    </div>
  );
}
