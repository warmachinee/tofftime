import React from 'react'
import clsx from 'clsx'
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import { LDCircular } from './../loading/LDCircular'
import * as API from './../../api'
import { primary, grey, red, green } from './../../api/palette'
import * as BTN from './../Button'

import {
  Dialog,
  Divider,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grow,
  Zoom,
  IconButton,

} from '@material-ui/core';

import {
  Close as CloseIcon,
  Delete as DeleteIcon,

} from '@material-ui/icons';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../Utils/LabelText'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../Utils/Dialog/ConfirmDialog'),
  loading: () => <LDCircular />
});

const SimulatorScorecard = Loadable({
  loader: () => import(/* webpackChunkName: "SimulatorScorecard" */'./SimulatorScorecard'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {

  },
  listTableLabel: {
    position: 'fixed',
    top: 56,
    [theme.breakpoints.up(600)]: {
      top: 64
    },
  },
  listSequence: {
    width: 36,
    flex: 'none',
    marginRight: 24,
    textAlign: 'right'
  },
  listDate: {
    width: 120,
    flex: 'none',
  },
  listCourse: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginRight: 16
  },
  listScore: {
    width: 48,
    flex: 'none',
    textAlign: 'center'
  },
  paperWidthSm: {
    maxWidth: 800
  },
  moreThan640: {
    [theme.breakpoints.down(640)]: {
      display: 'none'
    },
  },
  lessThan640: {
    [theme.breakpoints.up(640)]: {
      display: 'none'
    },
  },
  moreThan720: {
    [theme.breakpoints.down(720)]: {
      display: 'none'
    },
  },
  lessThan720: {
    [theme.breakpoints.up(720)]: {
      display: 'none'
    },
  },
  moreThan880: {
    [theme.breakpoints.down(880)]: {
      display: 'none'
    },
  },
  lessThan880: {
    [theme.breakpoints.up(880)]: {
      display: 'none'
    },
  },
  moreThan960: {
    [theme.breakpoints.down(960)]: {
      display: 'none'
    },
  },
  lessThan960: {
    [theme.breakpoints.up(960)]: {
      display: 'none'
    },
  },


}))

export default function StatisticsTable(props){
  const classes = useStyles();
  const {
    sess, token, setCSRFToken, handleSnackBar, simulatorData, handleFetchSimulator
  } = props
  const inputEl = React.useRef(null);
  const labelEl = React.useRef(null);
  const [ op, setOp ] = React.useState(true)
  const [ widthEl, setWidthEl ] = React.useState(0)
  const [ removeState, setRemoveState ] = React.useState(false)
  const [ selectedItem, setSelectedItem ] = React.useState(null)
  const [ selectedDeleteItem, setSelectedDeleteItem ] = React.useState(null)
  const [ dialog, setDialog ] = React.useState({
    detail: false,
    deleteSimulatorStat: false
  })

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function onScrollHandler(){
    const w = window.scrollY
    const el = inputEl.current.offsetTop + labelEl.current.offsetHeight
    setWidthEl(labelEl.current.clientWidth)
    const diff = el - w - 40 - 64
    if(diff > 0){
      setOp(true)
    }else{
      setOp(false)
    }
  }

  function onClickDetail(d){
    dialogOpen('detail')
    setSelectedItem(d)
  }

  function handleOnDeleteStat(d){
    dialogOpen('deleteSimulatorStat')
    setSelectedDeleteItem(d)
  }

  function handleOnCancelDeleteStat(d){
    dialogClose('deleteSimulatorStat')
    setSelectedDeleteItem(null)
  }

  React.useEffect(()=>{
    window.addEventListener('scroll',onScrollHandler)
    return ()=>{
      window.removeEventListener('scroll',onScrollHandler)
    }
  },[ inputEl ])

  function TableBodyComponent(){
    return (
      <React.Fragment>
        <ListItemText style={{ color: 'white' }} className={classes.listSequence} primary="#" />
        <ListItemText style={{ color: 'white' }}
          className={clsx(classes.listDate, {
            [classes.moreThan960]: props.open,
            [classes.moreThan720]: !props.open
          })} primary={ API._getWord(sess && sess.language).Date } />
        <ListItemText style={{ color: 'white' }} className={classes.listCourse}
          primary={ API._getWord(sess && sess.language).Course } />
        { !removeState &&
          <React.Fragment>
            <ListItemText style={{ color: 'white' }}
              className={clsx(classes.listScore, {
                [classes.moreThan880]: props.open,
                [classes.moreThan640]: !props.open
              })} primary="OUT" />
            <ListItemText style={{ color: 'white' }}
              className={clsx(classes.listScore, {
                [classes.moreThan880]: props.open,
                [classes.moreThan640]: !props.open
              })} primary="IN" />
            <ListItemText style={{ color: 'white' }} className={classes.listScore} primary="TOT" />
            <ListItemText style={{ color: 'white' }} className={classes.listScore} primary="PAR" />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

  async function handleDeleteStat(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'simulatorsystem', {
        action: 'delete',
        sequence: selectedDeleteItem.sequence
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        handleOnCancelDeleteStat()
        handleFetchSimulator()
      }
    })
  }

  return(
    <div ref={inputEl}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <BTN.PrimaryOutlined onClick={()=>setRemoveState(!removeState)}>
          { API._getWord(sess && sess.language)[removeState ? 'Done' : 'Remove' ] }
        </BTN.PrimaryOutlined>
      </div>
      <Grow in={op}>
        <List disablePadding>
          <ListItem
            ref={labelEl}
            style={{ backgroundColor: grey[900], }}>
            <TableBodyComponent />
          </ListItem>
        </List>
      </Grow>
      <Zoom in={!op}>
        <List disablePadding
          className={classes.listTableLabel}>
          <ListItem
            style={{
              backgroundColor: grey[900],
              width: widthEl,
              margin: 'auto',
            }}>
            <TableBodyComponent />
          </ListItem>
        </List>
      </Zoom>
      <List>
        { simulatorData ?
          ( simulatorData.length > 0 ?
            simulatorData.map( d =>
              <React.Fragment key={d.sequence}>
                <ListItem button={!removeState} onClick={()=>onClickDetail(d)}>
                  <ListItemText className={classes.listSequence} primary={d.sequence} />
                  <ListItemText
                    className={clsx(classes.listDate, {
                      [classes.moreThan960]: props.open,
                      [classes.moreThan720]: !props.open
                    })} primary={API._dateToString(d.createdate)} />
                  <ListItemText className={classes.listCourse}
                    primary={d.fieldname}
                    secondary={
                      <Typography component="div">
                        <Typography
                          className={clsx(classes.listDate, {
                            [classes.lessThan960]: props.open,
                            [classes.lessThan720]: !props.open
                          })} variant="caption">
                          {API._dateToString(d.createdate)}
                        </Typography>
                        <Typography
                          className={clsx(classes.listDate, {
                            [classes.lessThan880]: props.open,
                            [classes.lessThan640]: !props.open
                          })} variant="body2">
                          {`OUT = ${d.sout}, IN = ${d.sin}`}
                        </Typography>
                      </Typography>
                    } />
                  { removeState ?
                    <ListItemSecondaryAction>
                      <IconButton onClick={()=>handleOnDeleteStat(d)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    :
                    <React.Fragment>
                      <ListItemText
                        className={clsx(classes.listScore, {
                          [classes.moreThan880]: props.open,
                          [classes.moreThan640]: !props.open
                        })} primary={d.sout} />
                      <ListItemText
                        className={clsx(classes.listScore, {
                          [classes.moreThan880]: props.open,
                          [classes.moreThan640]: !props.open
                        })} primary={d.sin} />
                      <ListItemText className={classes.listScore} primary={d.gross} />
                      <ListItemText className={classes.listScore} primary={d.par} />
                    </React.Fragment>
                  }
                </ListItem>
                <Divider />
              </React.Fragment>
            )
            :
            <Paper component="div" style={{ width: '100%', padding: 12, boxSizing: 'border-box' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_data }
              </Box>
            </Paper>
          )
          :
          <LDCircular />
        }
      </List>
      <Dialog fullScreen={window.innerWidth <= 600} classes={{ paperWidthSm: classes.paperWidthSm }}
        onClose={()=>dialogClose('detail')} open={dialog.detail}>
        <LabelText text="Scorecard" />
        <IconButton onClick={()=>dialogClose('detail')} style={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        { selectedItem &&
          <SimulatorScorecard {...props} selectedItem={selectedItem} />
        }
      </Dialog>
      <ConfirmDialog
        sess={sess}
        open={dialog.deleteSimulatorStat}
        onClose={handleOnCancelDeleteStat}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          selectedDeleteItem &&
          <Typography variant="body1" align="center">
            {`${selectedDeleteItem.sequence} ${selectedDeleteItem.fieldname}`}
          </Typography>
        }
        onSubmit={handleDeleteStat}
        submitButton="Red" />

    </div>
  );
}
