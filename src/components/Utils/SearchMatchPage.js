import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

import {
  IconButton,
  Avatar,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,

} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close'
import PersonIcon from '@material-ui/icons/Person'
import FlagIcon from '@material-ui/icons/Flag'

const useStyles = makeStyles(theme => ({
  avatarSearch: {
    fontSize: 32,
    [theme.breakpoints.up(600)]: {
      fontSize: 48,
    },
  },
  avatarImageSearch: {
    width: 32,
    height: 32,
    [theme.breakpoints.up(600)]: {
      width: 48,
      height: 48,
    },
  },
  searchLabel: {
    flexGrow: 1,
    marginLeft: 8,
    [theme.breakpoints.up(600)]: {
      marginLeft: 16,
    },
  },
  paper: {
    boxShadow: 'none',
    margin: 0,
    color: '#586069',
    fontSize: 13,
    [theme.breakpoints.up(600)]: {
      fontSize: 16,
    },
  },
  option: {
    alignItems: 'flex-start',
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
    padding: 4,
    [theme.breakpoints.up(600)]: {
      padding: '6px 16px'
    },
  },
  popup: {
    zIndex: 1100,
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
  },

}));

export default function SearchMatchPage(props) {
  const classes = useStyles();
  const { API, sess, isSupportWebp, searchState, setSearchState } = props
  const [ searchText, setSearchText ] = React.useState('')
  const [ searchData, setSearchData ] = React.useState(null)

  function searchTextOnChange(e){
    if(e){
      setSearchText(e.target.value)
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('search-client-message', {
        action: "matchpage",
        text: e.target.value,
        ...(sess && sess.userid) && { userid: sess.userid }
      })
    }else{
      setSearchText('')
    }
  }

  function responseSearch(){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`${sess && sess.userid ? sess.userid : 'defaultUI'}-matchpage-search-server-message`, (messageNew) => {
      setSearchData(messageNew.result.infolist)
    })
  }

  React.useEffect(()=>{
    responseSearch()
  },[ ])

  React.useEffect(() => {
    if (!searchState) {
      setSearchState(null);
    }
  }, [ searchState ]);

  return (
    <React.Fragment>
      <IconButton disabled style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
        <SearchIcon />
      </IconButton>
      <Autocomplete
        disableCloseOnSelect
        disableOpenOnFocus
        freeSolo={searchData && searchData.length !== 0}
        classes={{
          paper: classes.paper,
          option: classes.option,
          popup: classes.popup,
        }}
        options={searchData !== null ? searchData : []}
        getOptionLabel={option => option.matchname}
        noOptionsText={ API._getWord(sess && sess.language).No_Result }
        loading={searchData === null}
        renderOption={option => {

          return (
            <List disablePadding style={{ width: '100%' }}>
              <Link to={`/${option.type}/${option.id}`} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>
                <ListItem onClick={()=>setSearchState(false)}>
                  <ListItemIcon>
                    { option.photopath ?
                      <Avatar className={classes.avatarImageSearch}
                        src={API._getPictureUrl(option.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                      :
                      <AccountIcon classes={{ root: classes.avatarSearch }} />
                    }
                  </ListItemIcon>
                  <ListItemText
                    className={classes.searchLabel}
                    primary={<Typography variant="body1" style={{ marginBottom: 4 }}>{option.matchname}</Typography>}
                    secondary={
                      <React.Fragment>
                        <span style={{ marginRight: 8 }}>
                          {function(){
                            switch (option.type) {
                              case 'match':
                                return <FontAwesomeIcon icon={faTrophy} style={{ fontSize: 12 }} />
                                break;
                              case 'page':
                                return <FlagIcon style={{ fontSize: 12 }} />
                                break;
                              default:
                                return <span style={{ width: 16 }} />
                            }
                          }()}
                        </span>
                        <Typography variant="caption" color="textSecondary" style={{ textTransform: 'capitalize' }}>{option.type}</Typography>
                      </React.Fragment>
                    } />
                </ListItem>
              </Link>
              {searchData && searchData.length > 1 && <Divider />}
            </List>
          );
        }}
        style={{ width: '100%', /**/ }}
        onBlur={()=>setSearchState(false)}
        renderInput={params => (
          <InputBase
            fullWidth
            ref={params.ref}
            inputProps={params.inputProps}
            onChange={e =>searchTextOnChange(e)}
            autoFocus={API._isDesktopBrowser() && searchState}
            placeholder={ API._getWord(sess && sess.language)['Search Match or Group'] }
            />
        )} />
      <div className={classes.grow} />
      <IconButton onClick={()=>setSearchState(false)}>
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );
}
