import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { LDCircular } from './../components/loading/LDCircular'

const OrganizerAnnounce = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerAnnounce" */ './../components/Organizer/OrganizerAnnounce'),
  loading: () => null
});

const OrganizerOverview = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerOverview" */ './../components/Organizer/OrganizerOverview'),
  loading: () => null
});

const OrganizerMatchList = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerMatchList" */ './../components/Organizer/OrganizerMatchList'),
  loading: () => null
});

const OrganizerPost = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerPost" */ './../components/Organizer/OrganizerPost'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },

}));

export default function Organizer(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, BTN } = props
  const [ isFollow, setIsFollow ] = React.useState(false)
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      ( sess && sess.status === 1 ) ? 'ploadpage' : 'mloadpage' , {
        action: 'detail',
        pageid: parseInt(props.computedMatch.params.pageid),
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(d.length > 1){
        setData(d[0])
        document.title = `${d[0].pagename} - T-off Time Organizer`
        if(d[1].subscribe){
          setIsFollow(true)
        }else{
          setIsFollow(false)
        }
      }else{
        setData('No page')
        document.title = `No page`
      }
    })
  }

  React.useEffect(()=>{
    if(props.location){
      props.setLocationPath(props.location.pathname)
    }
    if(props.computedMatch){
      handleFetch()
    }
  },[ props.location ])

  return (
    <div className={classes.root}>
      { props.computedMatch &&
        data ?
        ( data !== 'No page' ?
          <React.Fragment>
            <OrganizerAnnounce {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
            <OrganizerOverview {...props}
              isFollow={isFollow}
              setIsFollow={setIsFollow}
              data={data}
              setData={setData}
              pageid={parseInt(props.computedMatch.params.pageid)} />
            <OrganizerMatchList {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
            <OrganizerPost {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
          </React.Fragment>
          :
          <div>
            <h3 style={{ textAlign: 'center', fontSize: 28 , marginTop: 72 }}>
              { API._getWord(sess && sess.language).No_page }
              <code>{' ' + parseInt(props.computedMatch.params.pageid)}</code>
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to='/'
                style={{
                  textAlign: 'center', fontSize: 24, margin: '24px 0',
                  color: '#1e88e5'
                }}>{ API._getWord(sess && sess.language).Go_to_home }</Link>
            </div>
          </div>
        )
        :
        <LDCircular />
      }
    </div>
  );
}
