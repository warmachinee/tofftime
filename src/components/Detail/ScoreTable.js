import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { primary, secondary, blueGrey, amber, green } from './../../api/palette'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Zoom,
  Grow,
  Collapse,
  ListItem,
  Divider,
  Typography,
  Box,
  Avatar,
  Chip,

} from '@material-ui/core'

import {
  AccountCircle,

} from '@material-ui/icons'

import { LDCircular } from './../loading/LDCircular'

const ScoreTableChip = Loadable({
  loader: () => import(/* webpackChunkName: "ScoreTableChip" */'./ScoreTableChip'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    //minWidth: 650,
  },
  tableHead: {
    padding: 0
  },
  labelRank: {
    padding: '0 0 0 14px',
    width: 40,
    [theme.breakpoints.up(500)]: {
      width: 48,
      padding: '14px 16px',
    },
    [theme.breakpoints.up(600)]: {
      width: 48,
      padding: '14px 16px',
    },
  },
  labelCell: {
    padding: '0 0 0 14px',
    [theme.breakpoints.up(600)]: {
      padding: '14px 16px',
    },
  },
  listItem: {
    padding: 0
  },
  tableRank: {
    textAlign: 'center',
    padding: '0 0 0 14px',
  },
  tableHead: {
    padding: '16px 0 16px 14px',
    wordBreak: 'break-word',
  },
  tableCell: {
    textAlign: 'center',
    padding: '0 0 0 14px',
  },
  avatar: {
    fontSize: 100
  },
  avatarImage: {
    width: 100,
    height: 100,
  },

}));

const StyledTableRank = withStyles(theme => ({
  root: {
    padding: '0 0 0 14px',
    [theme.breakpoints.up(600)]: {
      padding: '14px 16px',
    },
  },
  body: {
    fontSize: 14,
    border: 'none'
  },
}))(TableCell);

const StyledTableHead = withStyles(theme => ({
  root: {
    padding: '16px 0 16px 14px',
    [theme.breakpoints.up(600)]: {
      padding: '14px 16px',
    },
    wordBreak: 'break-word',
  },
  body: {
    fontSize: 14,
    border: 'none'
  },
}))(TableCell);

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: '0 0 0 14px',
    [theme.breakpoints.up(600)]: {
      padding: '14px 16px',
    },
  },
  body: {
    fontSize: 14,
    border: 'none'
  },
}))(TableCell);

function ScoreRow(props){
  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false)
  const { API, sess, isSupportWebp, BTN, row, data, index, fieldData, sortBy, scoringMethod, } = props
  const wd = window.innerWidth

  const tableCell = {
    width: '100%',
    maxWidth: (wd >= 500)? 64:48
  }

  return(
    <React.Fragment>
      <ListItem button className={classes.listItem}
        key={row.userid}
        onClick={()=>setExpanded(!expanded)}>
        <div className={classes.tableRank} style={tableCell}>
          { data.scorematch !== 1 ?
            index + 1
            :
            row.rank
          }
        </div>
        <div
          style={{ width: '100%', display: 'flex' }}
          className={classes.tableHead}>
          {row.firstname}
          <div style={{ width: 10 }}></div>
          {row.lastname}
        </div>
        { (wd >= 450) &&
          <React.Fragment>
            { wd >= 850 &&
              <React.Fragment>
                <div className={classes.tableCell} style={tableCell}>{row.out}</div>
                <div className={classes.tableCell} style={tableCell}>{row.in}</div>
              </React.Fragment>
            }
            <div className={classes.tableCell} style={tableCell}>{row.out + row.in}</div>
            { data.scorematch !== 1 && scoringMethod === 'flight' &&
              <div className={classes.tableCell} style={tableCell}>{row.hc}</div>
            }
          </React.Fragment>
        }
        <div className={classes.tableCell} style={tableCell}>
          { ( data.scorematch === 1 || scoringMethod === 'stroke' ) ?
            (
              row.par > 0? '+' + row.par : row.par === 0? 'E' : row.par
            )
            :
            ( sortBy === 'net' ? row.net : row.sf )
          }
        </div>
      </ListItem>
      {!expanded && <Divider />}
      <Collapse in={expanded} unmountOnExit>
        { data && data.fieldscore && row && row.score &&
          <div style={{
              overflow: 'auto', padding: '16px 0',
              overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: 1000 }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 16, paddingTop: 0 }}>
                  { row.photopath ?
                    <Avatar className={classes.avatarImage} style={{ marginLeft: 'auto', marginRight: 'auto' }}
                      src={API._getPictureUrl(row.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                    :
                    <AccountCircle classes={{ root: classes.avatar }} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                  }
                  { BTN && row && sess && sess.status === 1 && sess.typeid !== 'admin' && ('typeid' in row) &&
                    <div style={{ padding: '8px 24px' }}>
                      { row.typeid === 'dummy' ?
                        <Typography variant="body2"
                          align="center"
                          style={{ color: primary[500], textTransform: 'uppercase', letterSpacing: '0.02857em', fontWeight: 500 }}>
                          { API._getWord(sess && sess.language).Dummy }
                        </Typography>
                        :
                        <Link to={`/user/timeline/${row.userid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <BTN.PrimaryOutlined>{ API._getWord(sess && sess.language).Profile }</BTN.PrimaryOutlined>
                        </Link>
                      }
                    </div>
                  }

                </div>
                <div>
                  <ListItem style={{ padding: 0 }}>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 64, textAlign: 'right', borderRadius: '4px 0 0 0', fontWeight: 800 }}>HOLE</div>
                      {[0,1,2,3,4,5,6,7,8].map( d=>
                        <div key={d} style={{ backgroundColor: 'black', color: 'white',
                          padding: '8px 4px', width: 32, textAlign: 'center' }}>{d + 1}</div>
                      )}
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>OUT</div>
                      {[9,10,11,12,13,14,15,16,17].map( d=>
                        <div key={d} style={{ backgroundColor: 'black', color: 'white',
                          padding: '8px 4px', width: 32, textAlign: 'center' }}>{d + 1}</div>
                      )}
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>IN</div>
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 48, textAlign: 'center', borderRadius: '0 4px 0 0', fontWeight: 800 }}>TOT</div>
                    </div>
                  </ListItem>
                  <ListItem style={{ padding: 0 }}>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 64, textAlign: 'right', fontWeight: 800 }}>PAR</div>
                      { data.fieldscore.slice(0,9).map( (d,i)=>
                        <div key={i} style={{ backgroundColor: blueGrey[700], color: blueGrey[100],
                          padding: '8px 4px', width: 32, textAlign: 'center' }}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{fieldData.out}</div>
                      { data.fieldscore.slice(9,18).map( (d,i)=>
                        <div key={i} style={{ backgroundColor: blueGrey[700], color: blueGrey[100],
                          padding: '8px 4px', width: 32, textAlign: 'center'}}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{fieldData.in}</div>
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{fieldData.gross}</div>
                    </div>
                  </ListItem>
                  <ListItem style={{ padding: 0 }}>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 64, textAlign: 'right', borderRadius: '0 0 0 4px', fontWeight: 800 }}>SCORE</div>
                      { row.score.slice(0,9).map( (d,i)=>
                        <div key={i}
                          style={{
                            backgroundColor:
                            data.fieldscore[i] - d < 0? amber[300]:
                            data.fieldscore[i] - d > 0? green[300]:blueGrey[50],
                            padding: '8px 4px', width: 32, textAlign: 'center'
                        }}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{row.out}
                      </div>
                      { row.score.slice(9,18).map( (d,i)=>
                        <div key={i}
                          style={{
                            backgroundColor:
                            data.fieldscore[i + 9] - d < 0? amber[300]:
                            data.fieldscore[i + 9] - d > 0? green[300]:blueGrey[50],
                            padding: '8px 4px', width: 32, textAlign: 'center'
                        }}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{row.in}</div>
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', borderRadius: '0 0 4px 0', fontWeight: 800 }}>{row.out + row.in}</div>
                    </div>
                  </ListItem>
                  <div style={{ display: 'flex', padding: '8px 12px' }}>
                    <Chip variant="outlined" style={{ marginRight: 12 }}
                      label={`PAR | ${row.par > 0? '+' + row.par : row.par === 0? 'E' : row.par}`} />
                    { data.scorematch !== 1 && scoringMethod === 'flight' &&
                      <Chip variant="outlined" style={{ marginRight: 12 }}
                        label={`HC | ${row.hc}`} />
                    }
                    { !( data.scorematch === 1 || scoringMethod === 'stroke' ) &&
                      <React.Fragment>
                        <Chip variant="outlined" style={{ marginRight: 12 }}
                          label={`${sortBy === 'net' ? 'NET' : 'SF'} | ${sortBy === 'net' ? row.net : row.sf}`} />
                        <Chip variant="outlined" style={{ marginRight: 12 }}
                          label={`${sortBy === 'net' ? 'SF' : 'NET'} | ${sortBy === 'net' ? row.sf : row.net}`} />
                      </React.Fragment>
                    }
                  </div>
                  <div style={{ display: 'flex' }}>
                    <ScoreTableChip dotColor={green[300]} label="Under"/>
                    <ScoreTableChip dotColor={blueGrey[50]} label="Par"/>
                    <ScoreTableChip dotColor={amber[300]} label="Over"/>
                  </div>
                </div>
              </div>
          </div>
        }
        <Divider />
      </Collapse>
    </React.Fragment>
  );
}

export default function ScoreTable(props) {
  const classes = useStyles();
  const { API, COLOR, sess, data, userscore, matchClass, sortBy, scoringMethod, value } = props
  const inputEl = React.useRef(null);
  const [ op, setOp ] = React.useState(true)
  const [ widthEl, setWidthEl ] = React.useState(0)
  const [ fieldData, setFieldData ] = React.useState({
    out: 0,
    in: 0,
    gross: 0
  })

  const wd = window.innerWidth
  const style = {
    rank: {
      width: (wd >= 500)? 64:48
    },
    cell: {
      width: (wd >= 500)? 64:48
    },
    tableCell: {
      width: '100%',
      maxWidth: (wd >= 500)? 64:48
    }
  }

  function onScrollHandler(){
    const w = window.scrollY
    const el = inputEl.current.offsetTop + inputEl.current.offsetHeight
    setWidthEl(inputEl.current.clientWidth)
    const diff = el - w - 108 - 12
    if(diff > 0){
      setOp(true)
    }else{
      setOp(false)
    }
  }

  function TableBodyComponent(){
    return (
      <TableBody>
        <TableRow>
          <StyledTableRank style={{...style.rank, color: 'white' }} align="center">
            { API._getWord(sess && sess.language).Rank }
          </StyledTableRank>
          <StyledTableHead style={{ color: 'white' }} component="th" scope="row">
            { API._getWord(sess && sess.language).Player_name }
          </StyledTableHead>
          { (wd >= 450) &&
            <React.Fragment>
              { (wd >= 850) &&
                <React.Fragment>
                  <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">OUT</StyledTableCell>
                  <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">IN</StyledTableCell>
                </React.Fragment>
              }
              <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">TOT</StyledTableCell>
              { data.scorematch !== 1 && scoringMethod === 'flight' &&
                <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">HC</StyledTableCell>
              }
            </React.Fragment>
          }
          <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">
            { ( data.scorematch === 1 || scoringMethod === 'stroke' ) ?
              'PAR' :
              ( sortBy === 'net' ? 'NET' : 'SF' )
            }
          </StyledTableCell>
        </TableRow>
      </TableBody>
    );
  }

  React.useEffect(()=>{
    let tempIn = 0
    let tempOut = 0
    for(var i = 0;i < 18;i++){
      if(i >= 9){
        tempIn += data.fieldscore[i]
      }else{
        tempOut += data.fieldscore[i]
      }
    }
    setFieldData({
      out: tempOut,
      in: tempIn,
      gross: tempOut + tempIn
    })

  },[ ])

  React.useEffect(()=>{
    window.addEventListener('scroll',onScrollHandler)
    return ()=>{
      window.removeEventListener('scroll',onScrollHandler)
    }
  },[ inputEl ])

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div>
      <Grow in={op}>
        <AppBar
          ref={inputEl}
          position="relative"
          style={{
            backgroundColor: COLOR[ matchClass.color ? matchClass.color : 'secondary' ][900],
          }}>
          <Table className={classes.table}>
            <TableBodyComponent />
          </Table>
        </AppBar>
      </Grow>
      <Zoom in={!op}>
        <AppBar
          position="fixed"
          style={{
            position: 'fixed',
            top: window.innerWidth > 600 ? 64: 56,
            backgroundColor: COLOR[ matchClass.color ? matchClass.color : 'secondary' ][900],
          }}>
          <Table
            className={classes.table}
            style={{
              width: widthEl,
              margin: 'auto',
            }}>
            <TableBodyComponent />
          </Table>
        </AppBar>
      </Zoom>
      <Paper className={classes.root}>
        { userscore ?
          (
            userscore.filter( d =>{
              return ( d.classno === matchClass.classno )
            }).length > 0 ?
            userscore.filter( d =>{
              return ( d.classno === matchClass.classno )
            }).map( ( row, i ) => (
              <ScoreRow {...props} key={row.userid} row={row} data={data} fieldData={fieldData} index={i} />
            ))
            :
            <Typography component="div" style={{ width: '100%', paddingTop: 24, paddingBottom: 24  }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_player }
              </Box>
            </Typography>
          )
          :
          <LDCircular />
        }
      </Paper>
    </div>
  );
}
