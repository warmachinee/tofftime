import React from 'react';
import Loadable from 'react-loadable';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import { primary } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Utils/GoBack'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
    position: 'relative'
  },
  content: {
    margin: 0,
    [theme.breakpoints.up(500)]: {
      margin: '0 5%',
    },
    [theme.breakpoints.up(600)]: {
      margin: '0 72px',
    },
  },
  img: {
    maxWidth: '100%',
    maxHeight: 450,
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  display: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  moreThan600: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  lessThan600: {
    [theme.breakpoints.up(600)]: {
      display: 'none'
    },
  },

}))

export default function AnnounceDetail(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const announceid = parseInt(props.computedMatch.params.detailparam)
    const d = await API._xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcedetail&announceid=${announceid}`
    )
    setCSRFToken(d.token)
    setData(d.response)
    if('title' in d.response){
      document.title = `${d.response.title} - T-off Time`
    }
  }

  React.useEffect(()=>{
    handleFetch()
    window.scrollTo(0, 0)
  },[ ])

  return(
    <Paper className={classes.root}>
      <div className={classes.display} style={{ position: 'absolute', top: 8 }}>
        <GoBack />
      </div>
      { data &&
        <div className={classes.content}>
          <Typography variant="h4" className={classes.moreThan600}>
            {data.title}
          </Typography>
          <Typography variant="h6" className={classes.lessThan600}>
            {data.title}
          </Typography>
          <Typography gutterBottom variant="h6" className={classes.moreThan600}>
            {API._dateToString(data.createdate)}
          </Typography>
          <Typography gutterBottom variant="body2" className={classes.lessThan600}>
            {API._dateToString(data.createdate)}
          </Typography>
          <div className="ql-container ql-snow">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              { data.picture &&
                <img onTouchStart={API._openFullScreen} onClick={API._openFullScreen} className={classes.img} src={API._getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
              }
            </div>
            <DetailComponent detail={data.announcedetail} picture={data.picture} />
          </div>
        </div>
      }
    </Paper>
  );
}

function DetailComponent(props){
  const { detail } = props

  return(
    <div className="ql-editor" style={{ maxHeight: 'none' }}>
      {ReactHtmlParser(detail)}
    </div>
  );
}
