import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

import {
  Avatar,
  Typography,
  IconButton,

} from '@material-ui/core';

import AccountIcon from '@material-ui/icons/AccountCircle';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  grid: {
    marginTop: 24,
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    boxSizing: 'border-box',
  },
  marginAuto: {
    marginRight: 'auto',
  },
  iconButton: {
    marginBottom: 16,
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
  },
  avatar: {
    height: 72,
    width: 72,
  },
  avatarIcon: {
    fontSize: 72
  },
  title: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    width: 100,
    textAlign: 'center',
    '&:hover': {
      fontWeight: 600,
    },
  },

}));

export default function OrganizerList(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, BTN, isSupportWebp, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mloadpage', {
        action: 'list',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(!d.status){
        setData(d)
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div id="el_organizer" className={classes.root}>
      { data && data.length > 0 &&
        <React.Fragment>
          <LabelText text={ ( sess && sess.language === 'TH' ) ? "ผู้จัดการแข่งขัน" : 'Organizer' } />
          <div className={classes.grid}>
            { data.map(
              d =>
              <div style={{ display: 'flex', flexDirection: 'column' }} key={d.pageid} className={classes.marginAuto}>
                <BTN.NoStyleLink to={`/page/${d.pageid}`}>
                  { d.logo ?
                    <IconButton className={classes.iconButton}>
                      <Avatar className={classes.avatar} src={API.getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                    </IconButton>
                    :
                    <IconButton className={classes.iconButton}>
                      <Avatar className={classes.avatar}>
                        <AccountIcon classes={{ root: classes.avatarIcon }} />
                      </Avatar>
                    </IconButton>
                  }
                </BTN.NoStyleLink>
                <BTN.NoStyleLink to={`/page/${d.pageid}`}>
                  <Typography className={classes.title}>
                    {d.pagename}
                  </Typography>
                </BTN.NoStyleLink>
              </div>
            )}
          </div>
        </React.Fragment>
      }
    </div>
  );
}
