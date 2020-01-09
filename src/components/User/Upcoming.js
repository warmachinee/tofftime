import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Button, Typography, Box, Paper, IconButton,
} from '@material-ui/core'

import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Skeleton from '@material-ui/lab/Skeleton';

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */ './MatchCard'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../Utils/LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  grid: {
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    boxSizing: 'border-box',
    [theme.breakpoints.down(400)]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
  },

}));

export default function Upcoming(props) {
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken, userid, userData, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)
  const [ cardLimit, setCardLimit ] = React.useState(
    function(){
      switch (true) {
        case ( window.innerWidth < (props.open ? 1164 : 997) ):
          return 2
          break;
        case ( window.innerWidth >= (props.open ? 1164 : 997) ):
          return 3
          break;
        default:
          return 10
      }
    }()
  )

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const urlAPI = pageOrganizer ? 'mloadpage' : 'loadusersystem'
    const sendObj = {}
    if(pageOrganizer && pageData){
      Object.assign(sendObj, {
        action: 'match',
        subaction: 'upcoming',
        pageid: pageData.pageid
      });
    }else{
      Object.assign(sendObj, { action: 'upcoming' });
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API._xhrPost(
      token? token : resToken.token,
      urlAPI , {
        ...sendObj
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(!/wrong/.test(d.status)){
        setData(d)/*
        if(pageOrganizer){
          setData(d.filter( item =>{
            return item.pageid === pageData.pageid
          }))
        }else{
          setData(d)
        }*/
      }
    })
  }

  React.useEffect(()=>{
    if (!(userData && userData.privacy === 'private')){
      handleFetch()
    }
  },[ userid ])

  return(
    <div id={`upcoming${userid}`} className={classes.root}>
      <div style={{ display: 'flex' }}>
        <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/upcoming`}>
          <LabelText paddingTop={0} text={ API._getWord(sess && sess.language).Upcoming } />
        </BTN.NoStyleLink>
        { !/upcoming$/.test(window.location.href) &&
          <React.Fragment>
            <div style={{ flex: 1 }} />
            <IconButton style={{ marginTop: 'auto' }} onClick={()=>API._scrolllToId(`history${userid}`)}>
              <ArrowDownward />
            </IconButton>
          </React.Fragment>
        }
      </div>
      <div className={classes.grid}>
        { data ?
          ( data.length > 0 ?
            API.sortReverseArrByDate(data, 'matchdate').slice(0, cardLimit).map( d => <MatchCard key={d.matchid} data={d} setData={setData} {...props} />)
            :
            <Typography component="div" style={{ width: '100%', padding: 12, boxSizing: 'border-box' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_match }
              </Box>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={16} m={1}>
                { API._getWord(sess && sess.language)['Please join or create match'] }
              </Box>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_match`}>
                  <BTN.PrimaryOutlined>
                    { API._getWord(sess && sess.language).Create_Match }
                  </BTN.PrimaryOutlined>
                </BTN.NoStyleLink>
              </div>
            </Typography>
          )
          :
          Array.from(new Array(2)).map((d, i) => <MatchCard key={i} {...props} />)
        }
        { data && ( data.length === 1 || data.length === 2 ) &&
          Array.from(new Array( 3 - data.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
        }
      </div>
      { data && ( data.length > (
          function(){
            switch (true) {
              case ( window.innerWidth < (props.open ? 1164 : 997) ):
                return 2
                break;
              case ( window.innerWidth >= (props.open ? 1164 : 997) ):
                return 3
                break;
              default:
                return 10
            }
          }()
        )) &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BTN.PrimaryOutlined onClick={()=>setCardLimit(
              cardLimit === data.length ?
              function(){
                switch (true) {
                  case ( window.innerWidth < (props.open ? 1164 : 997) ):
                    return 2
                    break;
                  case ( window.innerWidth >= (props.open ? 1164 : 997) ):
                    return 3
                    break;
                  default:
                    return 10
                }
              }()
              : data.length
            )}>
            { API._getWord(sess && sess.language)[cardLimit === data.length ? 'Collapse' : 'More'] }
          </BTN.PrimaryOutlined>
        </div>
      }
    </div>
  );
}
