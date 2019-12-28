import React from 'react'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../api'
import { primary, grey, red, green } from './../../api/palette'
import * as BTN from './../Button'

import {
  Button,
  TextField,
  Typography,
  Divider,
  Box,

} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  scorcardLabel: {
    borderLeft: `6px solid ${primary[600]}`,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  textfield: {
    margin: 8,
    minWidth: 64
  },
  textfieldGrid: {
    display: 'flex',
  },
  text: {
    color: primary[600],
  },
  textHighlight: {
    color: primary[900],
    fontWeight: 800
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end' ,
    margin: theme.spacing(2, 0)
  },
  button: {
    padding: theme.spacing(1, 3)
  },

}))

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function ScoreInput(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, arrScore, setArrScore, handleFetchSave, handleFetchEdit, editingData } = props
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

  async function handleChange(value, index){
    if(value < 0){
      handleSnackBar({
        state: true,
        message: 'Score must more than 0',
        variant: 'error',
        autoHideDuration: 5000
      })
      await setScore(0, index)
    }else{
      await setScore(value, index)
    }
  }

  function setScore(value, index){
    return new Promise(resolve => {
      const tempArr = [...arrScore]
      if(value === ''){
        tempArr[index] = parseInt(0)
      }else{
        tempArr[index] = parseInt(value)
      }
      setArrScore(tempArr)
      resolve();
    });
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      if(arrScore.some(s => s === 0)){
        handleSnackBar({
          state: true,
          message: 'Please complete',
          variant: 'error',
          autoHideDuration: 5000
        })
      }else{
        if(editingData){
          handleFetchEdit()
        }else{
          handleFetchSave()
        }
      }
    }
  }

  function handleFocus(e){
    e.target.select()
  }

  return(
    <div>
      <ThemeProvider theme={theme}>
        <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Typography variant="h5" className={classes.scorcardLabel}>
            { API._getWord(sess && sess.language).Scorecard_MBSE }
          </Typography>
        </div>
        <div style={{
            overflow: 'auto', marginTop: 24, marginBottom: 24,
            width: '100%',
          }}>
          <div className={classes.textfieldGrid}>
            {tempArr.slice(0, 9).map( d =>
              <TextField
                key={d}
                className={classes.textfield}
                label={d + 1}
                value={arrScore[d] || ''}
                onChange={e =>handleChange(e.target.value, d)}
                onFocus={e => handleFocus(e)}
                onKeyPress={e =>handleKeyPress(e)}
                variant="outlined"
                type="number"
              />
            )}
          </div>
          <div className={classes.textfieldGrid}>
            {tempArr.slice(9, 18).map( d =>
              <TextField
                key={d}
                className={classes.textfield}
                label={d + 1}
                value={arrScore[d] || ''}
                onChange={e =>handleChange(e.target.value, d)}
                onFocus={e => handleFocus(e)}
                onKeyPress={e =>handleKeyPress(e)}
                variant="outlined"
                type="number"
              />
            )}
          </div>
        </div>
      </ThemeProvider>
      <Typography component="div" style={{ display: 'flex' }}>
        <Box className={classes.text} m={1}>
          OUT = {API._handleHoleSum(arrScore, 'out')}
        </Box>
        <Box className={classes.text} m={1}>
          IN = {API._handleHoleSum(arrScore, 'in')}
        </Box>
        <div style={{ flex: 1 }} />
        <Box className={classes.textHighlight} m={1}>
          Total = {API._handleHoleSum(arrScore, 'out') + API._handleHoleSum(arrScore, 'in')}
        </Box>
      </Typography>
      <div className={classes.controls}>
        <Button className={classes.button} onClick={()=>setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])}>
          { API._getWord(sess && sess.language).Reset }
        </Button>
      </div>
      <Divider style={{ marginTop: 24 , marginBottom: 24 }} />
    </div>
  );
}
