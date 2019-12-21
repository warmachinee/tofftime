import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,

} from '@material-ui/core'

import {
  Person,
  CloudUpload,
  AddCircle,

} from '@material-ui/icons';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../../Utils/LabelText'),
  loading: () => null
});

const SelectMatchListItem = Loadable({
  loader: () => import(/* webpackChunkName: "SelectMatchListItem" */ './SelectMatchListItem'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
    marginBottom: 36,
  },
  grid: {
    boxSizing: 'border-box',
    marginTop: 24,
    padding: 12
  },
  listImageDown: {
    width: 36,
    marginRight: 0,
  },
  listImageUp: {
    width: 48,
    marginRight: 16,
  },
  imageDown: {
    width: 36,
    height: 36,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
  },
  imageUp: {
    width: 48,
    height: 48,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
  },

}));

export default function SelectMatch(props) {
  const classes = useStyles();
  const {
    sess, BTN, COLOR, token, setCSRFToken, handleSnackBar,
    pageOrganizer, pageData, pageList, selectedMatch, clickAction
  } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'creator'
    }

    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        ...sendObj
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(pageOrganizer){
        setData(d.filter( item =>{
          return item.pageid === pageData.pageid
        }))
      }else{
        setData(d)
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ props.dialog ])

  return (
    <div className={classes.root}>
      <LabelText text={
          `${API._getWord(sess && sess.language)[selectedMatch ? 'Selected_match' : 'Select_match' ]} : ${
            clickAction === 'edit' ?
              ( selectedMatch ?
                ( selectedMatch.matchname ?
                  selectedMatch.matchname
                  :
                  (
                    selectedMatch.title?
                    selectedMatch.title
                    :
                    ''
                  )
                )
                :
                ''
              )
              :
              (
                selectedMatch?
                selectedMatch.title
                :
                ''
              )
          }`
        } />
      <div className={classes.grid}>
        <BTN.Red style={{ paddingRight: 16 }} onClick={props.dialogOpenBySelectComp}>
          <AddCircle style={{ marginLeft: 4, marginRight: 8 }} />
          { API._getWord(sess && sess.language).Create_Match }
        </BTN.Red>
        <List style={{ marginTop: 16 }}>
          <ListItem style={{ backgroundColor: COLOR.grey[900] }}>
            <ListItemIcon
              className={clsx({
                [classes.listImageUp]: window.innerWidth >= 500,
                [classes.listImageDown]: window.innerWidth < 500
              })}>
              <div className={clsx({
                [classes.imageUp]: window.innerWidth >= 500,
                [classes.imageDown]: window.innerWidth < 500
              })} />
            </ListItemIcon>
            { window.innerWidth >= 600 &&
              <ListItemText style={{ maxWidth: 100, marginRight: 16, width: '100%', color: 'white' }}
                primary={ API._getWord(sess && sess.language).Match_Date } />
            }
            <ListItemText style={{ color: 'white', width: 100 }}
              primary={ API._getWord(sess && sess.language).Match } />

            { window.innerWidth >= 900 &&
              <ListItemText
                style={{ width: 100, color: 'white' }}
                primary={ API._getWord(sess && sess.language).Course } />
            }
          </ListItem>
        </List>
        <Divider />
        { data ?
          ( data.length > 0 ?
            data.map( d => <SelectMatchListItem key={d.matchid} data={d} {...props} />)
            :
            <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_match }
              </Box>
            </Typography>
          )
          :
          Array.from(new Array(2)).map( (d, i)=> <SelectMatchListItem key={i} {...props} />)
        }
      </div>
    </div>
  );
}
