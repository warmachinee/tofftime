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
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  listImage: {
    width: 36,
    marginRight: 0,
    [theme.breakpoints.up(500)]: {
      width: 48,
      marginRight: 16,
    },
  },
  image: {
    width: 36,
    height: 36,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
    [theme.breakpoints.up(500)]: {
      width: 48,
      height: 48,
    },
  },
  listTitle: {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  listTitleShow: {
    [theme.breakpoints.up(900)]: {
      display: 'none',
    },
  },
  listTitleHidden: {
    [theme.breakpoints.down(900)]: {
      display: 'none',
    },
  },
  listDateShow: {
    [theme.breakpoints.up(600)]: {
      display: 'none',
    },
  },
  listDateHidden: {
    [theme.breakpoints.down(600)]: {
      display: 'none',
    },
  },

}));


export default function HistoryList(props) {
  const classes = useStyles();
  const { API, COLOR, token, setCSRFToken, data, isSupportWebp } = props

  return(
    <div className={classes.root}>
      <List>
        <ListItem button>
          <ListItemIcon className={classes.listImage}>
            { data.matchphoto ?
              <img className={classes.image}
                src={API.getPictureUrl(data.matchphoto) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <Skeleton className={classes.image} style={{ margin: 0 }} disableAnimate/>
            }
          </ListItemIcon>
          <ListItemText style={{ maxWidth: 100, marginRight: 16, width: '100%' }}
            className={classes.listDateHidden}
            primary={
              <Typography variant="subtitle2" color="textSecondary">
                {API.handleGetDate(data.matchdate)}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography variant="caption" color="textSecondary">
                  {data.views + 'views'}
                </Typography>
              </React.Fragment>
            }/>
          {/*
            <ListItemIcon>
              { data.scorematch === 1 ?
                <CheckCircle style={{ color: COLOR.primary[500] }}/>
                :
                <div style={{ width: 24 }} />
              }
            </ListItemIcon>*/
          }
          <ListItemText className={classes.listTitle}
            primary={
              <React.Fragment>
                <Typography variant="caption" color="textSecondary" className={classes.listDateShow}>
                  {`${API.handleGetDate(data.matchdate)} • ${data.views + 'views'}`}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {data.matchname}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <Typography variant="body2" color="textSecondary" className={classes.listTitleShow}>
                {data.fieldname}
              </Typography>
            } />
          <ListItemText className={clsx(classes.listTitle, classes.listTitleHidden)} primary={data.fieldname} />
          <ListItemIcon>
            <Typography variant="subtitle2" color="textSecondary">
              {data.hc}
            </Typography>
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
