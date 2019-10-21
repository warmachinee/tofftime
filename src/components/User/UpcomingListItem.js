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


export default function UpcomingListItem(props) {
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
                        {data.views + ' views'}
                      </Typography>
                    </React.Fragment>
                  } />
              }

              <ListItemText
                style={{ width: 100 }}
                primary={
                  <React.Fragment>
                    { !( open ? window.innerWidth >= 840 : window.innerWidth >= 600) &&
                      <Typography variant="caption" color="textSecondary">
                        {`${API._dateToString(data.matchdate)} • ${data.views + ' views'}`}
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
          </ListItem>
        }
      </List>
      <Divider />
    </div>
  );
}
