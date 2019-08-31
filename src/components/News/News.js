import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Grid, Box, Typography,
} from '@material-ui/core';


const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const NewsCard = Loadable({
  loader: () => import(/* webpackChunkName: "NewsCard" */ './NewsCard'),
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
    boxSizing: 'border-box',
    gridTemplateColumns: 'auto',
    [theme.breakpoints.up(1000)]: {
      gridTemplateColumns: 'auto auto',
    },
  },

}));

export default function News(props) {
  const classes = useStyles();
  const {
    COLOR, API, BTN, isSupportWebp, token, setCSRFToken
  } = props
  const [ data, setData ] = React.useState(null)

  async function fetchJsonPlaceholder(){
    /*
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    const json = await res.json()
    */

    const d = [
      {
        id: 1,
        title: 'Rory McIlroy wins TOUR Championship and FedExCup',
        subtitle: 'Rory McIlroy fires a 4-under 66 on a marathon Sunday to cruise to a four-shot victory at the TOUR Championship, locking down his second FedExCup title.',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,dpr_1.5,f_auto,g_center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/08/26/mcilroymondayfinish-847-kevinccox.jpg'
      },
      {
        id: 2,
        title: 'How Finau helped save volunteer\'s life',
        subtitle: 'Brothers in The First Tee walk hole with Tony Finau at TOUR Championship Tony Finau heard Bill Patterson before he ever saw him.',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,dpr_1.5,f_auto,g_center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/08/26/Finau-Driver-847-Getty.jpg'
      },
      {
        id: 3,
        title: '2018-19 Korn Ferry Tour graduate reshuffle',
        subtitle: 'The following winners have been removed: Cameron Champ (Sanderson Farms Championship); Adam Long (Desert Classic); Martin Trainer (Puerto Rico Open); Max Homa (Wells Fargo Championship); Dylan Frittelli (John Deere Classic).',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,dpr_1.5,f_auto,g_face:center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/06/24/genericball-847-getty.jpg'
      },
      {
        id: 4,
        title: 'Updated statement on severe weather that suspended Round 3 at East Lake',
        subtitle: 'The Atlanta Police Department and Atlanta Fire and Rescue have confirmed that five individuals were injured and transported to nearby hospitals; a sixth person was treated and released at the scene.  All were released from the hospital last night.',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,dpr_1.5,f_auto,g_center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/08/25/Weather-EastLake-847-PGATOUR.jpg'
      },
      {
        id: 5,
        title: 'TOUR Championship, Round 4: Leaderboard, tee times, TV times',
        subtitle: 'New format for 2019 FedExCup Playoffs The FedExCup Playoffs conclude this week with the TOUR Championship at East Lake, where the FedExCup trophy and a first-place check worth $15 million is on the line. Here\'s how to follow all the action.',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,dpr_1.5,f_auto,g_center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/08/24/htwrd4-847-pgatour.jpg'
      },
    ]
    setData(d)
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=newslist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    //console.log(props);
    //fetchJsonPlaceholder()
    handleFetch()
  },[ ])

  return(
    <div id="el_news" className={classes.root}>
      <LabelText text="News"/>
      <div className={classes.grid}>
        { data?
          data.map( d => <NewsCard key={d.newsid} {...props} data={d}/> )
          :
          Array.from(new Array(3)).map((d, i) => <NewsCard key={i} loading/>)
        }
      </div>

    </div>
  );
}
