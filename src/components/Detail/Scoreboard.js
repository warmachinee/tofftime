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
  Collapse,
  IconButton,

} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import ScoreTable from './ScoreTable'

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
    minWidth: 80,
  },

}));

function TabContainer(props) {
  const classes = useStyles()
  const { sess, data, userscore, matchClass, matchid, sortBy, setSortBy, scoringMethod, setScoringMethod } = props

  return (
    <React.Fragment>
      <Paper style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, borderRadius: 'unset' }}>
        <div>
          { data && data.scorematch !== 1 &&
            <React.Fragment>
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
            </React.Fragment>
          }
        </div>
      </Paper>
      {/*<ScoreTable {...props} data={data} userscore={userscore} matchClass={matchClass} />*/}
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
  const {
    BTN, COLOR, sess, token, setCSRFToken, data, userscore, matchClass, matchid,
    mainClassSelected, setMainClassSelected, sortBy, value, setValue
  } = props
  const [ expanded, setExpanded ] = React.useState(false)

  const tabsStyle = makeStyles(theme => ({
    indicator: {
      backgroundColor: COLOR[ value !== matchClass.length ? (( matchClass[value] && matchClass[value].color ) ? matchClass[value].color : 'primary') : 'primary' ][600],
      height: 4
    },
    scrollButtons: {
      color: COLOR[ value !== matchClass.length ? (( matchClass[value] && matchClass[value].color ) ? matchClass[value].color : 'primary') : 'primary' ][900],
      width: 50,
    }

  }))();
  const tabStyle = makeStyles(theme => ({
    root: {
      textTransform: 'none',
      fontWeight: 500,
      marginRight: theme.spacing(4),
      '&:hover': {
        color: COLOR[ value !== matchClass.length ? (( matchClass[value] && matchClass[value].color ) ? matchClass[value].color : 'primary') : 'primary' ][600],
        opacity: 1,
      },
      '&$selected': {
        color: COLOR[ value !== matchClass.length ? (( matchClass[value] && matchClass[value].color ) ? matchClass[value].color : 'primary') : 'primary' ][600],
      },
      '&:focus': {
        color: COLOR[ value !== matchClass.length ? (( matchClass[value] && matchClass[value].color ) ? matchClass[value].color : 'primary') : 'primary' ][600],
      },
    },

  }))();

  function toggleExpand(){
    setExpanded(!expanded)
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleSelectMainClass(e){
    setValue(0)
    setMainClassSelected(e.target.value)
  }

  return (
    <div className={classes.root}>
      { data && data.scorematch !== 0 && data.mainclass.length > 1 &&
        <div style={{ display: 'flex' }}>
          <FormControl className={classes.formControl}>
            <InputLabel>Main Group</InputLabel>
            <Select
              value={mainClassSelected}
              onChange={e => handleSelectMainClass(e)}>
              { data &&
                data.mainclass.map( (d, i) =>
                  <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                    {d.mainclassname} ({d.type})
                  </MenuItem>
              )}
            </Select>
          </FormControl>
          <div style={{ flex: 1 }} />
          <IconButton style={{ marginTop: 'auto' }} onClick={toggleExpand}>
            <FontAwesomeIcon icon={faCog} style={{ color: primary[600] }} />
          </IconButton>
        </div>
      }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        { matchClass &&
          matchClass.map((d,i)=>{
            return d && (
              <React.Fragment key={i}>
                {
                  value === i &&
                  <TabContainer {...props} key={d.classname} value={i} data={data} userscore={userscore} matchClass={d}></TabContainer>
                }
              </React.Fragment>
            );
          })
        }
        { ( data.scorematch === 0 || data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight' ) && matchClass && ( value === matchClass.length ) &&
          <TabContainer {...props}
            data={data}
            value={matchClass.length}
            userscore={userscore} matchClass={{ classno: 0, classname: 'No class', color: '' }}></TabContainer>
        }
      </Collapse>
      <Paper elevation={1}
        style={{ backgroundColor:
          COLOR[ value !== matchClass.length ? (( matchClass[value] && matchClass[value].color ) ? matchClass[value].color : 'primary') : 'primary' ][100],
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
      { matchClass &&
        matchClass.map((d,i)=>{
          return d && (
            <React.Fragment key={i}>
              {
                value === i &&
                <ScoreTable {...props} key={d.classname} data={data} userscore={userscore} matchClass={d} />
              }
            </React.Fragment>
          );
        })
      }
      { ( data.scorematch === 0 || data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight' ) && matchClass && ( value === matchClass.length ) &&
        <ScoreTable {...props}
          data={data}
          value={matchClass.length}
          userscore={userscore} matchClass={{ classno: 0, classname: 'No class', color: '' }} />
      }
    </div>
  );
}
