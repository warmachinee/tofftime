import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { LDCircular } from './../loading/LDMatchList';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  listDetail: {
    marginRight: 8,
  },
  listAvatar: {
    marginRight: 16,
    [theme.breakpoints.up(900)]: {
      marginRight: 0
    },
  },

}))

export default function PostList(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageData } = props

  async function handleFetchPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postlist',
        pageid: pageid,
        userid: sess.userid,
        type: 'match'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  return (
    <List>
      { [0,1,2,3,4,5,6,7,8,9,10].map( d =>
        <ListItem style={{ padding: 0 }} button key={d}>
          <ListItemAvatar className={classes.listAvatar}>
            <ImageIcon className={classes.bigAvatar}/>
          </ListItemAvatar>
          <ListItemText className={classes.listDetail} primary={'title' + d} secondary={'subtitle' + d}/>
          <ListItemIcon>
            <Typography variant="caption">10 hrs.</Typography>
          </ListItemIcon>
        </ListItem>
      )}
    </List>
  );
}
