import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Paper, Grid, Hidden, IconButton,
} from '@material-ui/core';

import AnnouncePrimarySkeleton from './AnnouncePrimarySkeleton'
import AnnounceSecondarySkeleton from './AnnounceSecondarySkeleton'

const AnnouncePrimary = Loadable({
  loader: () => import(/* webpackChunkName: "AnnouncePrimary" */'./AnnouncePrimary'),
  loading: () => <AnnouncePrimarySkeleton />
});

const AnnounceSecondary = Loadable({
  loader: () => import(/* webpackChunkName: "AnnounceSecondary" */'./AnnounceSecondary'),
  loading: () => <AnnounceSecondarySkeleton />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    WebkitFlexDirection: 'column',
    boxSizing: 'border-box',
    paddingTop: theme.spacing(1.5),
    [theme.breakpoints.up(900)]: {
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      padding: theme.spacing(1.5),
      paddingRight: 0
    },
  },

}));

export default function Announce(props) {
  const classes = useStyles(props);
  const { COLOR, API, BTN, isSupportWebp, token, setCSRFToken } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcelist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      <AnnouncePrimary {...props} data={data} />
      <AnnounceSecondary {...props} />
    </div>
  );
}
