import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primary, grey } from './../../../api/palette'

import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,

} from '@material-ui/core';

import {
  ExpandMore,
  AddCircle,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const MatchClass = Loadable({
  loader: () => import(/* webpackChunkName: "MatchClass" */'./MatchClass'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    marginTop: 24,
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900
  },
  listRoot: {
    marginTop: 16,
    width: '100%',
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paper: {
    padding: theme.spacing(2)
  },
  addClass: {
    flexDirection: 'column',
    [theme.breakpoints.up(400)]: {
      flexDirection: 'row'
    },
  },
  addClassButtonGrid: {
    width: '100%',
    [theme.breakpoints.up(400)]: {
      width: 'auto',
      marginTop: 'auto',
    },
  },
  addClassButton: {
    width: '100%',
    marginLeft: 0,
    marginTop: 16,
    [theme.breakpoints.up(400)]: {
      marginLeft: 8,
      marginTop: 0,
    },
  },

}))

function MainClassList(props){
  const classes = useStyles();
  const { sess, matchClass } = props
  const [ expand, setExpand ] = React.useState(false)
  const [ lists, setLists ] = React.useState([])
  const [ arrEdit, setArrEdit ] = React.useState([])
  const [ arrEditColor, setArrEditColor ] = React.useState([])
  const [ arrEditClassno, setArrEditClassno ] = React.useState([])

  return (
    <React.Fragment>
      { props.data && props.data.scorematch !== 0 ?
        <React.Fragment>
          <ListItem button onClick={()=>setExpand(!expand)}
            style={{
              marginTop: 16,
              backgroundColor: primary[50],
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
            }}>
            <ListItemText primary={matchClass ? 'Main Class ' + matchClass.mainclass : 'Main Class' } />
            <IconButton
              disableRipple
              className={classes.expandIcon}
              style={{ transform: expand?'rotate(180deg)':'rotate(0deg)' }}
              onClick={()=>setExpand(!expand)}
              aria-expanded={expand}
              aria-label="Show more"
            >
              <ExpandMore />
            </IconButton>
          </ListItem>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Paper className={classes.paper}>
              <MatchClass {...props} />
            </Paper>
          </Collapse>
        </React.Fragment>
        :
        <MatchClass {...props} />
      }
    </React.Fragment>
  );
}

export default function MBClass(props){
  const classes = useStyles();
  const { BTN, API, sess, token, setCSRFToken, setData, data, matchid, handleSnackBar, isSupportWebp } = props

  async function handleFetchCreate(){
    if(data && data.mainclass){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'classadd',
          matchid: matchid,
          classname: data.scorematch == 0 ? 1 : 'Class Number 1',
          mainclass: data.mainclass.length + 1
      }, (csrf, d) =>{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setCSRFToken(csrf)
        handleFetch()
      })
    }
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin'? 'loadmatch' :'mloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        console.log(d.mainclass);
        if(
          d.status !== 'class database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      {/* data && data.status !== 'wrong params' &&

        */
      }
      <List className={classes.listRoot}>
        { data && data.mainclass && data.mainclass.length === 0 &&
          <React.Fragment>
            <ListItem>
              <ListItemText
                style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: primary[900] }}
                primary={function(){
                  switch (data.scorematch) {
                    case 0:
                      return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No flight'
                      break;
                    case 1:
                      return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No class'
                      break;
                    default:
                      return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No Team'
                  }
                }()} />
            </ListItem>
          </React.Fragment>
        }
        { data && data.mainclass && data.mainclass.length > 0 &&
          data.mainclass.map((d, index) =>
            <MainClassList key={index} {...props} matchClass={d} data={data} setData={setData} />
          )
        }
        { data && ( data.scorematch == 0 ? !( data.mainclass && data.mainclass.length > 0 ) : true ) &&
          <ListItem className={classes.addClass}>
            <ListItemIcon className={classes.addClassButtonGrid}>
              <BTN.PrimaryOutlined className={classes.addClassButton} variant="outlined" onClick={handleFetchCreate}>
                <AddCircle style={{ marginRight: 12 }} />
                { ( sess && sess.language === 'TH' ) ? "สร้าง" : 'Create' }
              </BTN.PrimaryOutlined>
            </ListItemIcon>
          </ListItem>
        }
      </List>
    </div>
  );
}
