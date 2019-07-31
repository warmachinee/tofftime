import React from 'react';
import Loadable from 'react-loadable';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImageIcon from '@material-ui/icons/Image';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const AnnouncementEditor = Loadable({
  loader: () => import(/* webpackChunkName: "AnnouncementEditor" */'./AnnouncementEditor'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'../../GoBack'),
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
    textAlign: 'center', color: teal[900],
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
    color: teal[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

export default function Announcement(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ edittingData, setEdittingData ] = React.useState(null)
  const [ clickAction, setClickAction ] = React.useState('')
  const hd = ( window.location.href.substring(0, 25) === 'https://www.' + API.webURL() )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()

  function handleOpen(action){
    setClickAction(action)
    setOpen(!open)
  }

  function handleSelectAnnouncement(d){
    handleOpen('edit')
    setEdittingData(d)
  }

  function handleClose(){
    setOpen(!open)
    handleOpen('')
    setEdittingData(null)
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'announce',
    }, (csrf, d) =>{
      console.log(d);
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Announcement
        </Box>
      </Typography>
      <RedButton style={{ marginTop: 'auto', padding: '8px 16px 8px 0' }} variant="contained" color="secondary"
        onClick={()=>handleOpen('create')}>
        <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }}/>
        Create
      </RedButton>
      <List>
        <ListItem className={classes.tableHead}>
          <ListItemAvatar style={{ marginRight: 16 }}>
            <div style={{ margin: 10, width: 60, height: 24 }}></div>
          </ListItemAvatar>
          <StyledText primary="Announcement" />
        </ListItem>
      </List>
      <List className={classes.listRoot}>
        { data &&
          data.map( d =>
            d &&
            <React.Fragment key={d.announceid}>
              <ListItem>
                <ListItemAvatar style={{ marginRight: 16 }}>
                  { d.picture?
                    <Avatar alt={d.title}
                      src={
                        isSupportWebp?
                        currentWebURL + d.picture + '.webp'
                        :
                        currentWebURL + d.picture + '.jpg'
                      }
                      className={classes.bigAvatar} />
                    :
                    <ImageIcon className={classes.bigAvatar}/>
                  }
                </ListItemAvatar>
                <ListItemText className={classes.listDetail} primary={d.title}/>
                <ListItemIcon>
                  <GreenTextButton onClick={()=>handleSelectAnnouncement(d)}>Edit</GreenTextButton>
                </ListItemIcon>
              </ListItem>
              <Divider />
              { /*ReactHtmlParser(d.announcedetail)*/ }
            </React.Fragment>
        )}
      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <AnnouncementEditor clickAction={clickAction} handleClose={handleClose}
          edittingData={edittingData} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
      </TemplateDialog>
    </div>
  );
}
