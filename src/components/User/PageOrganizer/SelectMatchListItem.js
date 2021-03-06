import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../../api/palette'

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


export default function SelectMatchListItem(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, token, setCSRFToken, data, isSupportWebp, setSelectedMatch } = props

  function handleSelectMatch(){
    setSelectedMatch(data)
  }

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

  React.useEffect(()=>{
    if(props.matchidAfterCreate && data){
      if(data.matchid === props.matchidAfterCreate){
        handleSelectMatch()
      }
    }
  },[ props.matchidAfterCreate ])

  return(
    <div className={classes.root}>
      <List>
        { data ?
          <ListItem button onClick={handleSelectMatch}>
            <ListItemIcon
              className={clsx({
                [classes.listImageUp]: window.innerWidth >= 500,
                [classes.listImageDown]: window.innerWidth < 500
              })}>
              { data.picture ?
                <img className={clsx({
                  [classes.imageUp]: window.innerWidth >= 500,
                  [classes.imageDown]: window.innerWidth < 500
                })}
                  src={API._getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
                :
                <img className={clsx({
                  [classes.imageUp]: window.innerWidth >= 500,
                  [classes.imageDown]: window.innerWidth < 500
                })}
                  src={`https://${API._webURL()}/default/match/matchcard.png`} />
                /*
                <Skeleton className={clsx({
                  [classes.imageUp]: window.innerWidth >= 500,
                  [classes.imageDown]: window.innerWidth < 500
                })} style={{ margin: 0 }} disableAnimate />*/
              }
            </ListItemIcon>
            { window.innerWidth >= 600 &&
              <ListItemText style={{ maxWidth: 100, marginRight: 16, width: '100%' }}
                primary={
                  <Typography variant="subtitle2" color="textSecondary">
                    {API._dateToString(data.date)}
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

            <ListItemText
              style={{ width: 100 }}
              primary={
                <React.Fragment>
                  { !(window.innerWidth >= 600) &&
                    <Typography variant="caption" color="textSecondary">
                      {`${API._dateToString(data.date)} • ${API._shotnessNumber(data.views)} view${data.views > 1? 's' : ''}`}
                    </Typography>
                  }
                  <Typography variant="body2" color="textPrimary" className={classes.listTitle}>
                    {data.title}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                !(window.innerWidth >= 900) &&
                  <Typography variant="body2" color="textSecondary"
                    className={classes.listTitle}>
                    {data.location}
                  </Typography>
              } />
            { window.innerWidth >= 900 &&
              <ListItemText
                style={{ width: 100 }}
                primary={
                  <Typography variant="body2" color="textPrimary"
                    className={classes.listTitle}>
                    {data.location}
                  </Typography>
                } />
            }

          </ListItem>
          :
          <ListItem button>
            <ListItemIcon
              className={clsx({
                [classes.listImageUp]: window.innerWidth >= 500,
                [classes.listImageDown]: window.innerWidth < 500
              })}>
              <Skeleton className={clsx({
                [classes.imageUp]: window.innerWidth >= 500,
                [classes.imageDown]: window.innerWidth < 500
              })} style={{ margin: 0 }} disableAnimate />
            </ListItemIcon>
            { window.innerWidth >= 600 &&
              <div style={{ maxWidth: 100, marginRight: 16, width: '100%' }}>
                <Skeleton height={12} width="80%"/>
                <Skeleton height={12} width="80%"/>
              </div>
            }
            <div style={{ width: '100%' }}>
              <div>
                { !(window.innerWidth >= 600) &&
                  <Skeleton height={12} width="20%" style={{ marginRight: 16 }} />
                }
                <Skeleton style={{ marginRight: 16 }} />
              </div>
              { !(window.innerWidth >= 900) &&
                <Skeleton width="60%" style={{ marginRight: 16 }} />
              }
            </div>
            { window.innerWidth >= 900 &&
              <Skeleton style={{ marginRight: 16, width: '100%' }} />
            }
          </ListItem>
        }
      </List>
      <Divider />
    </div>
  );
}
