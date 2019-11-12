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
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../Utils/TemplateDialog'),
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

export default function PageOrganizerCreatePost(props) {
  const classes = useStyles();
  const {
    sess, BTN, COLOR, token, setCSRFToken, handleSnackBar,
    pageOrganizer, pageData, pageList,
    selectMatchState, setSelectMatchState, setSelectedMatch, toggleCreateMatch
  } = props
  const [ data, setData ] = React.useState(null)

  function handleClose(){
    setSelectMatchState(false)
    setSelectedMatch(null)
  }

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
    if(selectMatchState){
      handleFetch()
    }
  },[ selectMatchState ])

  return (
    <TemplateDialog open={selectMatchState} handleClose={handleClose} maxWidth={900}>
      <div className={classes.root}>
        <LabelText text={ ( sess && sess.language === 'TH' ) ? "เลือกการแข่งขัน" : 'Select match' } />
        <div className={classes.grid}>
          <BTN.Red style={{ paddingRight: 16 }} onClick={toggleCreateMatch}>
            <AddCircle style={{ marginLeft: 4, marginRight: 8 }} />
            { ( sess && sess.language === 'TH' ) ? "สร้างการแข่งขัน" : 'Create Match' }
          </BTN.Red>
          <List style={{ marginTop: 16 }}>
            <ListItem button style={{ backgroundColor: COLOR.grey[900] }}>
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
                  primary={ ( sess && sess.language === 'TH' ) ? "วันที่" : 'Date' } />
              }
              <ListItemText style={{ color: 'white', width: 100 }}
                primary={ ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match' } />

              { window.innerWidth >= 900 &&
                <ListItemText
                  style={{ width: 100, color: 'white' }}
                  primary={ ( sess && sess.language === 'TH' ) ? "สนาม" : 'Course' } />
              }
            </ListItem>
          </List>
          <Divider />
          { data ?
            ( data.length > 0 ?
              data.map( d => <SelectMatchListItem key={d.matchid} data={d} {...props} />)
              :
              <div style={{
                  width: '100%', padding: '36px 0', textAlign: 'center',
                  fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No data</div>
            )
            :
            Array.from(new Array(2)).map( (d, i)=> <SelectMatchListItem key={i} {...props} />)
          }
        </div>
      </div>
    </TemplateDialog>
  );
}
