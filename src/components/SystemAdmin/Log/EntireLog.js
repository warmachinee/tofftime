import React from 'react'
import Loadable from 'react-loadable';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { makeStyles, fade, useTheme, withStyles } from '@material-ui/core/styles';

import { LDCircular } from './../../loading/LDCircular'

import { primary, grey, red } from './../../../api/palette'

import {
  Card,
  CardActionArea,
  Badge,
  Typography,
  Paper,

} from '@material-ui/core';

import {
  Error as ErrorIcon,

} from '@material-ui/icons';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const RouteErrorDetection = Loadable.Map({
  loader: {
    ErrorDetection: () => import(/* webpackChunkName: "ErrorDetection" */'./ErrorDetection'),
  },
  render(loaded, props) {
    let Component = loaded.ErrorDetection.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  tabRoot: {
    flexGrow: 1,
    width: '100%',
  },
  card: {
    width: 120,
    height: 120,
    margin: '24px auto'
  },
  cardActionArea: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: primary[800]
  },
  cardGrid: {
    padding: '24px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    boxSizing: 'border-box',
  },
  menuCardIconGrid: {
    height: 56,
    marginTop: 16
  },
  anchorOriginTopRightRectangle: {
    top: 16,
    right: -8,
    color: red[600]
  },

}))

function MenuCard(props){
  const classes = useStyles();
  const { label, icon, path } = props

  return (
    <Card className={classes.card} elevation={3}>
      <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea
          className={classes.cardActionArea}>
          <div className={classes.menuCardIconGrid}>{icon}</div>
          <Typography style={{ textAlign: 'center', textTransform: 'capitalize', marginBottom: 16 }}>
            {label}
          </Typography>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default function EntireLog(props){
  const classes = useStyles();
  const passingProps = {
    API: props.API,
    COLOR: props.COLOR,
    BTN: props.BTN,
    sess: props.sess,
    handleSess: props.handleSess,
    accountData: props.accountData,
    handleAccountData: props.handleAccountData,
    token: props.token,
    setCSRFToken: props.setCSRFToken,
    isSupportWebp: props.isSupportWebp,
    handleSnackBar: props.handleSnackBar,
    location: props.location,
    pageid: props.pageid,
    pageOrganizer: props.pageOrganizer,
    pageData: props.pageData,
  }

  function EntireLogComponent(){
    return (
      <div>
        <LabelText text="Entire Log" />
        <div className={classes.cardGrid}>
          <MenuCard
            path="/system_admin/log/error"
            icon={<ErrorIcon style={{ fontSize: 52 }} />}
            label={"Error & Bugs"} />
          <div style={{ width: 120, margin: '24px auto' }} />
          <div style={{ width: 120, margin: '24px auto' }} />
          <div style={{ width: 120, margin: '24px auto' }} />
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path="/system_admin/log" component={EntireLogComponent} />
      <RouteErrorDetection path="/system_admin/log/error"
        {...passingProps} />
    </Switch>
  );
}
