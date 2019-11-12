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
  const { sess, data, userscore, matchClass, matchid, reward, sortBy, setSortBy } = props

  const rewardSelected = !reward.status && reward.status !== 'reward not create' && reward.status !== 'need to login admin account' && reward.filter( item =>{
    return (item.classno === matchClass.classno && item)
  })

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        {
          !reward.status &&
          <RewardPDF data={data} matchClass={matchClass} matchid={matchid} reward={rewardSelected} sess={sess} sortBy={sortBy} />
        }
        <PrintPDF data={data} userscore={userscore} matchClass={matchClass} sess={sess} sortBy={sortBy} />
        <div style={{ flex: 1 }} />
        { data && data.scorematch !== 1 &&
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel>{ ( sess && sess.language === 'TH' ) ? "จัดเรียงตาม" : 'Sort by' }</InputLabel>
              <Select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <MenuItem value={'net'}>Net</MenuItem>
                <MenuItem value={'sf'}>SF</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
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
  const { sess, data, userscore, matchClass, matchid, token, setCSRFToken, mainClassSelected, setMainClassSelected } = props
  const [ value, setValue ] = React.useState(0);
  const [ reward, setReward ] = React.useState(null)

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
  },[ ])

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        { data && data.scorematch !== 0 &&
          <FormControl className={classes.formControl}>
            <InputLabel>Main Group</InputLabel>
            <Select
              value={mainClassSelected}
              onChange={e => setMainClassSelected(e.target.value)}>
              { data &&
                data.mainclass.map( d =>
                  <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                    {d.mainclass}
                  </MenuItem>
              )}
            </Select>
          </FormControl>
        }
      </div>
      <Paper elevation={1} style={{ backgroundColor: primary[100], padding: '8px 0' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          { matchClass &&
            matchClass.map( d=>
              d &&
              <StyledTab key={d.classname} label={
                  data.scorematch !== 0 ?
                  d.classname
                  :
                  API._handleAmateurClass(d.classno)
                } />
            )
          }
          { data.scorematch === 0 &&
            <StyledTab label={ ( sess && sess.language === 'TH' ) ? "อื่นๆ" : 'Other' } />
          }
        </StyledTabs>
      </Paper>
      { matchClass && reward &&
        matchClass.map((d,i)=>{
          return d && (
            <React.Fragment key={i}>
              {
                value === i &&
                <TabContainer {...props} key={d.classname} data={data} userscore={userscore} matchClass={d} reward={reward}></TabContainer>
              }
            </React.Fragment>
          );
        })
      }
      { data.scorematch === 0 && matchClass && reward && ( value === matchClass.length ) &&
        <TabContainer {...props} data={data} userscore={userscore} matchClass={{classno: 0, classname: 'No class'}} reward={reward}></TabContainer>
      }
    </div>
  );
}
