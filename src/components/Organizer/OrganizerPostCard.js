import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Box, Typography, Paper, Avatar
} from '@material-ui/core';

import {
  AccountCircle as AccountCircleIcon,

} from '@material-ui/icons';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 24,
    [theme.breakpoints.up(600)]: {
      width: 300,
    },
  },
  box: {
    padding: theme.spacing(1.5)
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
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
  },
  imageGrid: {
    margin: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    fontSize: 48,
    [theme.breakpoints.down(500)]: {
      fontSize: 32,
    },
  },
  avatarImage: {
    width: 48,
    height: 48,
    [theme.breakpoints.down(500)]: {
      width: 32,
      height: 32,
    },
  },

}));

export default function OrganizerPostCard(props) {
  const classes = useStyles();
  const { API, BTN, sess, isSupportWebp, data, loading, pageid, pageData } = props

  return(
    <Paper
      className={classes.root}
      elevation={1}>
      { ( !loading && data && data.message ) ?
        <Box className={classes.box}>
          <BTN.NoStyleLink to={`/post/${pageid}/${data.postid}`}>
            <div style={{ boxSizing: 'border-box' }}>
              <div style={{ display: 'flex' }}>
                <div className={classes.imageGrid}>
                  { pageData.logo ?
                    <Avatar className={classes.avatarImage}
                      src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                    :
                    <AccountCircleIcon classes={{ root: classes.avatar }} />
                  }
                </div>
                <Typography variant="h6" className={classes.title} style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                  {pageData && pageData.pagename}
                </Typography>
              </div>
              <Typography gutterBottom variant="body2" className={classes.title}>
                {data.message && data.message.split('<$$split$$>')[0]}
              </Typography>
              <Typography gutterBottom variant="body2">
                { API._dateToString(data.createdate)}
              </Typography>

            </div>
          </BTN.NoStyleLink>
        </Box>
        :
        <Box className={classes.box}>
          <Skeleton height={25} />
          <Skeleton height={14} width="60%"/>
        </Box>
      }
      { ( data && data.photopath ) ?
        <BTN.NoStyleLink to={`/post/${pageid}/${data.postid}`}>
          <img className={classes.image}
            src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
        </BTN.NoStyleLink>
        :
        /*<Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }} />*/
        <img className={classes.image}
          src="https://thai-pga.com/default/match/matchcard.png" />
      }
      { data &&
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <BTN.NoStyleLink to={`/post/${pageid}/${data.postid}`}>
            <BTN.PrimaryText style={{ margin: 16, }}>{ API._getWord(sess && sess.language).Detail }</BTN.PrimaryText>
          </BTN.NoStyleLink>
        </div>
      }
    </Paper>
  );
}
