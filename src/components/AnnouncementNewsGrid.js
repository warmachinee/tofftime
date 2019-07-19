import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import { LDSlider } from './loading/LDSlider';

const Slider = Loadable({
  loader: () => import(/* webpackChunkName: "Slider" */'./Announcement/Slider'),
  loading: () => <LDSlider />
});

const News = Loadable({
  loader: () => import(/* webpackChunkName: "News" */'./News/News'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(900)]: {
      flexDirection: 'row',
      marginTop: 16
    },
  },
}));

export default function AnnouncementNewsGrid(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div className={classes.root}>
      <Slider />
      <News token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
    </div>
  );
}
