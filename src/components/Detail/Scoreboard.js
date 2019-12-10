import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary } from './../../api/palette'

import {
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,

} from '@material-ui/core';

import ScoreTable from './ScoreTable'
import PrintPDF from './../export/PrintPDF'
import RewardPDF from './../export/RewardPDF'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}));

function TabContainer(props) {
  const classes = useStyles()
  const { sess, data, userscore, matchClass, matchid, reward, sortBy, setSortBy, scoringMethod, setScoringMethod } = props

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginTop: 'auto', marginBottom: 4 }}>
          <RewardPDF data={data} matchClass={matchClass} matchid={matchid} reward={reward} sess={sess} sortBy={sortBy} />
          <PrintPDF data={data} userscore={userscore} matchClass={matchClass} sess={sess} sortBy={sortBy} />
        </div>
        <div>
          { data && data.scorematch !== 1 &&
            <React.Fragment>
              { data.scorematch === 2 &&
                <FormControl className={classes.formControl}>
                  <InputLabel>{ API._getWord(sess && sess.language).Method }</InputLabel>
                  <Select
                    value={scoringMethod}
                    onChange={e => setScoringMethod(e.target.value)}
                  >
                    <MenuItem value={'flight'}>{'36System'}</MenuItem>
                    <MenuItem value={'stroke'}>Stroke play</MenuItem>
                  </Select>
                </FormControl>
              }
              { scoringMethod === 'flight' &&
                <FormControl className={classes.formControl}>
                  <InputLabel>{ API._getWord(sess && sess.language).Sort_by }</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <MenuItem value={'net'}>Net</MenuItem>
                    <MenuItem value={'sf'}>SF</MenuItem>
                  </Select>
                </FormControl>
              }
            </React.Fragment>
          }
        </div>
      </div>
      <ScoreTable {...props} data={data} userscore={userscore} matchClass={matchClass} />
    </React.Fragment>
  )
}

const StyledTabs = withStyles({
  root: {
    //borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: primary[600],
    height: 4
  },
  scrollButtons: {
    color: primary[900],
    width: 50,
  }
})(Tabs);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 500,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: primary[600],
      opacity: 1,
    },
    '&$selected': {
      color: primary[600],
    },
    '&:focus': {
      color: primary[600],
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

export default function Scoreboard(props) {
  const classes = useStyles();
  const { COLOR, sess, data, userscore, matchClass, matchid, token, setCSRFToken, mainClassSelected, setMainClassSelected } = props
  const [ value, setValue ] = React.useState(0);
  const [ reward, setReward ] = React.useState(null)
  const tabsStyle = makeStyles(theme => ({
    indicator: {
      backgroundColor: COLOR[ value !== matchClass.length ? (matchClass[value].color ? matchClass[value].color : 'primary') : 'primary' ][600],
      height: 4
    },
    scrollButtons: {
      color: COLOR[ value !== matchClass.length ? (matchClass[value].color ? matchClass[value].color : 'primary') : 'primary' ][900],
      width: 50,
    }

  }))();
  const tabStyle = makeStyles(theme => ({
    root: {
      textTransform: 'none',
      fontWeight: 500,
      marginRight: theme.spacing(4),
      '&:hover': {
        color: COLOR[ value !== matchClass.length ? (matchClass[value].color ? matchClass[value].color : 'primary') : 'primary' ][600],
        opacity: 1,
      },
      '&$selected': {
        color: COLOR[ value !== matchClass.length ? (matchClass[value].color ? matchClass[value].color : 'primary') : 'primary' ][600],
      },
      '&:focus': {
        color: COLOR[ value !== matchClass.length ? (matchClass[value].color ? matchClass[value].color : 'primary') : 'primary' ][600],
      },
    },

  }))();

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function handleFetch(){
    await API._xhrPost(
      props.token,
      'loadmatchsystem', {
        action: 'reward',
        matchid: matchid,
        mainclass: parseInt(mainClassSelected)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(
        d.status !== 'no reward' ||
        d.status !== 'reward not create' ||
        d.status !== 'wrong matchid' ||
        d.status !== 'wrong action' ||
        d.status !== 'wrong params'
      ){
        setReward(d)
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ mainClassSelected ])

  return (
    <div className={classes.root}>
      { data && data.scorematch !== 0 && data.mainclass.length > 1 &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControl className={classes.formControl}>
            <InputLabel>Main Group</InputLabel>
            <Select
              value={mainClassSelected}
              onChange={e => setMainClassSelected(e.target.value)}>
              { data &&
                data.mainclass.map( d =>
                  <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                    {d.mainclassname}
                  </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      }
      <Paper elevation={1}
        style={{ backgroundColor:
          COLOR[ value !== matchClass.length ? (matchClass[value].color ? matchClass[value].color : 'primary') : 'primary' ][100],
          padding: '8px 0'
        }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          classes={{
            indicator: tabsStyle.indicator,
            scrollButtons: tabsStyle.scrollButtons
          }}
        >
          { matchClass &&
            matchClass.map( d=>
              d &&
              <StyledTab
                key={d.classname}
                classes={{ root: tabStyle.root, }}
                label={
                  ( data.scorematch === 0 || data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight' ) ?
                  API._handleAmateurClass(d.classno)
                  :
                  d.classname
                } />
            )
          }
          { ( data.scorematch === 0 || data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight' ) &&
            <StyledTab label={ API._getWord(sess && sess.language).Other } />
          }
        </StyledTabs>
      </Paper>
      { matchClass && reward &&
        matchClass.map((d,i)=>{
          return d && (
            <React.Fragment key={i}>
              {
                value === i &&
                <TabContainer {...props} key={d.classname} value={i} data={data} userscore={userscore} matchClass={d} reward={reward}></TabContainer>
              }
            </React.Fragment>
          );
        })
      }
      { ( data.scorematch === 0 || data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight' ) && matchClass && reward && ( value === matchClass.length ) &&
        <TabContainer {...props}
          data={data}
          value={matchClass.length}
          userscore={userscore} matchClass={{ classno: 0, classname: 'No class', color: '' }} reward={reward}></TabContainer>
      }
    </div>
  );
}
