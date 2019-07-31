import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  img: {
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}))

export default function NewsDetail(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  const hd = ( window.location.href.substring(0, 25) === 'https://www.' + API.webURL() )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()

  async function handleFetch(){
    const newsid = parseInt(props.computedMatch.params.detailparam)
    const res = await token? token : API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${res}&action=newsdetail&newsid=${newsid}`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <Paper className={classes.root}>
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
      { data &&
        data.map( d =>
          <React.Fragment key={d.title}>
            <Typography variant="h2">
              {d.title}
            </Typography>
            <Typography variant="h5">
              {d.subtitle}
            </Typography>
            <img className={classes.img} src={isSupportWebp? currentWebURL + d.picture + '.webp' : currentWebURL + d.picture + '.jpg'} />
            { ReactHtmlParser(d.newsdetail) }
          </React.Fragment>
      )}
    </Paper>
  );
}
