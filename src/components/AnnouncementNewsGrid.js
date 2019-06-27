import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import { LDSlider } from './loading/LDSlider';
import { LDNews } from './loading/LDNews';

const Slider = Loadable({
  loader: () => import(/* webpackChunkName: "Slider" */'./Announcement/Slider'),
  loading: () => <LDSlider />
});

const News = Loadable({
  loader: () => import(/* webpackChunkName: "News" */'./News/News'),
  loading: () => <LDNews />
});

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(750)]: {
      flexDirection: 'row',
      marginTop: 16
    },
  },
}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider />
      <News />
    </div>
  );
}
