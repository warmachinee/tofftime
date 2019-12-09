import React from 'react'
import Loadable from 'react-loadable';
import * as API from './../../../api'
import * as COLOR from './../../../api/palette'
import { makeStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Typography,
  Box,
  IconButton,
  Link as MaterialLink,

} from '@material-ui/core';

import {
  Delete as DeleteIcon,

} from '@material-ui/icons';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
  loading: () => null
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  listDate: {
    width: 100,
    flex: 'none',
    transition: '.2s',
    [theme.breakpoints.down(750)]: {
      width: 120,
      display: 'flex',
      flexDirection: 'column'
    },
  },
  listType: {
    width: 100,
    marginRight: 16,
    flex: 'none',
    [theme.breakpoints.down(750)]: {
      display: 'none'
    },
  },
  listTypeSecondary: {
    marginTop: 4,
    [theme.breakpoints.up(750)]: {
      display: 'none'
    },
  },
  listMessage: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '100%'
  },

}));

function ListErrorItem(props){
  const classes = useStyles();
  const { editing, setEditing, data, handleOpen, getErrorTypeVariant } = props

  return (
    <React.Fragment>
      <ListItem button={!editing} onClick={()=>!editing ? handleOpen(data, 'detail') : console.log()}>
        <ListItemText className={classes.listDate}
          primary={<Typography variant="caption">{API._dateToString(data.date)}</Typography>}
          secondary={
            <Typography
              style={{ color: getErrorTypeVariant(data.type) }}
              className={classes.listTypeSecondary} variant="button">
              {data.type}
            </Typography>
          } />
        <ListItemText className={classes.listType}
          primary={<Typography style={{ color: getErrorTypeVariant(data.type) }} variant="button">{data.type}</Typography>} />
        <ListItemText className={classes.listMessage}
          primary={data.message ? data.message : '-'}
          secondary={data.url} />
        <ListItemSecondaryAction>
          { editing ?
            <IconButton onClick={()=>handleOpen(data, 'confirm')}>
              <DeleteIcon />
            </IconButton>
            :
            <div style={{ width: 42 }} />
          }
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
}

export default function ErrorDetection(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  const [ editing, setEditing ] = React.useState(false)
  const [ selectItem, setSelectItem ] = React.useState({
    detail: null,
    confirm: null
  })
  const [ dialog, setDialog ] = React.useState({
    detail: false,
    confirm: false
  })

  function handleOpen(d, type){
    setDialog({ ...dialog, [type]: true })
    setSelectItem({ ...selectItem, [type]: d })
  }

  function handleClose(type){
    setDialog({ ...dialog, [type]: false })
    setSelectItem({ ...selectItem, [type]: null })
  }

  function handleCloseAll(){
    setDialog({ detail: false, confirm: false })
    setSelectItem({
      detail: null,
      confirm: null
    })
  }

  function getErrorTypeVariant(type){
    switch (type) {
      case 'normal':
        return COLOR.amber[700]
        break;
      default:
        return COLOR.red[600]
    }
  }

  async function handleFetchDelete(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'report_error', {
        action: 'remove',
        errorid: selectItem.confirm.errorid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log(d);
      handleCloseAll()
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'load_error', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(!(dialog.detail || dialog.confirm)){
      handleFetch()
    }
  },[ dialog ])

  return (
    <div>
      <GoBack to='/system_admin/log' />
      <LabelText text={"Error & Bugs"} />
      { data && data.filter( s =>{ return s.status === 1 }).length > 0 &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BTN.PrimaryText onClick={()=>setEditing(!editing)}>{ editing ? 'Done' : 'Remove' }</BTN.PrimaryText>
        </div>
      }
      <List>
        { data &&
          data.filter( s =>{ return s.status === 1 }).length > 0 ?
          data.filter( s =>{ return s.status === 1 }).map( d =>
            <ListErrorItem key={d.errorid}
              data={d}
              editing={editing}
              setEditing={setEditing}
              handleOpen={handleOpen}
              getErrorTypeVariant={getErrorTypeVariant} />
          )
          :
          <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
            <Box style={{ textAlign: 'center', color: COLOR.primary[900] }} fontWeight={500} fontSize={24} m={1}>
              {'No Error'}
            </Box>
          </Typography>
        }
      </List>
      <TemplateDialog maxWidth="md" open={dialog.detail} handleClose={handleCloseAll}
        action={selectItem.detail && <BTN.Red onClick={()=>handleOpen(selectItem.detail, 'confirm')}>Delete</BTN.Red>}>
        { selectItem.detail &&
          <div style={{ marginBottom: 24 }}>
            <Typography gutterBottom variant="h5">
              {selectItem.detail.message}
            </Typography>
            <div style={{ display: 'flex' }}>
              <Typography
                gutterBottom
                style={{ color: getErrorTypeVariant(selectItem.detail.type), marginRight: 16 }}
                variant="button">
                {selectItem.detail.type}
              </Typography>
              <Typography gutterBottom variant="body1" style={{ fontWeight: 600 }}>
                {`${API._dateToString(selectItem.detail.date)} • ${API._dateToTimeString(selectItem.detail.date)}`}
              </Typography>
            </div>
            <div style={{ marginTop: 12, marginBottom: 24 }}>
              <MaterialLink target="_blank" href={selectItem.detail.url}>{selectItem.detail.url}</MaterialLink>
            </div>
            <Typography gutterBottom variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
              {selectItem.detail.stack}
            </Typography>
          </div>
        }
      </TemplateDialog>
      <ConfirmDialog
        sess={sess}
        maxWidth="xs"
        open={dialog.confirm}
        onClose={()=>dialog.detail ? handleClose('confirm') : handleCloseAll()}
        icon="Delete"
        iconColor={COLOR.red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          selectItem.confirm &&
          <Typography variant="body1">
            {selectItem.confirm.message}
          </Typography>
        }
        onSubmit={handleFetchDelete}
        submitButton="Red" />
    </div>
  );
}
