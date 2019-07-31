import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  back: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: teal[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },

}))

export default function GoBack(props){
  const classes = useStyles();
  const { goBackDetail = false } = props

  function handleBack(){
    const root = window.location.pathname
    const rootSplit = window.location.pathname.split('/')
    let rootSearchLength
    let diff
    if( rootSplit[rootSplit.length - 1] === '' ){
      diff = goBackDetail? 3 : 2
      rootSearchLength = root.search(rootSplit[rootSplit.length - diff])
    }else{
      diff = goBackDetail? 2 : 1
      rootSearchLength = root.search(rootSplit[rootSplit.length - diff])
    }
    //console.log(root, " : ",rootSplit, " : ", root.substring(0, rootSearchLength));
    return root.substring(0, rootSearchLength)
  }

  return(
    <div style={{ width: '100%' }}>
      <Link to={handleBack()} className={classes.linkElement}>
        <IconButton className={classes.back}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </Link>
    </div>
  );
}
