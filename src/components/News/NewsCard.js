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
    padding: theme.spacing(1.5, 1.5, 0, 1.5)
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
    margin: '0 12px 8px 0',
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

export default function NewsCard(props) {
  const classes = useStyles();
  const { API, BTN, sess, isSupportWebp, data, loading } = props

  return(
    <Paper
      className={classes.root}
      elevation={1}>
      { data ?
        <BTN.NoStyleLink to={`/news/${data.newsid}`}>
          { data.picture ?
            <img className={classes.image}
              src={API._getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
            :
            <img className={classes.image}
              src={`https://${API._webURL()}/default/match/matchcard.png`} />
          }
        </BTN.NoStyleLink>
        :
        /*<Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }} />*/
        <img className={classes.image}
          src={`https://${API._webURL()}/default/match/matchcard.png`} />
      }
      { ( !loading && data ) ?
        <Box className={classes.box}>
          <BTN.NoStyleLink to={`/news/${data.newsid}`}>
            <div style={{ boxSizing: 'border-box' }}>
              <div style={{ display: 'flex' }}>
                <div className={classes.imageGrid}>
                  <Avatar className={classes.avatarImage}
                    src={`https://file.${API._webURL()}/system/image/logoX2.png`} />
                </div>
                <div style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                  <Typography variant="body1" className={classes.title}>
                    {"T-off Time"}
                  </Typography>
                  <Typography gutterBottom variant="caption">
                    { API._getPostTime(sess && sess.language, data.createdate) }
                  </Typography>
                </div>
              </div>
              <Typography gutterBottom variant="body1" className={classes.title} style={{ height: 44 }}>
                {data.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.title} style={{ height: 38 }}>
                {data.subtitle}
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
      { data &&
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <BTN.NoStyleLink to={`/news/${data.newsid}`}>
            <BTN.PrimaryText size="small" style={{ margin: '0px 12px 6px 0px', }}>{ API._getWord(sess && sess.language).Read_more }</BTN.PrimaryText>
          </BTN.NoStyleLink>
        </div>
      }
    </Paper>
  );
}
