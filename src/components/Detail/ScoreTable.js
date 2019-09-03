import React from 'react';
import Loadable from 'react-loadable';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { primary, secondary, blueGrey, amber, green } from './../../api/palette'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

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
  const { row, data, fieldData } = props
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
        <div className={classes.tableRank} style={tableCell}>{row.rank}</div>
        <div
          style={{ width: '100%', display: 'flex' }}
          className={classes.tableHead}>
          {row.firstname}
          <div style={{ width: 10 }}></div>
          {row.lastname}
        </div>

        { (wd >= 450) &&
          <React.Fragment>
            <div className={classes.tableCell} style={tableCell}>{row.out}</div>
            <div className={classes.tableCell} style={tableCell}>{row.in}</div>
            <div className={classes.tableCell} style={tableCell}>{row.out + row.in}</div>
          </React.Fragment>
        }
        <div className={classes.tableCell} style={tableCell}>{
            row.par > 0? '+' + row.par:
            row.par === 0?'E':row.par
          }</div>
      </ListItem>
      {!expanded && <Divider />}
      <Collapse in={expanded} unmountOnExit>
        <div style={{
            overflow: 'auto', padding: '16px 0 16px 0',
            overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch'
          }}>
          { data && data.fieldscore && row && row.score &&
            <React.Fragment>
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
                        data.fieldscore[i] - d < 0? amber[300]:
                        data.fieldscore[i] - d > 0? green[300]:blueGrey[50],
                        padding: '8px 4px', width: 32, textAlign: 'center'
                    }}>{d}</div>
                  )}
                  <div style={{ backgroundColor: blueGrey[50],
                    padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{row.in}</div>
                  <div style={{ backgroundColor: blueGrey[50],
                    padding: '8px 4px', width: 48, textAlign: 'center', borderRadius: '0 0 4px 0', fontWeight: 800 }}>{row.out + row.in}</div>
                </div>
              </ListItem>
              <div style={{ display: 'flex' }}>
                <ScoreTableChip dotColor={green[300]} label="Under"/>
                <ScoreTableChip dotColor={blueGrey[50]} label="Par"/>
                <ScoreTableChip dotColor={amber[300]} label="Over"/>
              </div>
            </React.Fragment>
          }
        </div>

        <Divider />
      </Collapse>
    </React.Fragment>
  );
}

export default function ScoreTable(props) {
  const classes = useStyles();
  const { data, userscore, matchClass } = props
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

  return (
    <div>
      {/*--------------------Table Head--------------------*/}
      <Grow in={op}>
        <AppBar
          ref={inputEl}
          position="relative"
          style={{
            backgroundColor: secondary[900],
          }}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <StyledTableRank style={{...style.rank, color: 'white' }} align="center">Rank</StyledTableRank>
                <StyledTableHead style={{ color: 'white' }} component="th" scope="row">Name</StyledTableHead>
                { (wd >= 450) &&
                  <React.Fragment>
                    <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">OUT</StyledTableCell>
                    <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">IN</StyledTableCell>
                    <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">TOT</StyledTableCell>
                  </React.Fragment>
                }
                <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">PAR</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AppBar>
      </Grow>
      <Zoom in={!op}>
        <AppBar
          position="fixed"
          style={{
            position: 'fixed',
            top: window.innerWidth > 600 ? 64: 56,
            backgroundColor: secondary[900],
          }}>
          <Table
            className={classes.table}
            style={{
              width: widthEl,
              margin: 'auto',
            }}>
            <TableBody>
              <TableRow>
                <StyledTableRank style={{...style.rank, color: 'white' }} align="center">Rank</StyledTableRank>
                <StyledTableHead style={{ color: 'white' }} component="th" scope="row">Name</StyledTableHead>

                { (wd >= 450) &&
                  <React.Fragment>
                    <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">OUT</StyledTableCell>
                    <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">IN</StyledTableCell>
                    <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">TOT</StyledTableCell>
                  </React.Fragment>
                }
                <StyledTableCell style={{ ...style.cell, color: 'white'}} align="center">PAR</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AppBar>
      </Zoom>
      {/*--------------------End Table Head--------------------*/}
      <Paper className={classes.root}>
        { userscore && userscore.filter((d)=>{
          return ( d && d.classno === matchClass.classno )
        }).map(row => (
          row &&
          <ScoreRow key={row.userid} row={row} data={data} fieldData={fieldData}/>
        ))}
      </Paper>
    </div>
  );
}
