import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({

}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Photos" secondary="Jan 9, 2014" />
    </ListItem>
  );
}
