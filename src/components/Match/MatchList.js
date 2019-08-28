import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import Skeleton from '@material-ui/lab/Skeleton';

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */ './MatchCard'),
  loading: () => null
});

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
    padding: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-around'
  },

}));

const data = [
  {
    id: 1,
    pic: 'https://media.golfdigest.com/photos/5856b814ba03cefc46ca223f/master/w_768/2017-79-Olympia-Fields-CC-hole-18.jpg',
    title: 'Olympia Tour 01 - 2019',
    location: 'Olympia Fields Country Club (North)',
    views: 300,
    date: '15/09/2019',
  },
  {
    id: 2,
    pic: 'https://cdn.cybergolf.com/images/721/North-Bellingham-GC_book-tee-times-databutton-web.jpg',
    title: 'Bellingham 2019 Tour',
    location: 'North Bellingham Golf Course',
    views: 500,
    date: '23/10/2019',
  },
  {
    id: 3,
    pic: 'https://www.hillsboroughgolf.com/wp-content/uploads/sites/5394/2015/09/golf-2.png',
    title: 'LPGA tour 3 - 2019',
    location: 'Hillsborough Golf and Country Club',
    views: 900,
    date: '31/10/2019',
  },
  {
    id: 4,
    pic: 'https://www.visitrenotahoe.com/wp-content/uploads/2017/07/BarracudaHeader.jpg',
    title: 'Barracuda Championship 2019',
    location: 'Fieldstone Golf Club - Auburn Hills, MI',
    views: 1600,
    date: '07/11/2019',
  },
  {
    id: 5,
    pic: 'https://www.mercedes-benz.co.in/passengercars/the-brand/mercedes-trophy-india/mercedes-trophy-/Homepage/multimedia-systems/_jcr_content/highlightcontainer/par/highlighttile.MQ6.0.20181101084019.jpeg',
    title: 'MercedesTrophy 2019',
    location: 'Birch Creek Golf Course',
    views: 300,
    date: '02/01/2020',
  },
  {
    id: 6,
    pic: 'https://radioimg.s3.amazonaws.com/995themountain/styles/delta__775x515/s3/s3fs-public/General/GolfTour_2017_carousel-Raccoon%20Creek.jpg?itok=m4r3zosx',
    title: 'Mountain Golf Tour at Raccoon Creek Golf Course',
    location: 'Washoe Golf Course',
    views: 300,
    date: '08/03/2020',
  },
];

export default function MatchList(props) {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <LabelText text="Match list" />
      <div className={classes.grid}>
        { data &&
          data.map( d => <MatchCard key={d.id} data={d}/>)
        }
      </div>
    </div>
  );
}
