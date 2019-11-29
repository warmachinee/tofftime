import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { primary } from '../../api/palette'

import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,

} from '@material-ui/core/';

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */ './MatchCard'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../Utils/LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    //backgroundColor: theme.palette.background.paper,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabRoot: {
    flexGrow: 1,
    width: '100%',
  },
  grid: {
    marginTop: 24,
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    boxSizing: 'border-box',
  },

}));

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
    fontSize: 20,
    fontWeight: 500,
    marginRight: theme.spacing(4),
    padding: 16,
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
}))(props => <Tab {...props} />);

const MATCH_LABEL = [
  {
    typescore: 1,
    label: 'Professional'
  },
  {
    typescore: 0,
    label: 'Amateur'
  },
  {
    typescore: 2,
    label: 'Charity'
  }
]

function TabContainer(props) {
  const classes = useStyles();
  const { API, sess, filteredData } = props;
  return (
    <div>
      { filteredData.length > 0 ?
        <div className={classes.grid}>
          { filteredData.map( d => <MatchCard key={d.matchid} data={d} {...props} />) }
          { ( filteredData.length === 1 || filteredData.length === 2 ) &&
            Array.from(new Array( 3 - filteredData.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
          }
        </div>
        :
        <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
          <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
            { API._getWord(sess && sess.language).No_match }
          </Box>
        </Typography>
      }
    </div>
  );
}

export default function MatchList(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken } = props
  const [ data, setData ] = React.useState(null)

  function hashToData(){
    const hash = window.location.hash.substring(1, window.location.hash.length)
    switch (hash) {
      case 'amateur':
        return 1
        break;
      case 'charity':
        return 2
        break;
      default:
        return 0
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem' , {
        action: 'matchlist'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div id="el_match" className={classes.root}>
      <div className={classes.tabRoot}>
        <Paper elevation={3}>
          <StyledTabs
            value={hashToData()}
            variant="scrollable"
            scrollButtons="on"
          >
            { MATCH_LABEL.map( type =>
              <Link to={`${window.location.pathname}#${type.label.toLowerCase()}`}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledTab key={type.typescore} label={type.label} />
              </Link>
            )}
          </StyledTabs>
        </Paper>
        { data && MATCH_LABEL.map((type, index) =>
          hashToData() === index &&
          <TabContainer
            {...props}
            key={type.typescore}
            sess={sess}
            API={API}
            value={hashToData()}
            index={type.typescore}
            setData={setData}
            filteredData={data.filter( item =>{ return item.typescore === type.typescore })} />
        )}
      </div>
    </div>
  );
}
