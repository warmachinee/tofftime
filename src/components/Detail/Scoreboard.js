import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import teal from '@material-ui/core/colors/teal';

import ScoreTable from './ScoreTable'
import PrintPDF from '../PrintPDF'
import RewardPDF from '../RewardPDF'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabContainer(props) {
  const classes = useStyles()
  const { data, userscore, matchClass, matchid, reward } = props
  const rewardSelected = !reward.status && reward.status !== 'reward not create' && reward.status !== 'need to login admin account' && reward.filter( item =>{
    return (item.classno === matchClass.classno && item)
  })
  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}></div>
        {/**/}
        <RewardPDF data={data} matchClass={matchClass} matchid={matchid} reward={rewardSelected} />
        <PrintPDF data={data} userscore={userscore} matchClass={matchClass}/>
      </div>
      <ScoreTable data={data} userscore={userscore} matchClass={matchClass}/>
    </React.Fragment>
  )
}

const StyledTabs = withStyles({
  root: {
    //borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: teal[600],
    height: 4
  },
  scrollButtons: {
    color: teal[900],
    width: 50,
  }
})(Tabs);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 500,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: teal[600],
      opacity: 1,
    },
    '&$selected': {
      color: teal[600],
    },
    '&:focus': {
      color: teal[600],
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

export default function Scoreboard(props) {
  const classes = useStyles();
  const { data, userscore, matchClass, matchid, token, setCSRFToken } = props
  const [ value, setValue ] = React.useState(0);
  const [ reward, setReward ] = React.useState(null)

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function handleFetch(){
    await API.xhrPost(
      props.token,
      'loadmatch', {
        action: 'reward',
        matchid: matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setReward(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])
  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ backgroundColor: teal[100], padding: '8px 0' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          { matchClass &&
            matchClass.map( d=>
              d &&
              <StyledTab key={d.classname} label={d.classname} />
            )
          }
        </StyledTabs>
      </Paper>
      { matchClass && reward &&
        matchClass.map((d,i)=>{
          return d && (
            <React.Fragment key={i}>
              {
                value === i &&
                <TabContainer key={d.classname} data={data} userscore={userscore} matchClass={d} reward={reward}></TabContainer>
              }
            </React.Fragment>
          );
        })
      }
    </div>
  );
}
