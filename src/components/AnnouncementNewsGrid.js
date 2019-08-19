import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LDSlider } from './loading/LDSlider';
import { LDNews } from './loading/LDNews';

const Slider = Loadable({
  loader: () => import(/* webpackChunkName: "Slider" */'./Announcement/Slider'),
  loading: () => <LDSlider />
});

const News = Loadable({
  loader: () => import(/* webpackChunkName: "News" */'./News/News'),
  loading: () => <LDNews />
});

export default function AnnouncementNewsGrid(props) {
  const { token, setCSRFToken, handleSnackBar, isSupportWebp, scale = 1 } = props
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up(900 * scale)]: {
        flexDirection: 'row',
        marginTop: 16,
        maxHeight: 450
      },
    },

  }));
  const classes = useStyles();
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
      <Slider {...props}/>
      <News {...props}/>
    </div>
  );
}
