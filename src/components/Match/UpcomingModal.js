import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  tableHead: {
    backgroundColor: grey[900],
  },
  tableDate: {
    width: 120,
  },
  tableView: {
    width: 60,
    textAlign: 'center'
  },
  tableDateText: {
    fontStyle: 'oblique',
    fontFamily: 'monospace'
  },
  tableTitle: {
    width: '100%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    [theme.breakpoints.up(800)]: {
      width: '60%',
    },
  },
  tableLocation: {
    width: '40%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },

}));

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

export default function UpcomingModal(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        action: 'upcoming'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div>
      <Typography variant="h5" style={{ color: primary[900] }}>
        Upcoming
      </Typography>
      <List style={{ marginTop: 24 }}>
        <ListItem key="Table Head" className={classes.tableHead}>
          { window.innerWidth >= 600 &&
            <StyledText primary="Date" className={classes.tableDate}/>
          }
          <StyledText primary="Views" className={classes.tableView}/>
          <StyledText inset primary="Match" className={classes.tableTitle}/>
          { window.innerWidth >= 800 &&
            <StyledText inset primary="Location" className={classes.tableLocation}/>
          }
        </ListItem>
      </List>
      <List style={{ overflow: 'auto', maxHeight: window.innerHeight * .8, position: 'relative' }}>
        {data && !data.status &&
          data.map( (d, i) =>
            d &&
            <React.Fragment key={i}>
              <Link to={`/match/${d.matchid}`} className={classes.linkElement}>
                <ListItem key={d.matchid} button>
                  { window.innerWidth >= 600 &&
                    <ListItemText primary={API.handleDateToString(d.matchcreatedate)} className={classes.tableDate} classes={{ primary: classes.tableDateText }}/>
                  }
                  <ListItemText primary={d.view} className={classes.tableView}/>
                  <ListItemText inset className={classes.tableTitle}
                    primary={d.matchname}
                    secondary={
                      window.innerWidth < 800 &&
                      (
                        window.innerWidth >= 600?
                        d.fieldname
                        :
                        <React.Fragment>
                          <Typography
                            style={{ fontStyle: 'oblique' }}
                            component="span"
                            variant="caption"
                            color="textPrimary"
                          >
                            {API.handleDateToString(d.matchcreatedate)}
                          </Typography>
                          <br></br>
                          {d.fieldname}
                        </React.Fragment>
                      )
                    }/>
                  { window.innerWidth >= 800 &&
                    <ListItemText inset primary={d.fieldname} className={classes.tableLocation}/>
                  }
                </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
        )}
      </List>
    </div>
  );
}
