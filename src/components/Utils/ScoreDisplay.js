import React from 'react';
import { Link, Redirect } from "react-router-dom";
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'auto',
    marginTop: 24,
    maxHeight: '100%',
    maxWidth: 1000,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  scoreBlockGrid: {
    overflow: 'auto',
    marginTop: 24, marginBottom: 24,
    overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch'
  },
  block: {
    position: 'relative',
    margin: 8
  },
  blockGrid: {
    display: 'flex',
    minWidth: 700,
    justifyContent: 'space-between',
  },
  blockLabelGrid: {
    display: 'flex',
    flexDirection: 'column',
    width: 70,
  },
  blockLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: 30,
    borderRadius: '4px 4px 0 0',
    backgroundColor: primary[900]
  },
  blockLabelText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: 40,
    borderRadius: '0 0 4px 4px',
    border: `1.5px solid ${primary[600]}`
  },
  alignCenter: {
    textAlign: 'center',

  },
  alignCenterWhite: {
    textAlign: 'center',
    color: 'white'
  },
  text: {
    color: primary[600],
  },
  textHighlight: {
    color: primary[900],
    fontWeight: 800
  },

}))

const theme = createMuiTheme({
  palette: {
    primary: primary,
  }
});

export default function ScoreDisplay(props){
  const classes = useStyles();
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ matchid, setMatchid ] = React.useState( props.computedMatch? parseInt(props.computedMatch.params.matchid) : null )
  const [ arrScore, setArrScore ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [ hostUserid, setHostUserid ] = React.useState(null)
  const [ host, setHost ] = React.useState(null)

  function handleFetch(){
    const socket = socketIOClient( API._getWebURL() )
    const userid = hostUserid? hostUserid : parseInt(props.computedMatch.params.userid)
    socket.on(`${matchid}-${userid}-show-server-message`, (messageNew) => {
      if(/success/.test(messageNew.status)){
        setHostUserid(messageNew.userid)
        setArrScore(messageNew.result[0])
        setHost(messageNew.hostdetail)
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ hostUserid ])

  return(
    <div className={classes.root}>
      <div style={{ height: 24 }} />
      { host ?
        <Typography variant="h4">
          { host.fullname } &nbsp;&nbsp; { host.lastname }
        </Typography>
        :
        <Typography variant="h4">
          Pending
        </Typography>
      }
      { hostUserid && <Redirect to={`/display/${matchid}/${hostUserid}`} /> }
      <ThemeProvider theme={theme}>
        <div className={classes.scoreBlockGrid}>
          <div className={classes.blockGrid}>
            {tempArr.slice(0, 9).map( d =>
              <div key={d} className={classes.block}>
                <div className={classes.blockLabelGrid}>
                  <div className={classes.blockLabel}>
                    <p className={classes.alignCenterWhite}>{d + 1}</p>
                  </div>
                  <div className={classes.blockLabelText}>
                    <p className={classes.alignCenter}>{arrScore[d] || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={classes.blockGrid}>
            {tempArr.slice(9, 18).map( d =>
              <div key={d} className={classes.block}>
                <div className={classes.blockLabelGrid}>
                  <div className={classes.blockLabel}>
                    <p className={classes.alignCenterWhite}>{d + 1}</p>
                  </div>
                  <div className={classes.blockLabelText}>
                    <p className={classes.alignCenter}>{arrScore[d] || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
      <Typography component="div" style={{ display: 'flex' }}>
        <Box className={classes.text} m={1}>
          OUT = {API._handleHoleSum(arrScore, 'out')}
        </Box>
        <Box className={classes.text} m={1}>
          IN = {API._handleHoleSum(arrScore, 'in')}
        </Box>
        <div style={{ flex: 1 }} />
        <Box className={classes.textHighlight} m={1}>
          Total = {API._handleHoleSum(arrScore, 'out') + API._handleHoleSum(arrScore, 'in')}
        </Box>
      </Typography>
    </div>
  );
}
