import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
}));

export default function NewsListItem(props) {
  const classes = useStyles();
  const { data } = props

  return (
    <Link to={`/detail/${data.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt={data.title} src={data.img} className={classes.bigAvatar} />
        </ListItemAvatar>
        <ListItemText primary={data.title} />
      </ListItem>
    </Link>
  );
}
