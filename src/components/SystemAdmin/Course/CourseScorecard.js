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
  },
  table: {
    minWidth: 600,
  },
  tableCell: {
    /*
    [theme.breakpoints.down(600)]: {
      padding: '6px 24px 6px 16px',
    },*/
  },

}));

export default function CourseScorecard(props){
  const classes = useStyles();
  const { COLOR, BTN, field } = props
  const labelArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{field.location}</Typography>
      <Typography variant="body1">
        {`Version ${field.locationversion}`}
      </Typography>
      <Table className={classes.table} style={{ marginTop: 16 }}>
        <TableHead style={{ backgroundColor: COLOR.primary[900] }}>
          <TableRow>
            <TableCell align="left" className={classes.tableCell} style={{ color: 'white' }}>
              HOLE
            </TableCell>
            {labelArr.slice(0, 9).map( d =>
              <TableCell key={d} align="center" className={classes.tableCell} style={{ color: 'white' }}>
                {d + 1}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: COLOR.primary[100] }}>
          <TableRow>
            <TableCell align="left" className={classes.tableCell}>
              PAR
            </TableCell>
            {field.fieldscore.slice(0, 9).map((d, i) =>
              <TableCell key={i} align="center" className={classes.tableCell}>
                {d}
              </TableCell>
            )}
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.tableCell}>
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
            <TableCell align="left" className={classes.tableCell} style={{ color: 'white' }}>
              HOLE
            </TableCell>
            {labelArr.slice(9, 18).map( d =>
              <TableCell key={d} align="center" className={classes.tableCell} style={{ color: 'white' }}>
                {d + 1}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: COLOR.primary[100] }}>
          <TableRow>
            <TableCell align="left" className={classes.tableCell}>
              PAR
            </TableCell>
            {field.fieldscore.slice(9, 18).map((d, i) =>
              <TableCell key={i} align="center" className={classes.tableCell}>
                {d}
              </TableCell>
            )}
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.tableCell}>
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
    </Paper>
  );
}
