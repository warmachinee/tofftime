import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    WebkitFlexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      width: '100%',
    },
    [theme.breakpoints.up(900)]: {
      flexDirection: 'column',
      WebkitFlexDirection: 'column',
      width: '30%',
    },
  },
  itemGrid: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: window.innerWidth * .3,
    [theme.breakpoints.up(900)]: {
      height: '100%',
      paddingLeft: 16
    },
  },
  item: {
    height: '100%',
    width: '100%',
    color: 'black',
    display: 'block',
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    '&:hover': {
      opacity: .7
    },
    [theme.breakpoints.down(450)]: {
      height: 72
    },
    [theme.breakpoints.up(900)]: {
      height: window.innerWidth * .3,
      maxHeight: (450 - 24)/2,
    },
  },
  label: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    color: grey[50],
    backgroundColor: grey[900],
    opacity: .8,
    fontSize: 16,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'monospace',
    textAlign: 'center',
    padding: theme.spacing(2, 1),
    maxHeight: 72,
    height: '100%',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.6,
    '&:hover': {
      backgroundColor: grey[700],
    },
    [theme.breakpoints.up(900)]: {
      width: 'calc(100% - 16px)',
    },
  },
  skeleton: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    backgroundColor: grey[300],
    margin: 0
  },

}));

export default function AnnounceSecondary(props) {
  const classes = useStyles();
  const { API, BTN, data, isSupportWebp } = props

  return (
    <div className={classes.root}>
      { ( data && data.length > 0 ) ?
        <BTN.NoStyleLink to={`/announce/${data[0].announceid}`}
          style={{
            ...(window.innerWidth >= 900 && {marginBottom: 24}),
            ...(window.innerWidth < 900 && {
              marginBottom: 0,
              marginRight: 16,
              marginTop: 16
            })
          }}>
          <div className={classes.itemGrid}>
            { data[0].picture ?
              <img className={classes.item} src={API._getPictureUrl(data[0].picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <Skeleton className={classes.skeleton} />
            }
            { data[0].title &&
              <div className={classes.label}>
                {data[0].title}
              </div>
            }
          </div>
        </BTN.NoStyleLink>
        :
        <div className={classes.itemGrid}
          style={{
            ...(window.innerWidth >= 900 && {marginBottom: 24}),
            ...(window.innerWidth < 900 && {
              marginBottom: 0,
              marginRight: 16,
              marginTop: 16
            })
          }}>
          <Skeleton className={classes.skeleton} />
        </div>
      }
      { ( data && data.length > 1 ) ?
        <BTN.NoStyleLink to={`/announce/${data[1].announceid}`}
          style={{ ...(window.innerWidth >= 900 && {marginBottom: 24}), ...(window.innerWidth < 900 && {marginBottom: 0, marginTop: 16}) }}>
          <div className={classes.itemGrid}>
            { data[1].picture ?
              <img className={classes.item} src={API._getPictureUrl(data[1].picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <Skeleton className={classes.skeleton} />
            }
            { data[1].title &&
              <div className={classes.label}>
                {data[1].title}
              </div>
            }
          </div>
        </BTN.NoStyleLink>
        :
        <div className={classes.itemGrid}
          style={{ ...(window.innerWidth >= 900 && {marginBottom: 24}), ...(window.innerWidth < 900 && {marginBottom: 0, marginTop: 16}) }}>
          <Skeleton className={classes.skeleton} />
        </div>
      }
    </div>
  );
}
