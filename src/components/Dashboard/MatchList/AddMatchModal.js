import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
}))

export default function AddMatchModal(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, setData } = props

  const [ matchListData, setMatchListData ] = React.useState([])
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)

  function handleMore(){
    if(matchListData){
      if( dataSliced >= matchListData.length ){
        setDataSliced( 10 )
      }else{
        setDataSliced( dataSliced + 10 )
      }
    }
  }

  function handleMoreAll(){
    if(matchListData){
      if( dataSliced >= matchListData.length ){
        setDataSliced( 10 )
      }else{
        setDataSliced( matchListData.length )
      }
    }
  }

  async function handleAddMatch(d){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchmain', {
        action: 'add',
        matchid: d.matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error'
      })
      try {
        handleFetch()
      }
      catch(err) {
        console.log(err.message);
      }
    })
  }
  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'match',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleLoadMatch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setMatchListData(d)
    })
  }

  React.useEffect(()=>{
    handleLoadMatch()
    /*
    var json = '[{"matchid":29204611,"title":"Match 1755","date":"03/07/2019","picture":null,"location":"Northern Rangsit Golf Club","createdate":"03/07/2019","policy":0,"scorematch":1,"display":1,"status":0,"views":14},{"matchid":92778945,"title":"ALEX MCKAY SENIOR NATION TOUR THAI SPGA MEMBER","date":"19/03/2019","picture":null,"location":"BANGKOK GOLF CLUB","createdate":"19/03/2019","policy":1,"scorematch":1,"display":1,"status":0,"views":20},{"matchid":14547753,"title":"Test 15.03","date":"17/03/2019","picture":null,"location":"Test Create Field","createdate":"17/03/2019","policy":1,"scorematch":1,"display":-1,"status":0,"views":0},{"matchid":73773313,"title":"TestAddPlayer","date":"22/03/2019","picture":null,"location":"aaa","createdate":"15/03/2019","policy":1,"scorematch":1,"display":-1,"status":0,"views":0},{"matchid":78470939,"title":"catty","date":"12/03/2019","picture":null,"location":"Northern Rangsit Golf Club","createdate":"11/03/2019","policy":0,"scorematch":1,"display":-1,"status":0,"views":0},{"matchid":13321640,"title":"SNT 2 -2019","date":"28/02/2019","picture":null,"location":"Muang Ake Golf Club","createdate":"28/02/2019","policy":0,"scorematch":1,"display":1,"status":0,"views":0},{"matchid":24624947,"title":"SENIOR NATION TOUR 4-2018","date":"03/12/2018","picture":null,"location":"สนามกอล์ฟไพน์เฮิทร์ กอล์ฟ แอนด์ คันทรี่ คลับ","createdate":"03/12/2018","policy":0,"scorematch":1,"display":1,"status":0,"views":0},{"matchid":91433000,"title":"SENIOR NATION TOUR 3-2018","date":"25/10/2018","picture":null,"location":"Watermill GOLF&GARDENS","createdate":"25/10/2018","policy":0,"scorematch":1,"display":1,"status":0,"views":0},{"matchid":42758771,"title":"SENIOR NATION TOUR 2-2018","date":"28/09/2018","picture":null,"location":"Uniland Golf and Country Club","createdate":"28/09/2018","policy":0,"scorematch":1,"display":1,"status":0,"views":0},{"matchid":45506254,"title":"SENIOR NATION TOUR 1-2018","date":"24/08/2018","picture":null,"location":"Northern Rangsit Golf Club","createdate":"27/08/2018","policy":0,"scorematch":1,"display":1,"status":0,"views":0}]';
    var obj = JSON.parse(json);
    setMatchListData(obj)*/
  },[ props.data ])

  return(
    <div style={{ maxHeight: window.innerHeight * .8 , height: '100%'}}>
      <FormControl className={classes.margin} style={{ marginTop: 24 }}>
        <InputLabel>Search player</InputLabel>
        <Input
          value={searchUser}
          onChange={e =>setSearchUser(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <List className={classes.root}>
        { matchListData && !matchListData.status &&
          matchListData.filter((item)=>{
              return (
                (item.title.search(searchUser) !== -1) ||
                (item.title.toLowerCase().search(searchUser.toLowerCase()) !== -1)
              )
            }).slice(0, dataSliced).map(value => {
            return (
              <ListItem key={value.title + `(${value.matchid})`} role={undefined} dense button
                onClick={()=>handleAddMatch(value)}>
                <ListItemIcon>
                  <IconButton>
                    <AddCircleIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemText className={classes.listText} primary={value.title} />
              </ListItem>
            );
          })
        }
        <ListItem key="More button" role={undefined} dense style={{ display: 'flex' }}>
          { matchListData && matchListData.length > 10 &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { matchListData && dataSliced >= matchListData.length ? 'Collapse':'More' }
              </Button>
              { matchListData && dataSliced < matchListData.length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
        </ListItem>
      </List>
    </div>
  );
}
