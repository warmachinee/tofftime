import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import NewsListItem from './NewsListItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 32,
    marginBottom: 16
  },
}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {[0,1,2,3,4].map( d=>
        <NewsListItem key={d}/>
      )}
    </List>
  );
}
