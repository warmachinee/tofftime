import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles((theme) =>({
  card: {
    maxWidth: 345,
    margin: '32px auto',
    borderRadius: 0
  },
  learnMore: {
    color: teal[500],
    fontWeight: '900',
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
  cardMedia: {
    maxHeight: 200
  },
  cardMobile: {
    maxWidth: 345,
    margin: '5% auto',
    borderRadius: 0
  },
  cardMobileDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMobileContent: {
    width: '100%',
    padding: '8px 16px'
  },
  cardMobileTitle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '70vw',
    maxWidth: 345,
  },
  cardMobileMedia: {
    maxHeight: 180
  },
  cardMobileAction: {
    display: 'flex',
    flexDirection: 'column',
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  locationIcon: {
    fontSize: 24,
    color: teal[600],
    '&:hover': {
      color: teal[800],
    },
  }
}));

export default function MatchCard(props) {
  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false)
  const matchPicture = 'null'

  function expandHandler(){
    setExpanded(!expanded)
  }
  const renderCard = (
    <Card className={classes.card}>
      <div style={{ padding: 8, paddingBottom: 0, paddingLeft: 16 }}>
        <Typography component="div">
          <Box fontWeight={600} fontSize="h6.fontSize" m={1}>
            Match {props.index}
          </Box>
          <Box style={{ fontStyle: 'oblique' }} fontFamily="Monospace" m={1}>
            01/01/2000
          </Box>
        </Typography>
      </div>
      { matchPicture?
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt="Match Picture"
          src={"https://i.ytimg.com/vi/ZbofJucjkSU/maxresdefault.jpg"}
          title="Match Picture"
        />:
        <div style={{ height: 140, width: '100%', backgroundColor: 'grey' }}></div>
      }
      <CardContent>
        <Typography gutterBottom component="div" style={{ display: 'flex' }}>
          <LocationOnIcon className={classes.locationIcon}/>
          <Box style={{ flex: 1, marginLeft: 8, marginTop: 4 }}>
            Location
          </Box>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Match detail ==> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Typography>
      </CardContent>
      <CardActions style={{ float: 'right'}}>
        <Button size="small"
          classes={{
            root: classes.learnMore,
          }}
          >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
  const renderMobileCard = (
    <Card className={classes.cardMobile}>
      { matchPicture?
        <CardMedia
          className={classes.cardMobileMedia}
          component="img"
          alt="Match Picture"
          src={"https://i.ytimg.com/vi/ZbofJucjkSU/maxresdefault.jpg"}
          title="Match Picture"
        />:
        <div style={{ height: 140, width: '100%', backgroundColor: 'grey' }}></div>
      }
        <CardContent className={classes.cardMobileContent}>
          <Typography
            className={classes.cardMobileTitle} component="div">
            <Box fontWeight={600} fontSize="h6.fontSize">
              Match {props.index}
            </Box>
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small"
          classes={{
            root: classes.learnMore,
          }}
          >
          Learn More
        </Button>
        <IconButton
          className={classes.expandIcon}
          style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
          onClick={expandHandler}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ paddingTop: 0 }}>
          <Typography component="div">
            <Box style={{ fontStyle: 'oblique', paddingBottom: 8 }} fontFamily="Monospace">
              01/01/2000
            </Box>
          </Typography>
          <Typography gutterBottom component="div" style={{ display: 'flex' }}>
            <LocationOnIcon className={classes.locationIcon}/>
            <Box style={{ flex: 1, marginLeft: 8, marginTop: 4 }}>
              Location
            </Box>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Match detail ==> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );

  const [ isMobile, setIsMobile ] = React.useState(
    window.innerWidth >= 500? false:true
  )
  function resizeHandler(){
    let wd = window.innerWidth
    if( wd >= 500 ){
      setIsMobile(false)
    }
    else {
      setIsMobile(true)
    }
  }

  React.useEffect(()=>{
    window.addEventListener('resize',resizeHandler)
    return ()=>{
      window.removeEventListener('resize',resizeHandler)
    }
  },[ window.innerWidth ])

  if(isMobile){
    return (
      <React.Fragment>
        {renderMobileCard}
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        {renderCard}
      </React.Fragment>
    );
  }
}
