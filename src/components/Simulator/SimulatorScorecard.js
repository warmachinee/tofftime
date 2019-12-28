import React from 'react'
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import { LDCircular } from './../loading/LDCircular'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  Paper,
  Typography,

} from '@material-ui/core';

const SimulatorInput = Loadable({
  loader: () => import(/* webpackChunkName: "SimulatorInput" */'./SimulatorInput'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    overflowX: 'auto',
    boxSizing: 'border-box'
  },
  table: {
    minWidth: 650,
  },
  tableCellLabel: {
    fontSize: 16,
    width: 100,
    boxSizing: 'border-box'
  },
  tableCell: {
    fontSize: 16
    /*
    [theme.breakpoints.down(600)]: {
      padding: '6px 24px 6px 16px',
    },*/
  },
  tableCellSum: {
    fontSize: 16,
    boxSizing: 'border-box',
    width: 75
  },
  sumGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 2)
  },

}));

export default function SimulatorScorecard(props){
  const classes = useStyles();
  const { API, COLOR, BTN, sess, token, setCSRFToken, selectedItem, simulatorData } = props
  const labelArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ data, setData ] = React.useState(null)
  const [ editing, setEditing ] = React.useState(false)

  async function handleFetchSimulatorDetail(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadsimulator', {
        action: 'detail',
        sequence: selectedItem.sequence
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetchSimulatorDetail()
  },[ selectedItem, simulatorData ])

  return (
    <Paper className={classes.root}>
      { data ?
        <React.Fragment>
          <Typography variant="h5">{data.fieldinfo.fieldname}</Typography>
          <Typography variant="body1">
            {`Version ${data.fieldinfo.fieldversion}`}
          </Typography>
          <Typography variant="body1">
            {API._dateToString(data.createdate)}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <BTN.PrimaryOutlined onClick={()=>setEditing(!editing)}>
              { API._getWord(sess && sess.language)[editing ? 'Done' : 'Edit' ] }
            </BTN.PrimaryOutlined>
          </div>
          { editing ?
            <SimulatorInput {...props} editingData={{ ...data, sequence: selectedItem.sequence}} editing={editing} setEditing={setEditing} />
            :
            <React.Fragment>
              <Table className={classes.table} style={{ marginTop: 16 }}>
                <TableHead style={{ backgroundColor: COLOR.primary[900] }}>
                  <TableRow>
                    <TableCell align="left" className={classes.tableCellLabel} style={{ color: 'white', fontWeight: 600 }}>
                      HOLE
                    </TableCell>
                    {labelArr.slice(0, 9).map( d =>
                      <TableCell key={d} align="center" className={classes.tableCell} style={{ color: 'white' }}>
                        {d + 1}
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCellSum} style={{ color: 'white', fontWeight: 600 }}>
                      OUT
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: COLOR.primary[100] }}>
                  <TableRow>
                    <TableCell align="left" className={classes.tableCellLabel} style={{ fontWeight: 600 }}>
                      PAR
                    </TableCell>
                    {data.fieldinfo.fieldscore.slice(0, 9).map((d, i) =>
                      <TableCell key={i} align="center" className={classes.tableCell}>
                        {d}
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCellSum}>
                      {API._handleHoleSum(data.fieldinfo.fieldscore, 'out')}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell align="left" className={classes.tableCellLabel} style={{ fontWeight: 600 }}>
                      SCORE
                    </TableCell>
                    {data.userscore.slice(0, 9).map((d, i) =>
                      <TableCell key={i} align="center" className={classes.tableCell}>
                        {d}
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCellSum} style={{ fontWeight: 800  }}>
                      {data.sout}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table className={classes.table} style={{ marginTop: 24 }}>
                <TableHead style={{ backgroundColor: COLOR.primary[900] }}>
                  <TableRow>
                    <TableCell align="left" className={classes.tableCellLabel} style={{ color: 'white', fontWeight: 600 }}>
                      HOLE
                    </TableCell>
                    {labelArr.slice(9, 18).map( d =>
                      <TableCell key={d} align="center" className={classes.tableCell} style={{ color: 'white' }}>
                        {d + 1}
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCellSum} style={{ color: 'white', fontWeight: 600 }}>
                      IN
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: COLOR.primary[100] }}>
                  <TableRow>
                    <TableCell align="left" className={classes.tableCellLabel} style={{ fontWeight: 600 }}>
                      PAR
                    </TableCell>
                    {data.fieldinfo.fieldscore.slice(9, 18).map((d, i) =>
                      <TableCell key={i} align="center" className={classes.tableCell}>
                        {d}
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCellSum}>
                      {API._handleHoleSum(data.fieldinfo.fieldscore, 'in')}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell align="left" className={classes.tableCellLabel} style={{ fontWeight: 600  }}>
                      SCORE
                    </TableCell>
                    {data.userscore.slice(9, 18).map((d, i) =>
                      <TableCell key={i} align="center" className={classes.tableCell}>
                        {d}
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCellSum} style={{ fontWeight: 800  }}>
                      {data.sin}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className={classes.sumGrid}>
                <div>
                  <Typography variant="body1" style={{ fontWeight: 400 }}>{`OUT = ${data.sout}, IN = ${data.sin}`}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 400 }}>{`Gross = ${data.gross}`}</Typography>
                </div>
                <Typography variant="h6" style={{ fontWeight: 400 }}>{`PAR = ${data.par}`}</Typography>
              </div>
            </React.Fragment>
          }
        </React.Fragment>
        :
        <LDCircular />
      }
    </Paper>
  );
}
