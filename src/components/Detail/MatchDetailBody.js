import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';

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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  back: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: teal[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
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
    color: teal[900],
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
    color: teal[800],
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  locationIcon: {
    fontSize: 24,
    marginLeft: -8,
    color: teal[600],
    '&:hover': {
      color: teal[800],
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
    color: teal[800],
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
  const { data, userscore, matchid, token, setCSRFToken } = props
  const [ expanded, setExpanded ] = React.useState(false)
  const matchPicture = data?('https://tofftime.com/' + data.picture):null
  const imageEl = React.useRef(null)
  function expandHandler(){
    setExpanded(!expanded)
  }

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
        <ArrowBackIcon classes={{ root: classes.backIcon }}/>
      </IconButton>
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
              {data?data.location:'Location'}
            </Box>
          </Typography>
          <div>
            {matchPicture?
              <img ref={imageEl} src={matchPicture} align="left" className={classes.image} />
            :
              <div align="left" className={classes.imageLD}>
                <div style={{ flex: 1 }}></div>
                <center style={{ fontSize: 24, fontWeight: 500 }}>No Image</center>
                <div style={{ flex: 1 }}></div>
              </div>
            }
          </div>
          <p className={classes.detail}>
            Match detail
          </p>
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
              <Scoreboard token={token} setCSRFToken={setCSRFToken}
                data={data} userscore={userscore} matchClass={data && data.class} matchid={matchid}/>

            }
          </Collapse>
        </React.Fragment>
      </div>
      {/*--------------------End Content--------------------*/}

    </Paper >
  );
}
export default MatchDetailBody;
