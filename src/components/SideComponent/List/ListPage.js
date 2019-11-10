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
  Tooltip,

} from '@material-ui/core'

import {
  AccountCircle,

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

}));

export default function ListPage(props) {
  const classes = useStyles();
  const {
    API, BTN, COLOR, isSupportWebp, token, setCSRFToken, sess, handleSess,
    pageid, pageList, setPageList
  } = props

  async function handleFetchPage(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'pagelist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPageList(d)
    })
  }

  React.useEffect(()=>{
    handleFetchPage()
  },[ props.createPageState ])

  return (
    <React.Fragment>
      { pageList &&
        pageList.filter( item =>{
          return item.pageid !== pageid
        }).map( d =>
          <BTN.NoStyleLink to={`/organizer/${d.pageid}`} key={d.pageid}>
            <ListItem button>
              <Tooltip title={d.pagename} placement="right">
                <ListItemIcon>
                  { d.logo ?
                    <Avatar className={classes.avatarImage}
                      src={API._getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                    :
                    <AccountCircle classes={{ root: classes.avatar }} style={{ color: COLOR[d.color][600] }} />
                  }
                </ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.listTitle} primary={d.pagename} />
            </ListItem>
          </BTN.NoStyleLink>
        )
      }
    </React.Fragment>
  )
}
