import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';

import {
  TextField
} from '@material-ui/core';

const Announce = Loadable({
  loader: () => import(/* webpackChunkName: "Announce" */ './../components/Announce/Announce'),
  loading: () => null
});

const OverviewProfile = Loadable({
  loader: () => import(/* webpackChunkName: "OverviewProfile" */ './../components/User/OverviewProfile'),
  loading: () => null
});

const Statistics = Loadable({
  loader: () => import(/* webpackChunkName: "Statistics" */ './../components/Statistics/Statistics'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    [theme.breakpoints.up(630)]: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },

}));

export default function UserPage(props) {
  const classes = useStyles();
  const {
    COLOR, API, BTN, isSupportWebp, sess, handleSess, accountData, handleAccountData,
    token, setCSRFToken, drawerState, drawerClose
  } = props

  function handleChangePerson(e){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      socket.emit('search-client-message', {
        action: "person",
        userid: sess.userid,
        text: e.target.value
      })
    }
  }

  function handleChangeField(e){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      socket.emit('search-client-message', {
        action: "field",
        userid: sess.userid,
        text: e.target.value
      })
    }
  }

  function responsePerson(){
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`${sess.userid}-person-search-server-message`, (messageNew) => {
      console.log("Person : ", messageNew.result.infolist);
    })
  }

  function responseField(){
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`${sess.userid}-field-search-server-message`, (messageNew) => {
      console.log("field : ", messageNew.result.infolist);
    })
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d[0])
      console.log(d[0]);
    })
  }

  React.useEffect(()=>{
    //console.log(props);
    if(sess && sess.status === 1 && sess.typeid !== 'admin'){
      handleFetchInfo()
      responsePerson()
      responseField()
    }else{
      var json = '[{"userid":812454,"email":"warmachineza01@gmail.com","tel":"-","gender":"-","birthdate":null,"nickname":"-","fullname":"Sippakorn","lastname":"Suppapinyo","favgolf":"-","photopath":null}]'
      handleAccountData(JSON.parse(json)[0])
    }
  },[ sess ])

  return (
    <div className={classes.root}>
      <div style={{ width: '100%', border: '1px solid black', padding: 24 }}>
        { sess &&
          (
            sess.status === 1?
            (
              <p style={{ fontSize: 28 }}>
                <b>user</b> : {sess.fullname} {sess.lastname} <br></br>
                <b>userid</b> : {sess.userid} <br></br>
                <b>type</b>: {sess.typeid} <br></br>
                <b>language</b>: {sess.language}  <br></br>
            </p>
            )
            :
            (
              <p style={{ fontSize: 28 }}>
                <b>user</b> : {sess.status}
              </p>
            )
          )
        }
      </div>

      {
        true ?
        <div className={classes.grid}>
          <OverviewProfile {...props} />
          <Statistics {...props} />
        </div>
        :
        <div style={{ width: '100%', border: '1px solid black', padding: 24 }}>
          <TextField fullWidth variant="outlined" label="Person"
            onChange={handleChangePerson}/>
          <br></br>
          <br></br>
          <TextField fullWidth variant="outlined" label="field"
            onChange={handleChangeField}/>
        </div>
      }

    </div>
  );
}
