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
  const { value, index, filteredData } = props;
  return (
    <div>
      { filteredData.length > 0 &&
        <div className={classes.grid}>
          { filteredData.map( d => <MatchCard key={d.matchid} data={d} {...props} />) }
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

  function LoadTempData(){
    var json = '[{"matchid":13321640,"fieldversion":1,"title":"SNT 2 -2019","request":"complete","date":"28/02/2019","picture":"/matchs/13321640/13321640","location":"Muang Ake Golf Club","detail":"","typescore":1,"createdate":"28/02/2019","views":15,"matchstatus":1,"permission":"none"},{"matchid":91433000,"fieldversion":1,"title":"SENIOR NATION TOUR 3-2018","request":"complete","date":"25/10/2018","picture":"/matchs/91433000/91433000","location":"Watermill GOLF&GARDENS","detail":"","typescore":1,"createdate":"25/10/2018","views":9,"matchstatus":1,"permission":"none"},{"matchid":76119605,"fieldversion":3,"title":"Charity Sayan match 2 - 2019","request":"complete","date":"30/01/2020","picture":"/matchs/76119605/76119605","location":"Sayan golf course","detail":null,"typescore":0,"createdate":"02/10/2019","views":218,"matchstatus":0,"permission":"admin"},{"matchid":75299796,"fieldversion":1,"title":"SST Amateur Group 4 - 2019","request":"complete","date":"29/02/2020","picture":"/matchs/75299796/75299796","location":"Riverdale Golf Club","detail":null,"typescore":2,"createdate":"09/10/2019","views":83,"matchstatus":0,"permission":"host"},{"matchid":47976698,"fieldversion":1,"title":"SST Amateur - 2 / 2019","request":"complete","date":"30/09/2019","picture":"/matchs/47976698/47976698","location":"สนามชลประทาน","detail":null,"typescore":0,"createdate":"06/09/2019","views":276,"matchstatus":1,"permission":"host"},{"matchid":47865838,"fieldversion":1,"title":"Pro golf Tournament 1 - 2019","request":"complete","date":"31/12/2019","picture":"/matchs/47865838/47865838","location":"Golf Course 1","detail":null,"typescore":1,"createdate":"25/09/2019","views":126,"matchstatus":0,"permission":"none"},{"matchid":45506254,"fieldversion":1,"title":"SENIOR NATION TOUR 1-2018","request":"complete","date":"24/08/2018","picture":"/matchs/45506254/45506254","location":"Northern Rangsit Golf Club","detail":"","typescore":1,"createdate":"27/08/2018","views":22,"matchstatus":1,"permission":"none"},{"matchid":42758771,"fieldversion":1,"title":"SENIOR NATION TOUR 2-2018","request":"complete","date":"28/09/2018","picture":"/matchs/42758771/42758771","location":"Uniland Golf and Country Club","detail":"","typescore":1,"createdate":"28/09/2018","views":17,"matchstatus":1,"permission":"none"},{"matchid":24759650,"fieldversion":1,"title":"Amateur SNT Club 1 - 2019","request":"complete","date":"12/12/2019","picture":"/matchs/24759650/24759650","location":"BANGKOK GOLF CLUB","detail":null,"typescore":0,"createdate":"05/09/2019","views":176,"matchstatus":0,"permission":"host"},{"matchid":24624947,"fieldversion":1,"title":"SENIOR NATION TOUR 4-2018","request":"complete","date":"03/12/2018","picture":"/matchs/24624947/24624947","location":"สนามกอล์ฟไพน์เฮิทร์ กอล์ฟ แอนด์ คันทรี่ คลับ","detail":"","typescore":1,"createdate":"03/12/2018","views":15,"matchstatus":1,"permission":"none"},{"matchid":16725831,"fieldversion":1,"title":"SNT 4-2019","request":"complete","date":"04/07/2019","picture":"/matchs/16725831/16725831","location":"Watermill GOLF&GARDENS","detail":"","typescore":1,"createdate":"04/07/2019","views":473,"matchstatus":1,"permission":"none"},{"matchid":92778945,"fieldversion":1,"title":"ALEX MCKAY SENIOR NATION TOUR THAI SPGA MEMBER","request":"complete","date":"19/03/2019","picture":"/matchs/92778945/92778945","location":"BANGKOK GOLF CLUB","detail":"","typescore":1,"createdate":"19/03/2019","views":83,"matchstatus":1,"permission":"none"}]'
    setData(JSON.parse(json))
  }

  React.useEffect(()=>{
    if(/localhost/.test(window.location.href)){
      LoadTempData()
    }else{
      handleFetch()
    }
  },[ ])

  return(
    <div id="el_match" className={classes.root}>
      <div className={classes.tabRoot}>
        <Paper elevation={1} style={{ padding: '16px 0' }}>
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
        { data && MATCH_LABEL.map( type =>
          value === type.typescore &&
          <TabContainer
            {...props}
            key={type.typescore}
            value={value}
            index={type.typescore}
            filteredData={data.filter( item =>{ return item.typescore === type.typescore })} />
        )}
      </div>
    </div>
  );
}

/*
{ data && data.filter( item =>{ return item.typescore !== 1 }).length > 0 && value === 1 &&
  <React.Fragment>
    <LabelText text={ ( sess && sess.language === 'TH' ) ? "การแข่งขันมือสมัครเล่น" : 'Amateur match' } />
    <div className={classes.grid}>
      { data.filter( item =>{ return item.typescore !== 1 }).map( d => <MatchCard key={d.matchid} data={d} {...props} />) }
    </div>
  </React.Fragment>
}
*/
