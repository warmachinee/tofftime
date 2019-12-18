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
    margin: '0 5%',
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

export default function OrganizerPostDetail(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const pageid = parseInt(props.computedMatch.params.pageid)
    const postid = parseInt(props.computedMatch.params.postid)
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mloadpage', {
        action: 'postdetail',
        pageid: pageid,
        postid: postid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      if('message' in d){
        document.title = `${d.message} - T-off Time`
      }
    })
  }

  React.useEffect(()=>{
    if(props.computedMatch){
      handleFetch()
    }
    window.scrollTo(0, 0)
  },[ ])

  return(
    <Paper className={classes.root}>
      <div className={classes.display} style={{ position: 'absolute', top: 8 }}>
        <GoBack />
      </div>
      { data &&
        <div className={classes.content}>
          <Typography gutterBottom variant="h4" className={classes.moreThan600}>
            { data.message &&
              ( data.type === 'announce'?
                data.message
                :
                data.message.split('<$$split$$>')[0]
              )
            }
          </Typography>
          <Typography gutterBottom variant="h6" className={classes.lessThan600}>
            { data.message &&
              ( data.type === 'announce'?
                data.message
                :
                data.message.split('<$$split$$>')[0]
              )
            }
          </Typography>
          <Typography gutterBottom variant="h6" className={classes.moreThan600}>
            {API._dateToString(data.createdate)}
          </Typography>
          <Typography gutterBottom variant="body2" className={classes.lessThan600}>
            {API._dateToString(data.createdate)}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            { data.photopath &&
              <img className={classes.img} src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
            }
          </div>
          <DetailComponent
            detail={
              data.type === 'announce' ?
              ( data.messagedetail && data.messagedetail )
              :
              ( data.message && data.message.split('<$$split$$>')[1] )
            } />
        </div>
      }
    </Paper>
  );
}

function DetailComponent(props){
  const { detail } = props

  return(
    <div className="ql-container ql-snow">
      <div className="ql-editor">
        {ReactHtmlParser(detail)}
      </div>
    </div>
  );
}
