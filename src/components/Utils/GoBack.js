import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import { primary } from './../../api/palette'

import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  back: {
    zIndex: 2,
    '&:hover': {
      backgroundColor: fade(primary[600], 0.25),
    },
  },
  backIcon: {
    color: primary[800],
    fontSize: '2.5rem'
  },

}))

export default function GoBack(props){
  const classes = useStyles();
  return (
    <React.Fragment>
      { props.to ?
        <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton className={classes.back}>
            <ArrowBackIcon classes={{ root: classes.backIcon }} />
          </IconButton>
        </Link>
        :
        ( window.history.length > 1 ?
          <IconButton className={classes.back} onClick={()=>window.history.back()}>
            <ArrowBackIcon classes={{ root: classes.backIcon }} />
          </IconButton>
          :
          <div style={{ height: 36 }} />
        )
      }
    </React.Fragment>
  );
}
