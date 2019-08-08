import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import ImageIcon from '@material-ui/icons/Image';

import * as API from './../../api'

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
}));

export default function NewsListItem(props) {
  const classes = useStyles();
  const { data, isSupportWebp, time } = props
  const hd = ( window.location.href.substring(0, 25) === 'https://www.' + API.webURL() )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()

  return (
    <Link to={`/news/${data.newsid}`} style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItem style={{ padding: 0 }} button>
        <ListItemAvatar className={classes.listAvatar}>
          { data.picture?
            <Avatar alt={data.title}
              src={
                isSupportWebp?
                currentWebURL + data.picture + '.webp'
                :
                currentWebURL + data.picture + '.jpg'
              }
              className={classes.bigAvatar} />
            :
            <ImageIcon className={classes.bigAvatar}/>
          }
        </ListItemAvatar>
        <ListItemText className={classes.listDetail} primary={data.title} secondary={data.subtitle}/>
        <ListItemIcon>
          <Typography variant="caption">{time}</Typography>
        </ListItemIcon>
      </ListItem>
    </Link>
  );
}
