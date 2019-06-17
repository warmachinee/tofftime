import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles((theme) =>({
  card: {
    maxWidth: 345,
    margin: '32px auto',
  },
  learnMore: {
    color: teal[500],
    fontWeight: '900',
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
  cardMobile: {
    maxWidth: 345,
    margin: '5% auto',
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
    height: 280
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
}));

export default function MatchCard() {
  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false)
  const matchPicture = null

  function expandHandler(){
    setExpanded(!expanded)
  }

  const renderCard = (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          title="Match Title"
          subheader="01/01/2000"
        />
      { matchPicture?
        <CardMedia
          component="img"
          alt="Match Picture"
          height="140"
          src={"https://i.ytimg.com/vi/ZbofJucjkSU/maxresdefault.jpg"}
          title="Match Picture"
        />:
        <div style={{ height: 140, width: '100%', backgroundColor: 'grey' }}></div>
      }
        <CardContent>
          <Typography gutterBottom variant="body1" component="p">
            Location
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Match detail ==> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Typography>
        </CardContent>
      </CardActionArea>
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
          height="140"
          src={"https://i.ytimg.com/vi/ZbofJucjkSU/maxresdefault.jpg"}
          title="Match Picture"
        />:
        <div style={{ height: 140, width: '100%', backgroundColor: 'grey' }}></div>
      }
        <CardContent className={classes.cardMobileContent}>
          <Typography className={classes.cardMobileTitle} gutterBottom variant="h6" component="h6">
            Matchaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
    </Card>
  );

  const [ isMobile, setIsMobile ] = React.useState(
    window.innerWidth >= 600? false:true
  )
  function resizeHandler(){
    let wd = window.innerWidth
    if( wd >= 600 ){
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
