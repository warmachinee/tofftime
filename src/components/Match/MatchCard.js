import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

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
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

export default function MatchCard(props) {
  const { scale = 1, data, isSupportWebp, page, pageid } = props
  const useStyles = makeStyles((theme) =>({
    card: {
      maxWidth: 345 * scale,
      margin: `${32 * scale}px auto`,
      borderRadius: 0
    },
    learnMore: {
      color: primary[500],
      fontWeight: 900,
      '&:hover': {
        backgroundColor: primary[100],
      },
    },
    cardMedia: {
      width: '100%',
      height: 180 * scale,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      objectFit: 'cover',
    },
    cardMobile: {
      maxWidth: 345 * scale,
      margin: '5% auto',
      borderRadius: 0
    },
    cardMobileDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardMobileContent: {
      width: '100%',
      padding: `${8 * scale} ${16 * scale}`
    },
    cardMobileTitle: {
      width: '100%',
      maxWidth: 345 * scale,
    },
    cardMobileMedia: {
      width: '100%',
      height: 180 * scale,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      objectFit: 'cover',
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
      fontSize: 24 * scale,
      color: primary[600],
      '&:hover': {
        color: primary[800],
      },
    }
  }));
  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false)
  const hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
  const [ matchPicture, setMatchPicture ] = React.useState(
    data?
    ( page ?
      ( data.matchphoto ? hd + API.webURL().substring(0, API.webURL().length - 1) + data.matchphoto : null )
      :
      ( data.picture ? hd + API.webURL().substring(0, API.webURL().length - 1) + data.picture : null )
    )
    : null
  )
  function expandHandler(){
    setExpanded(!expanded)
  }

  function RenderCard(){
    return(
      <Card className={classes.card}>
        <div
          style={{
            padding: 8 * scale,
            paddingBottom: 0,
            paddingLeft: 16 * scale,
            height: 180 * scale
          }}>
          <Typography component="div">
            <Box fontWeight={600} fontSize="h6.fontSize" m={1}>
              {page ? data.matchname : data.title}
            </Box>
            <Box style={{ fontStyle: 'oblique' }} fontFamily="Monospace" m={1}>
              {page ? API.handleDateToString(data.matchcreatedate): data.date}
            </Box>
            <div style={{ display: 'flex' }}>
              <RemoveRedEyeIcon style={{ marginRight: 4 * scale }}/>
              <Box style={{ fontStyle: 'oblique', paddingTop: 2 * scale }} fontFamily="Monospace">
                {page ? data.view : data.views}
              </Box>
            </div>
          </Typography>
        </div>
        { matchPicture ?
          (isSupportWebp?
            /*<img className={classes.cardMedia} src={matchPicture + '.webp'} onError={console.log('error')}/>*/
            <CardMedia
              className={classes.cardMedia}
              component="img"
              alt={page ? data.matchname : data.title}
              src={matchPicture + '.webp'}
              title={page ? data.matchname : data.title}
              onError={()=>setMatchPicture(null)}
            />
            :/*
            <img className={classes.cardMedia} src={matchPicture + '.jpg'} onError={console.log('error')}/>
            */
            <CardMedia
              className={classes.cardMedia}
              component="img"
              alt={page ? data.matchname : data.title}
              src={matchPicture + '.jpg'}
              title={page ? data.matchname : data.title}
              onError={()=>setMatchPicture(null)}
            />
          )
          :
          <div
            style={{
              height: 180 * scale, width: '100%',
              backgroundColor: grey[300],
              display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
            }}>
            <div style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'Monospace', fontSize: 16 * scale }}>No Image</div>
          </div>
        }
        <CardContent>
          <Typography gutterBottom component="div" style={{ display: 'flex' }}>
            <LocationOnIcon className={classes.locationIcon}/>
            <Box
              style={{
                flex: 1,
                marginLeft: 8 * scale,
                marginTop: 4 * scale,
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              }}>
              {page ? data.fieldname : data.location}
            </Box>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {page ? data.message : data.detail}
          </Typography>
        </CardContent>
        <CardActions style={{ float: 'right'}}>
          <Link to={`/match/${data.matchid}`}
            style={{ textDecoration: 'none'}}>
            <Button size="small"
              classes={{
                root: classes.learnMore,
              }}
              >
              Learn More
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }

  function RenderMobileCard(){
    return(
      <Card className={classes.cardMobile}>
        { matchPicture ?
          (isSupportWebp?
            <CardMedia
              className={classes.cardMedia}
              component="img"
              alt={page ? data.matchname : data.title}
              src={matchPicture + '.webp'}
              title={page ? data.matchname : data.title}
              onError={()=>setMatchPicture(null)}
            />
            :
            <CardMedia
              className={classes.cardMedia}
              component="img"
              alt={page ? data.matchname : data.title}
              src={matchPicture + '.jpg'}
              title={page ? data.matchname : data.title}
              onError={()=>setMatchPicture(null)}
            />
          )
          :
          <div
            style={{
              height: 180 * scale, width: '100%',
              backgroundColor: grey[300],
              display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
            }}>
            <div style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'Monospace', fontSize: 16 * scale }}>Image error</div>
          </div>
        }
          <CardContent className={classes.cardMobileContent}>
            <Typography
              className={classes.cardMobileTitle} component="div">
              <Box fontWeight={600} fontSize="h6.fontSize" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                {page ? data.matchname : data.title}
              </Box>
            </Typography>
          </CardContent>
        <CardActions>
          <Link to={`/match/${data.matchid}`}
            style={{ textDecoration: 'none'}}>
            <Button size="small"
              classes={{
                root: classes.learnMore,
              }}
              >
              Learn More
            </Button>
          </Link>
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
            <Typography component="div" style={{ display: 'flex' }}>
              <Box style={{ fontStyle: 'oblique', paddingBottom: 8 * scale }} fontFamily="Monospace">
                {page ? API.handleDateToString(data.matchcreatedate) : data.date}
              </Box>
              <div style={{ flex:1 }}></div>
              <div style={{ display: 'flex' }}>
                <RemoveRedEyeIcon style={{ marginRight: 4 * scale }}/>
                <Box style={{ fontStyle: 'oblique', paddingTop: 2 * scale }} fontFamily="Monospace">
                  {page ? data.view : data.views}
                </Box>
              </div>
            </Typography>
            <Typography gutterBottom component="div" style={{ display: 'flex' }}>
              <LocationOnIcon className={classes.locationIcon}/>
              <Box style={{ flex: 1, marginLeft: 8 * scale, marginTop: 4 * scale, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                {page ? data.fieldname : data.location}
              </Box>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {page ? data.message : data.detail}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

  function resizeHandler(){
    let wd = window.innerWidth * scale
    if( wd >= 500 * scale ){
      setIsMobile(false)
    }
    else {
      setIsMobile(true)
    }
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return(
    <React.Fragment>
      { window.innerWidth * scale >= 500 * scale?
        <RenderCard />
        :
        <RenderMobileCard />
      }
    </React.Fragment>
  );
}
