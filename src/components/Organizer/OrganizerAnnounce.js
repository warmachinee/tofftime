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

const data = [
  {
    announceid: 1,
    picture: 'https://www.baptisthealthfoundation.org/wp-content/uploads/2017/09/bolo-bash-golf-feature-1.jpg',
    title: 'ELS CHALLENGES POTENTIAL INTERNATIONAL TEAM PICKS: \'SHOW ME SOMETHING\''
  },
  {
    announceid: 2,
    picture: 'https://www.golf.com/wp-content/uploads/2019/08/GettyImages-1164128730-1024x570.jpg',
    title: 'Woods has arthroscopic procedure on knee'
  },
  {
    announceid: 3,
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4pCnf1Ct-j9lavhZfQUj9JfvDWOO-dLCl3M9sPvIMIJjSP8AzQ',
    title: 'Fantastic five commit to inaugural ZOZO CHAMPIONSHIP in Japan'
  },
]

export default function OrganizerAnnounce(props) {
  const classes = useStyles();
  const { sess } = props

  return (
    <div className={classes.root}>
      <AnnouncePrimaryPage {...props} data={data} />
    </div>
  );
}
