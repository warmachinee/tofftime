import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary } from './../../api/palette'

import Scoreboard from './Scoreboard'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { LDCircular } from './../loading/LDCircular'

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  content: {
    margin: '0 5%',
    [theme.breakpoints.up(500)]: {
      margin: '0 5%',
    },
    [theme.breakpoints.up(700)]: {
      margin: '0 72px',
    },
  },
  title: {
    color: primary[900],
    fontWeight: 600,
    fontVariant: 'petite-caps',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  date: {
    fontStyle: 'oblique',
    paddingBottom: 8
  },
  location: {
    marginLeft: 4,
    marginTop: 4,
    fontWeight: 600,
    color: primary[800],
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  locationIcon: {
    fontSize: 24,
    marginLeft: -8,
    color: primary[600],
    '&:hover': {
      color: primary[800],
    },
  },
  imageGrid: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(700)]: {
      flexDirection: 'row',
    },
  },
  image: {
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginRight: 0,
    marginBottom: 8,
    backgroundPosition: 'center',
    [theme.breakpoints.up(900)]: {
      width: '60%',
      marginRight: 16,
      marginBottom: 8,
    },
  },
  imageLD: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5%',
    height: 200,
    width: '100%',
    backgroundColor: '#ccc',
    [theme.breakpoints.up(400)]: {
      height: 250,
    },
    [theme.breakpoints.up(500)]: {
      height: 300,
    },
    [theme.breakpoints.up(600)]: {
      height: 350,
    },
    [theme.breakpoints.up(700)]: {
      width: '60%',
      height: 250,
    },
  },
  detail: {
    fontSize: 16,
    fontWeight: 600,
    color: primary[800],
    minHeight: 200,
    [theme.breakpoints.up(700)]: {
      minHeight: 250,
    },
    [theme.breakpoints.up(950)]: {
      minHeight: 300,
    },
    [theme.breakpoints.up(1100)]: {
      minHeight: 360,
    },
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

}));

function MatchDetailBody(props) {
  const classes = useStyles();
  const { data, userscore, matchid, token, setCSRFToken, isSupportWebp } = props
  const [ expanded, setExpanded ] = React.useState(true)
  const hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
  const matchPicture = data?( hd + API.webURL().substring(0, API.webURL().length - 1) + data.picture ):null

  function expandHandler(){
    setExpanded(!expanded)
  }

  React.useEffect(()=>{
    window.scrollTo(0, 0)
  },[ ])

  return (
    <Paper className={classes.root}>
      <GoBack goBackDetail/>

      {/*--------------------Content--------------------*/}
      <div className={classes.content}>
        {/*--------------------Match Attribute--------------------*/}
        <React.Fragment>
          <Tooltip title={data?data.title:'Match Title'} placement="top-start">
            <Typography classes={{ root: classes.title }} variant="h5">
              {data?data.title:'Match Title'}
            </Typography>
          </Tooltip>
          <Typography component="div">
            <Box className={classes.date} fontFamily="Monospace">
              {data?data.date:'01/01/2000'}
            </Box>
          </Typography>
          <Typography gutterBottom component="div" style={{ display: 'flex' }}>
            <LocationOnIcon className={classes.locationIcon}/>
            <Box className={classes.location} >
              {data?data.location:'Location'} {data? '(' + data.locationversion + ')':''}
            </Box>
          </Typography>
          <div>
            { matchPicture &&
              isSupportWebp?
              <img src={matchPicture + '.webp'} align="left" className={classes.image} />
              :
              <img src={matchPicture + '.jpg'} align="left" className={classes.image} />
            }
          </div>
          {/*
            <p className={classes.detail}>
              { data?
                data.date + data.location
                :
                'Match Detail'
              }
            </p>*/
          }
          {/*--------------------End Match Attribute--------------------*/}
        </React.Fragment>
        {/*--------------------End Match Attribute--------------------*/}
        <React.Fragment>
          <ListItem button onClick={expandHandler}
            style={{
              marginTop: 16,
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
            }}>
            <ListItemText primary="Scoreboard" />
            <IconButton
              disableRipple
              className={classes.expandIcon}
              style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
              onClick={expandHandler}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </ListItem>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            { data && userscore &&
              <Scoreboard {...props} matchClass={data && data.class} />

            }
          </Collapse>
        </React.Fragment>
      </div>
      {/*--------------------End Content--------------------*/}

    </Paper >
  );
}
export default MatchDetailBody;
