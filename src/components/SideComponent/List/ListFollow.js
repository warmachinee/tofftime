import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Collapse,

} from '@material-ui/core'

import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  avatar: {
    fontSize: 36
  },
  avatarImage: {
    width: 36,
    height: 36,
  },
  listTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

}));

export default function ListFollow(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, isSupportWebp, token, setCSRFToken, sess, handleSess, state, expanded, handleExpand } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'pagefollow'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return ( data && data.length > 0 ) && (
    <React.Fragment>
      <Divider />
      <List>
        <ListItem button onClick={()=>handleExpand('follow')}>
          <ListItemIcon>
            {expanded.follow ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "การติดตาม" : 'Follow' } />
        </ListItem>
      </List>
      <Collapse in={state} timeout="auto" style={{ minHeight: 'auto' }}>
        <List component="div" disablePadding>
          { data &&
            data.map( d =>
              <BTN.NoStyleLink to={`/page/${d.pageid}`} key={d.pageid}>
                <ListItem button>
                  <ListItemIcon>
                    { d.logo ?
                      <Avatar className={classes.avatarImage}
                        src={API.getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                      :
                      <AccountCircle classes={{ root: classes.avatar }} />
                    }
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography className={classes.name} variant="body2">
                          {d.pagename}
                        </Typography>
                      </React.Fragment>
                    } />
                </ListItem>
              </BTN.NoStyleLink>
            )
          }
        </List>
      </Collapse>
    </React.Fragment>
  )
}
