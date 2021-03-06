import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

const AnnouncePrimaryPage = Loadable({
  loader: () => import(/* webpackChunkName: "AnnouncePrimaryPage" */ './../Announce/AnnouncePrimaryPage'),
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

export default function OrganizerAnnounce(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, pageid, pageOrganizer, pageData, } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mloadpage' , {
        action: 'postlist',
        pageid: pageOrganizer ? pageData.pageid : pageid,
        type: 'announce'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ props.dialog, window.location.pathname ])

  return (
    <div className={classes.root}>
      { data && data.length > 0 &&
        <AnnouncePrimaryPage {...props} data={data} />
      }
    </div>
  );
}
