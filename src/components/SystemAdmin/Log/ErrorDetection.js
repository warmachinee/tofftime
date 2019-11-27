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

  function tempFetch(){
    setData([
      {
        date: "2019-11-27T05:32:57.000Z",
        errorid: 754605,
        file: "https:\/\/thai-pga.com\/OrganizerOverview.js",
        message: "Uncaught TypeError: Cannot read property 'pagename' of undefined",
        object: "",
        stack: "TypeError: Cannot read property 'pagename' of undefined\n    at https:\/\/thai-pga.com\/OrganizerOverview.js:1:3421\n    at XMLHttpRequest.i.onreadystatechange (https:\/\/thai-pga.com\/app.js:1:47798)",
        status: 1,
        type: "normal",
        url: "https:\/\/thai-pga.com\/page\/8"
      },
      {
        date: "2019-11-26T19:14:27.000Z",
        errorid: 161036,
        file: "webpack:\/\/\/.\/src\/components\/Organizer\/OrganizerOverview.js?",
        message: "Uncaught TypeError: Cannot read property 'subscribe' of undefined",
        object: "",
        stack: "TypeError: Cannot read property 'subscribe' of undefined\n    at eval (webpack:\/\/\/.\/src\/components\/Organizer\/OrganizerOverview.js?:191:26)\n    at XMLHttpRequest.req.onreadystatechange (webpack:\/\/\/.\/src\/api\/index.js?:601:11)",
        status: 1,
        type: "normal",
        url: "https:\/\/www.thai-pga.com\/page\/8"
      },
      {
        date: "2019-11-27T05:32:53.000Z",
        errorid: 262321,
        file: "https:\/\/thai-pga.com\/OrganizerOverview.js",
        message: "Uncaught TypeError: Cannot read property 'pagename' of undefined",
        object: "",
        stack: "TypeError: Cannot read property 'pagename' of undefined\n    at https:\/\/thai-pga.com\/OrganizerOverview.js:1:3421\n    at XMLHttpRequest.i.onreadystatechange (https:\/\/thai-pga.com\/app.js:1:47798)",
        status: 1,
        type: "normal",
        url: "https:\/\/thai-pga.com\/page\/890008"
      },
      {
        date: "2019-11-25T04:42:45.000Z",
        errorid: 189215,
        file: "https:\/\/thai-pga.com\/app.js",
        message: "",
        object: "",
        stack: "ReferenceError: asdasdasdasd is not defined\n    at onClick (https:\/\/thai-pga.com\/app.js:6:11971)\n    at Object.m (https:\/\/thai-pga.com\/app.js:22:1023)\n    at k (https:\/\/thai-pga.com\/app.js:22:1166)\n    at https:\/\/thai-pga.com\/app.js:22:1312\n    at S (https:\/\/thai-pga.com\/app.js:22:1398)\n    at O (https:\/\/thai-pga.com\/app.js:22:1847)\n    at P (https:\/\/thai-pga.com\/app.js:22:1659)\n    at _ (https:\/\/thai-pga.com\/app.js:22:2007)\n    at xn (https:\/\/thai-pga.com\/app.js:22:29062)\n    at se (https:\/\/thai-pga.com\/app.js:22:114831)",
        status: 1,
        type: "normal",
        url: "https:\/\/thai-pga.com\/system_admin\/log\/error"
      },
      {
        date: "2019-11-25T04:22:14.000Z",
        errorid: 370261,
        file: "M\n    ",
        message: "ReferenceError: mainasdasd is not defined",
        object: "",
        stack: "\n    in M\n    in t\n    in n\n    in t\n    in div\n    in J\n    in t\n    in t\n    in t",
        status: 1,
        type: "boundary",
        url: "https:\/\/thai-pga.com\/user#_=_"
      },
    ])
  }

  React.useEffect(()=>{
    if(!(dialog.detail || dialog.confirm)){
      /*
      if(/localhost/.test(window.location.href)){
        tempFetch()
      }else{
        handleFetch()
      }*/
      handleFetch()
    }
  },[ dialog ])

  return (
    <div>
      <LabelText text={"Error & Bugs"} />
      { data && data.length > 0 &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BTN.PrimaryText onClick={()=>setEditing(!editing)}>{ editing ? 'Done' : 'Remove' }</BTN.PrimaryText>
        </div>
      }
      <List>
        {data &&
          data.length > 0 ?
          data.map( d =>
            d.status === 1 &&
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
      <TemplateDialog maxWidth={900} open={dialog.detail} handleClose={handleCloseAll}
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
