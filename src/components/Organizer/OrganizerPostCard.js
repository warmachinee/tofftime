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

export default function OrganizerPostCard(props) {
  const classes = useStyles();
  const { API, BTN, sess, isSupportWebp, data, loading, pageid, pageData } = props

  return(
    <Paper
      className={classes.root}
      elevation={1}>
      { data && data.message ?
        (
          (
            (
              !Boolean(data.message.split('<$$split$$>')[1]) ||
              data.message.split('<$$split$$>')[1] === '<p><br></p>' ||
              data.message.split('<$$split$$>')[1] === '<p></p>'
            ) && !Boolean(data.photopath)
          ) ?
          ( data.photopath ?
            <img className={classes.image} style={{ cursor: 'auto' }}
              src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
            :
            <img className={classes.image} style={{ cursor: 'auto' }}
              src={`https://${API._webURL()}/default/match/matchcard.png`} />
          )
          :
          <BTN.NoStyleLink to={`/post/${pageid}/${data.postid}`}>
            { data.photopath ?
              <img className={classes.image}
                src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <img className={classes.image}
                src={`https://${API._webURL()}/default/match/matchcard.png`} />
            }
          </BTN.NoStyleLink>
        )
        :
        /*<Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }} />*/
        <img className={classes.image}
          src={`https://${API._webURL()}/default/match/matchcard.png`} />
      }
      { ( !loading && data && data.message ) ?
        <Box className={classes.box}>
          {
            (
              (
                !Boolean(data.message.split('<$$split$$>')[1]) ||
                data.message.split('<$$split$$>')[1] === '<p><br></p>' ||
                data.message.split('<$$split$$>')[1] === '<p></p>'
              ) && !Boolean(data.photopath)
            ) ?
            <div style={{ boxSizing: 'border-box' }}>
              <div style={{ display: 'flex' }}>
                <div className={classes.imageGrid}>
                  { pageData && pageData.logo ?
                    <Avatar className={classes.avatarImage}
                      src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                    :
                    <AccountCircleIcon classes={{ root: classes.avatar }} />
                  }
                </div>
                <div style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                  <Typography variant="body1" className={classes.title} style={{ cursor: 'auto' }}>
                    {pageData && pageData.pagename}
                  </Typography>
                  <Typography gutterBottom variant="caption">
                    { API._getPostTime(sess && sess.language, data.createdate) }
                  </Typography>
                </div>
              </div>
              <Typography gutterBottom variant="body1" className={classes.title} style={{ height: 44, cursor: 'auto' }}>
                {data.message && data.message.split('<$$split$$>')[0]}
              </Typography>
            </div>
            :
            <BTN.NoStyleLink to={`/post/${pageid}/${data.postid}`}>
              <div style={{ boxSizing: 'border-box' }}>
                <div style={{ display: 'flex' }}>
                  <div className={classes.imageGrid}>
                    { pageData && pageData.logo ?
                      <Avatar className={classes.avatarImage}
                        src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                      :
                      <AccountCircleIcon classes={{ root: classes.avatar }} />
                    }
                  </div>
                  <div style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                    <Typography variant="body1" className={classes.title}>
                      {pageData && pageData.pagename}
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      { API._getPostTime(sess && sess.language, data.createdate) }
                    </Typography>
                  </div>
                </div>
                <Typography gutterBottom variant="body1" className={classes.title} style={{ height: 44 }}>
                  {data.message && data.message.split('<$$split$$>')[0]}
                </Typography>
              </div>
            </BTN.NoStyleLink>
          }
        </Box>
        :
        <Box className={classes.box}>
          <Skeleton height={25} />
          <Skeleton height={14} width="60%"/>
        </Box>
      }
      { data && data.message &&
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          {
            (
              (
                !Boolean(data.message.split('<$$split$$>')[1]) ||
                data.message.split('<$$split$$>')[1] === '<p><br></p>' ||
                data.message.split('<$$split$$>')[1] === '<p></p>'
              ) && !Boolean(data.photopath)
            ) ?
            <BTN.PrimaryText
              disabled
              size="small" style={{ margin: '0px 12px 6px 0px', }}>{ API._getWord(sess && sess.language).Read_more }</BTN.PrimaryText>
            :
            <BTN.NoStyleLink to={`/post/${pageid}/${data.postid}`}>
              <BTN.PrimaryText
                size="small" style={{ margin: '0px 12px 6px 0px', }}>{ API._getWord(sess && sess.language).Read_more }</BTN.PrimaryText>
            </BTN.NoStyleLink>
          }
        </div>
      }
    </Paper>
  );
}
