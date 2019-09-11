import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import AccountIcon from '@material-ui/icons/AccountCircle';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
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
    marginTop: 24,
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    boxSizing: 'border-box',
  },
  marginAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  iconButton: {
    marginBottom: 16,
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
  },
  avatar: {
    height: 72,
    width: 72,
  },
  avatarIcon: {
    fontSize: 72
  }

}));
/*
const data = [
  {
    id: 1,
    pic: 'https://assetsv2.fiverrcdn.com/assets/v2_globals/fiverr-logo-new-green-64920d4e75a1e04f4fc7988365357c16.png'
  },
  {
    id: 2,
    pic: 'https://i.pinimg.com/originals/a8/c1/54/a8c15493781667d05e628e2f76d65b3a.jpg'
  },
  {
    id: 3,
    pic: 'https://seeklogo.com/images/C/Chang-logo-8DADB374B6-seeklogo.com.png'
  },
  {
    id: 4,
    pic: 'https://singhaelitegolf.com/wp-content/uploads/2014/03/SINGHA-Logo.jpg'
  },
  {
    id: 5,
    pic: 'https://image.shutterstock.com/image-vector/vector-label-golf-logo-championship-260nw-360432086.jpg'
  },
  {
    id: 6,
    pic: 'https://www.thaiseniorpga.com/images/Logo.png'
  },
  {
    id: 7,
    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSodhBwzuR_aV8NYLDj21Ypm0wSOUp4mndTrR7SRc_kIGBHwhG1g'
  },
  {
    id: 8,
    pic: 'https://seeklogo.com/images/P/pga-updated-logo-EE5AAFB4EF-seeklogo.com.png'
  },
  {
    id: 9,
    pic: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Ladies_Professional_Golf_Association.svg/1200px-Ladies_Professional_Golf_Association.svg.png'
  },
  {
    id: 10,
    pic: 'https://upload.wikimedia.org/wikipedia/en/4/45/Lahinch_Golf_Club_crest.png'
  },
]
*/
const data = [
  {
    pageid: 651376,
    logo: "/pages/651376/651376"
  },
  {
    pageid: 658041,
    logo: "/pages/658041/658041"
  }
]

export default function OrganizerList(props) {
  const classes = useStyles();
  const { API, token, setCSRFToken, BTN, isSupportWebp } = props

  return (
    <div id="el_organizer" className={classes.root}>
      <LabelText text="Organizer" />
      <div className={classes.grid}>
        { data.map(
          d =>
          <BTN.NoStyleLink to={`/page/${d.pageid}`} key={d.pageid} className={classes.marginAuto}>
            { d.logo ?
              <IconButton className={classes.iconButton}>
                <Avatar className={classes.avatar} src={API.getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' )}/>
              </IconButton>
              :
              <IconButton className={classes.iconButton}>
                <Avatar className={classes.avatar}>
                  <AccountIcon classes={{ root: classes.avatarIcon }}/>
                </Avatar>
              </IconButton>
            }
          </BTN.NoStyleLink>
        )}
      </div>
    </div>
  );
}
