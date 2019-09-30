import React from 'react';
import Fuse from 'fuse.js';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
  listItemIcon:{
    margin: theme.spacing(1, 0)
  },
  addCircleIcon: {
    color: primary[600]
  },

}))

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function AddMatchModal(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, setData } = props

  const [ matchListData, setMatchListData ] = React.useState([])
  const [ searchMatch, setSearchMatch ] = React.useState('')
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

  function handleSearch(){
    if(matchListData){
      var options = {
        shouldSort: true,
        keys: [
          "title",
          "location",
          "date"
        ]
      }
      var fuse = new Fuse(matchListData, options)
      var result = fuse.search(searchMatch)
      return result
    }
  }

  async function handleAddMatch(d){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'matchmain', {
        action: 'add',
        matchid: d.matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmainpage', {
        action: 'match',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleLoadMatch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setMatchListData(d)
    })
  }

  React.useEffect(()=>{
    handleLoadMatch()
  },[ props.data ])

  return(
    <div style={{ maxHeight: '100%', paddingTop: 24 }}>
      <ThemeProvider theme={theme}>
        <TextField
          className={classes.searchBox}
          variant="outlined"
          placeholder={ !searchMatch? "Search match" : '' }
          value={searchMatch}
          onChange={e =>setSearchMatch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary"/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                { searchMatch?
                  <IconButton onClick={()=>setSearchMatch('')}>
                    <ClearIcon color="inherit" fontSize="small"/>
                  </IconButton>
                  :
                  <div style={{ width: 44 }}></div>
                }
              </InputAdornment>
            )
          }}
        />
      </ThemeProvider>
      <List className={classes.root}>
        { matchListData && !matchListData.status &&
          [
            ...searchMatch? handleSearch().slice(0, dataSliced) : matchListData.slice(0, 10)
          ].map(value => {
            return value && (
              <React.Fragment key={value.title + `(${value.matchid})`}>
                <ListItem role={undefined} button
                  onClick={()=>handleAddMatch(value)}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <AddCircleIcon classes={{ root: classes.addCircleIcon }} />
                  </ListItemIcon>
                  <ListItemText className={classes.listText}
                    primary={value.title}
                    secondary={
                      window.innerWidth >= 650?
                      value.location
                      :
                      <React.Fragment>
                        <Typography
                          style={{ fontStyle: 'oblique' }}
                          component="span"
                          variant="caption"
                          color="textPrimary"
                        >
                          {value.date}
                        </Typography>
                        <br></br>
                        {value.location}
                      </React.Fragment>
                    } />
                  { window.innerWidth >= 650 &&
                    <ListItemText
                      style={{ textAlign: 'right', paddingRight: 16 }}
                      primary={
                        <Typography
                          style={{ fontStyle: 'oblique' }}
                          component="span"
                          variant="caption"
                          color="textPrimary"
                        >
                          {value.date}
                        </Typography>
                      } />
                  }
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        }
        <ListItem key="More button" role={undefined} dense style={{ display: 'flex' }}>
          { matchListData && handleSearch().length > 10 && searchMatch &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= handleSearch().length ? (
                  ( sess && sess.language === 'EN' ) ? "Collapse" : 'ย่อทั้งหมด'
                ):(
                  ( sess && sess.language === 'EN' ) ? "More" : 'แสดง'
                ) }
              </Button>
              { matchListData && dataSliced < handleSearch().length &&
                <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'EN' ) ? "More all" : 'แสดงทั้งหมด' }</Button>
              }
            </React.Fragment>
          }
        </ListItem>
        { searchMatch && handleSearch().length === 0 &&
          <ListItem>
            <Typography component="div" style={{ width: '100%' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                No Reult
              </Box>
            </Typography>
          </ListItem>
        }
      </List>
    </div>
  );
}
