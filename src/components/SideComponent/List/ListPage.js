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
  const { API, BTN, COLOR, isSupportWebp, token, setCSRFToken, sess, handleSess, accountData } = props
  const [ pageList, setPageList ] = React.useState(null)

  async function handleFetchPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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
  },[ ])

  return pageList && (
    pageList.map( d =>
      <ListItem button key={d.pageid}>
        <ListItemIcon>
          { d.logo ?
            <Avatar className={classes.avatarImage}
              src={API.getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}/>
            :
            <AccountCircle classes={{ root: classes.avatar }} style={{ color: COLOR[d.color][600] }}/>
          }
        </ListItemIcon>
        <ListItemText className={classes.listTitle} primary={d.pagename} />
      </ListItem>
    )
  )
}
