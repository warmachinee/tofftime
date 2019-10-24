import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,

} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

import {
  CheckCircle

} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {

  },
  listImageDown: {
    width: 36,
    marginRight: 0,
  },
  listImageUp: {
    width: 48,
    marginRight: 16,
  },
  imageDown: {
    width: 36,
    height: 36,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
  },
  imageUp: {
    width: 48,
    height: 48,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
  },
  listTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginRight: 16
  },

}));

export default function HistoryList(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, token, setCSRFToken, data, isSupportWebp, open } = props

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return(
    <div className={classes.root}>
      <List>
        { data ?
          <BTN.NoStyleLink to={`/match/${data.matchid}`}>
            <ListItem button>
              <ListItemIcon
                className={clsx({
                  [classes.listImageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                  [classes.listImageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
                })}>
                { data.matchphoto ?
                  <img className={clsx({
                    [classes.imageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                    [classes.imageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
                  })}
                    src={API._getPictureUrl(data.matchphoto) + ( isSupportWebp? '.webp' : '.jpg' )} />
                  :
                  <Skeleton className={clsx({
                    [classes.imageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                    [classes.imageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
                  })} style={{ margin: 0 }} disableAnimate />
                }
              </ListItemIcon>
              { ( open ? window.innerWidth >= 840 : window.innerWidth >= 600) &&
                <ListItemText style={{ maxWidth: 100, marginRight: 16, width: '100%' }}
                  primary={
                    <Typography variant="subtitle2" color="textSecondary">
                      {API._dateToString(data.matchdate)}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="caption" color="textSecondary">
                        {API._shotnessNumber(data.views)}{` view${data.views > 1? 's' : ''}`}
                      </Typography>
                    </React.Fragment>
                  } />
              }

              {/*
                <ListItemIcon>
                  { data.scorematch === 1 ?
                    <CheckCircle style={{ color: COLOR.primary[500] }} />
                    :
                    <div style={{ width: 24 }} />
                  }
                </ListItemIcon>*/
              }

              <ListItemText
                style={{ width: 100 }}
                primary={
                  <React.Fragment>
                    { !( open ? window.innerWidth >= 840 : window.innerWidth >= 600) &&
                      <Typography variant="caption" color="textSecondary">
                        {`${API._dateToString(data.matchdate)} • ${API._shotnessNumber(data.views)} view${data.views > 1? 's' : ''}`}
                      </Typography>
                    }
                    <Typography variant="body2" color="textPrimary" className={classes.listTitle}>
                      {data.matchname}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  !( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
                    <Typography variant="body2" color="textSecondary"
                      className={classes.listTitle}>
                      {data.fieldname}
                    </Typography>
                } />
              { ( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
                <ListItemText
                  style={{ width: 100 }}
                  primary={
                    <Typography variant="body2" color="textPrimary"
                      className={classes.listTitle}>
                      {data.fieldname}
                    </Typography>
                  } />
              }
              <ListItemIcon style={{ ...( open ? window.innerWidth < 690 : window.innerWidth < 450) && { minWidth: 32 }}}>
                <Typography variant="subtitle2" color="textSecondary"
                  style={{ marginRight: 16, marginLeft: 'auto' }}>
                  {data.hc}
                </Typography>
              </ListItemIcon>

            </ListItem>
          </BTN.NoStyleLink>
          :
          <ListItem button>
            <ListItemIcon
              className={clsx({
                [classes.listImageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                [classes.listImageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
              })}>
              <Skeleton className={clsx({
                [classes.imageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                [classes.imageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
              })} style={{ margin: 0 }} disableAnimate />
            </ListItemIcon>
            { ( open ? window.innerWidth >= 840 : window.innerWidth >= 600) &&
              <div style={{ maxWidth: 100, marginRight: 16, width: '100%' }}>
                <Skeleton height={12} width="80%"/>
                <Skeleton height={12} width="80%"/>
              </div>
            }
            <div style={{ width: '100%' }}>
              <div>
                { !( open ? window.innerWidth >= 840 : window.innerWidth >= 600) &&
                  <Skeleton height={12} width="20%" style={{ marginRight: 16 }} />
                }
                <Skeleton style={{ marginRight: 16 }} />
              </div>
              { !( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
                <Skeleton width="60%" style={{ marginRight: 16 }} />
              }
            </div>
            { ( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
              <Skeleton style={{ marginRight: 16, width: '100%' }} />
            }
            <ListItemIcon style={{ ...( open ? window.innerWidth < 690 : window.innerWidth < 450) && { minWidth: 32 }}}>
              <Skeleton width={ ( open ? window.innerWidth < 690 : window.innerWidth < 450) ? 24 : 36 }
                style={{ marginRight: 16, marginLeft: 'auto' }} />
            </ListItemIcon>
          </ListItem>
        }
      </List>
      <Divider />
    </div>
  );
}
