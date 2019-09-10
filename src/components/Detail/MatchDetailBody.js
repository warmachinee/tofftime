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
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    maxWidth: 800,
    height: window.innerWidth * .45,
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
  const { BTN, data, userscore, matchid, token, setCSRFToken, isSupportWebp } = props
  const [ expanded, setExpanded ] = React.useState(true)
  const [ matchDetail, setMatchDetail ] = React.useState(null)

  function expandHandler(){
    setExpanded(!expanded)
  }

  React.useEffect(()=>{
    window.scrollTo(0, 0)
  },[ ])

  return (
    <Paper className={classes.root}>
      <GoBack />

      {/*--------------------Content--------------------*/}
      <div className={classes.content}>
        {/*--------------------Match Attribute--------------------*/}
        <React.Fragment>
          <Tooltip gutterBottom title={data?data.title:'Match Title'} placement="top-start">
            <Typography classes={{ root: classes.title }} variant="h5">
              {data?data.title:'Match Title'}
            </Typography>
          </Tooltip>
          <Typography gutterBottom variant="h6" color="textSecondary">
            { data &&
              (
                data.scorematch === 1 ? 'Pro' : 'Amateur'
              )
            }
          </Typography>
          <div style={{ display: 'flex' }}>
            { BTN && data && data.team && data.team.length > 0 &&
              <BTN.NoStyleLink to={`/schedule/${matchid}`}>
                <BTN.PrimaryText>Schedule</BTN.PrimaryText>
              </BTN.NoStyleLink>
            }
            { matchid && BTN &&
              <BTN.NoStyleLink to={`/matchform/${matchid}`}>
                <BTN.PrimaryText>Form</BTN.PrimaryText>
              </BTN.NoStyleLink>
            }
          </div>
          <Typography component="div">
            <Box className={classes.date} fontFamily="Monospace">
              {data?data.date:'date'}
            </Box>
          </Typography>
          <Typography gutterBottom component="div" style={{ display: 'flex' }}>
            <LocationOnIcon className={classes.locationIcon}/>
            <Box className={classes.location} >
              {data?data.location:'Location'} {data? '(' + data.locationversion + ')':''}
            </Box>
          </Typography>
          <div className={classes.imageGrid}>
            { data && data.picture &&
              <img align="left" className={classes.image}
                src={API.getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )}/>
            }
          </div>
          <div style={{ marginTop: 16 }}>
            { data && data.scorematch === 0 && data.class &&
              data.class.map( (d, i) =>{
                if(i === data.class.length - 1 ){
                  return(
                    <div style={{ display: 'flex' }} key={d.classno}>
                      <Typography style={{ fontWeight: 600, marginRight: 12 }} variant="body1">
                        Flight {API.handleAmateurClass(d.classno)}
                      </Typography>
                      <Typography>
                        handicap {d.classname} - up
                      </Typography>
                    </div>
                  )
                }else{
                  return (
                    <div style={{ display: 'flex' }} key={d.classno}>
                      <Typography style={{ fontWeight: 600, marginRight: 12 }} variant="body1">
                        Flight {API.handleAmateurClass(d.classno)}
                      </Typography>
                      <Typography>
                        handicap {d.classname} - {parseInt(data.class[i + 1].classname) - 1}
                      </Typography>
                    </div>
                  )
                }
              })
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
