import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Paper, Box, Typography,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
    fontWeight: 600
  },
  location: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    fontSize: 13
  },
  locationIcon: {
    position: 'relative',
    color: primary[600],
    top: 4,
    left: -4
  },

}));


export default function OrganizerMatchCard(props) {
  const classes = useStyles();
  const { API, BTN, data, isSupportWebp, sess } = props
  const [ paperHover, setPaperHover ] = React.useState(0)

  return(
    <Paper
      className={classes.root}
      elevation={ ( data && window.innerWidth >= 600 ) ? paperHover : 1}
      {...data?
        {
          onMouseEnter: ()=>setPaperHover(3),
          onMouseLeave: ()=>setPaperHover(0),
        } : null
      }>
      { data &&
        (
          ( data.messagedetail && data.photopath ) ?
          <BTN.NoStyleLink to={`/match/${data.messagedetail[0].matchid}`}>
            <img className={classes.image}
              src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
          </BTN.NoStyleLink>
          :
          (
            ( data.messagedetail && data.messagedetail[0].photopath ) ?
            <BTN.NoStyleLink to={`/match/${data.messagedetail[0].matchid}`}>
              <img className={classes.image}
                src={API.getPictureUrl(data.messagedetail[0].photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
            </BTN.NoStyleLink>
            :
            <Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }}/>
          )
        )
      }
      { ( data && data.messagedetail )?
        <Box className={classes.box}>
          <BTN.NoStyleLink to={`/match/${data.messagedetail[0].matchid}`}>
            <Typography gutterBottom variant="body1" className={classes.title}>
              {data.message}
            </Typography>
          </BTN.NoStyleLink>
          <BTN.NoStyleLink to={`/match/${data.messagedetail[0].matchid}`}>
            <Typography gutterBottom display="block" variant="caption" className={classes.location}>
              {data.messagedetail[0].matchname}
            </Typography>
          </BTN.NoStyleLink>
          <BTN.NoStyleLink to={`/match/${data.messagedetail[0].matchid}`}>
            <Typography gutterBottom display="block" variant="caption" className={classes.location}>
              <LocationOnIcon fontSize="small" className={classes.locationIcon}/>
              {data.messagedetail[0].fieldname + `(${data.messagedetail[0].fieldversion})`}
            </Typography>
          </BTN.NoStyleLink>
          <Typography variant="caption" color="textSecondary">
            {/*${data.views + 'views'} • */`${API.handleGetDate(data.messagedetail[0].matchdate)}`}
          </Typography>
        </Box>
        :
        <Box className={classes.box}>
          <Skeleton height={25} />
          <Skeleton height={14} width="60%"/>
        </Box>
      }
    </Paper>
  );
}
