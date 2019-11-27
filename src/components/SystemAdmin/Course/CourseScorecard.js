import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

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

export default function CourseScorecard(props){
  const classes = useStyles();
  const { API, COLOR, BTN, field = {
    location: 'Course Example',
    locationversion: 1,
    fieldscore: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    hfieldscore: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
  } } = props
  const labelArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const scoreOUT = API._handleHoleSum(field.fieldscore, 'out')
  const scoreIN = API._handleHoleSum(field.fieldscore, 'in')
  const scoreGross = API._handleHoleSum(field.fieldscore, 'out') + API._handleHoleSum(field.fieldscore, 'in')

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{field.location}</Typography>
      <Typography variant="body1">
        {`Version ${field.locationversion}`}
      </Typography>
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
            {field.fieldscore.slice(0, 9).map((d, i) =>
              <TableCell key={i} align="center" className={classes.tableCell}>
                {d}
              </TableCell>
            )}
            <TableCell align="center" className={classes.tableCellSum} style={{ fontWeight: 600 }}>
              {scoreOUT}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.tableCellLabel} style={{ fontWeight: 600 }}>
              HCP
            </TableCell>
            {field.hfieldscore.slice(0, 9).map((d, i) =>
              <TableCell key={i} align="center" className={classes.tableCell}>
                {d}
              </TableCell>
            )}
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
            {field.fieldscore.slice(9, 18).map((d, i) =>
              <TableCell key={i} align="center" className={classes.tableCell}>
                {d}
              </TableCell>
            )}
            <TableCell align="center" className={classes.tableCellSum} style={{ fontWeight: 600  }}>
              {scoreIN}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.tableCellLabel} style={{ fontWeight: 600  }}>
              HCP
            </TableCell>
            {field.hfieldscore.slice(9, 18).map((d, i) =>
              <TableCell key={i} align="center" className={classes.tableCell}>
                {d}
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
      <div className={classes.sumGrid}>
        <Typography variant="h6" style={{ fontWeight: 400 }}>{`OUT = ${scoreOUT}, IN = ${scoreIN}`}</Typography>
        <Typography variant="h6" style={{ fontWeight: 400 }}>{`Gross = ${scoreGross}`}</Typography>
      </div>
    </Paper>
  );
}
