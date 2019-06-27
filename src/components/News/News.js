import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import NewsListItem from './NewsListItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: 250,
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 16,
    [theme.breakpoints.up(750)]: {
      maxWidth: 240,
      marginTop: 0,
      maxHeight: 300,
    },
    [theme.breakpoints.up(900)]: {
      maxWidth: 300,
      marginTop: 0,
      maxHeight: 350,
    },
    [theme.breakpoints.up(1000)]: {
      maxWidth: 300,
      marginTop: 0,
      maxHeight: 400,
    },
  },
}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {[0,1,2,3,4].map( d=>
        <div key={d}>
          <NewsListItem />
          <Divider />
        </div>
      )}
    </List>
  );
}
