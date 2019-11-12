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
    const resToken = token? token : await API._xhrGet('getcsrf')
    const d = await API._xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcelist`
    )
    setCSRFToken(d.token)
    if(window.innerWidth <= 500){
      setData(d.response)
    }else{
      setData({
        primary: d.response.slice(0, 1).concat(d.response.slice(3, d.response.length)),
        secondary: d.response.slice(1, 3)
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ window.innerWidth ])

  return (
    <div className={classes.root}>
      <AnnouncePrimary {...props}
        data={
          window.innerWidth > 500 ?
          (data ? data.primary : null)
          :
          data
        } />
      { data && window.innerWidth > 500 && data.secondary.length > 0 &&
        <AnnounceSecondary {...props} data={ data ? data.secondary : null} />
      }
    </div>
  );
}
