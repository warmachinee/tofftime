import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { primary } from '../../api/palette'

import {
  Paper,
  Tabs,
  Tab,

} from '@material-ui/core/';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */ './MatchCard'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
  const { filteredData } = props;
  return (
    <div>
      { filteredData.length > 0 &&
        <div className={classes.grid}>
          { filteredData.map( d => <MatchCard key={d.matchid} data={d} {...props} />) }
          { ( filteredData.length === 1 || filteredData.length === 2 ) &&
            Array.from(new Array( 3 - filteredData.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
          }
        </div>
      }
    </div>
  );
}

export default function MatchList(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken } = props
  const [ data, setData ] = React.useState(null)
  const [ value, setValue ] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            { MATCH_LABEL.map( type =>
              <StyledTab key={type.typescore} label={type.label} />
            )}
          </StyledTabs>
        </Paper>
        { data && MATCH_LABEL.map((type, index) =>
          value === index &&
          <TabContainer
            {...props}
            key={type.typescore}
            value={value}
            index={type.typescore}
            setData={setData}
            filteredData={data.filter( item =>{ return item.typescore === type.typescore })} />
        )}
      </div>
    </div>
  );
}
