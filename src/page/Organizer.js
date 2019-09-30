import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

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

  React.useEffect(()=>{
    if(props.location){
      props.setLocationPath(props.location.pathname)
    }
  },[ props.location ])

  return (
    <div className={classes.root}>
      { props.computedMatch &&
        <React.Fragment>
          <OrganizerAnnounce {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
          <OrganizerOverview {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
          <OrganizerMatchList {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
          <OrganizerPost {...props} pageid={parseInt(props.computedMatch.params.pageid)} />
        </React.Fragment>
      }
    </div>
  );
}
