import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    WebkitFlexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      width: '100%',
    },
    [theme.breakpoints.up(900)]: {
      flexDirection: 'column',
      WebkitFlexDirection: 'column',
      width: '30%',
    },
  },
  itemGrid: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    padding: theme.spacing(1, 0),
    height: window.innerWidth * .3,
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(2, 0),
    },
    [theme.breakpoints.up(900)]: {
      height: '100%',
      padding: theme.spacing(0, 2),
    },
  },
  item: {
    height: '100%',
    width: '100%',
    color: 'black',
    display: 'block',
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    '&:hover': {
      opacity: .7
    },
  },
  label: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    boxSizing: 'border-box',
    color: grey[50],
    backgroundColor: grey[900],
    opacity: .8,
    fontSize: 16,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'monospace',
    textAlign: 'center',
    padding: theme.spacing(2, 1),
    maxHeight: 72,
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.6,
    '&:hover': {
      backgroundColor: grey[700],
    },
    [theme.breakpoints.up(500)]: {
      bottom: 16,
    },
    [theme.breakpoints.up(900)]: {
      bottom: 0,
      width: 'calc(100% - 32px)',
    },
  },
  skeleton: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    backgroundColor: grey[300],
    margin: 0
  },

}));

export default function AnnounceSecondary(props) {
  const classes = useStyles();
  const { API, BTN, data, isSupportWebp } = props

  async function fetchJsonPlaceholder(){
    /*
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    const json = await res.json()
    */

    const d = [
      {
        id: 1,
        title: 'Brooke Henderson of Canada acknowledges the crowd prior to teeing off on the 1st hole during the third round of the CP Women\'s Open at Magna Golf Club on August 24, 2019 in Aurora, Canada',
        pic: 'https://www.lpga.com/-/media/images/lpga/tournaments/canadian-pacific-womens-open/2019/rd3/henderson_b1163633647.jpg?w=980'
      },
      {
        id: 2,
        title: 'ข่าวกอล์ฟ ปีทองของเธอ “โค จิน ยอง” ปิดจ๊อบแชมป์แคนาเดียน “โปรเม” จบที่ 9',
        pic: 'https://www.b4thematch.com/wp-content/uploads/2019/08/562000008410401.jpg'
      },
    ]
    setData(d)
  }

  React.useEffect(()=>{
    //console.log(props);
    //fetchJsonPlaceholder()
  },[ ])

  return (
    <div className={classes.root}>
      { ( data && data.length > 0 ) ?
        <BTN.NoStyleLink to={`/announce/${data[0].announceid}`}>
          <div className={classes.itemGrid}
            style={{
              marginBottom: window.innerWidth >= 900? 24 : 0,
              marginRight: window.innerWidth >= 900? 0 : 24,
            }}>
            { data[0].picture ?
              <img className={classes.item} src={API.getPictureUrl(data[0].picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <Skeleton className={classes.skeleton} />
            }
            { data[0].title &&
              <div className={classes.label}>
                {data[0].title}
              </div>
            }
          </div>
        </BTN.NoStyleLink>
        :
        <div className={classes.itemGrid}
          style={{
            marginBottom: window.innerWidth >= 900? 24 : 0,
            marginRight: window.innerWidth >= 900? 0 : 24,
          }}>
          <Skeleton className={classes.skeleton} />
        </div>
      }
      { ( data && data.length > 1 ) ?
        <BTN.NoStyleLink to={`/announce/${data[1].announceid}`}>
          <div className={classes.itemGrid}>
            { data[1].picture ?
              <img className={classes.item} src={API.getPictureUrl(data[1].picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <Skeleton className={classes.skeleton} />
            }
            { data[1].title &&
              <div className={classes.label}>
                {data[1].title}
              </div>
            }
          </div>
        </BTN.NoStyleLink>
        :
        <div className={classes.itemGrid}
          style={{
            marginBottom: window.innerWidth >= 900? 24 : 0,
            marginRight: window.innerWidth >= 900? 0 : 24,
          }}>
          <Skeleton className={classes.skeleton} />
        </div>
      }
    </div>
  );
}
