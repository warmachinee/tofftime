import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  button: {
    padding: '12px 8px'
  }
}));

export default function CreateLocation(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, setPageState } = props
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ location, setLocation ] = React.useState('')
  const [ holeScore, setHoleScore ] = React.useState([])
  const [ hcpScore, setHCPScore ] = React.useState([])

  function handleHole(value, index){
    const newArr = [...holeScore]
    newArr[index] = parseInt(value)
    setHoleScore(newArr)
  }

  function handleHCP(value, index){
    const newArr = [...holeScore]
    newArr[index] = parseInt(value)
    setHCPScore(newArr)
  }

  async function handleCreate(){
    await API.xhrPost(
      props.token,
      'fieldsystem', {
        action: 'createcustom',
        fieldname: location,
        fieldscore: holeScore,
        hcfieldscore: hcpScore
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error'
      })
      setPageState('select')
    })
  }

  return(
    <div className={classes.root}>
      <div>
        <TextField
          fullWidth
          label="Location name"
          value={location || ''}
          onChange={e =>setLocation(e.target.value)}
          variant="outlined"
        />
      </div>
      <div style={{ marginTop: 16, }}>Hole Score</div>
      <div style={{ marginTop: 8, display: 'flex' }}>
        { tempArr.slice(0,9).map( d=>
          <TextField
            key={d}
            label={d + 1}
            variant="outlined"
            onChange={e =>handleHole(e.target.value, d)}
          />
        )}
      </div>
      <div style={{ display: 'flex' }}>
        { tempArr.slice(9,18).map( d=>
          <TextField
            key={d}
            label={d + 1}
            variant="outlined"
            onChange={e =>handleHole(e.target.value, d)}
          />
        )}
      </div>
      <div style={{ marginTop: 16, }}>HCP Score</div>
      <div style={{ marginTop: 8, display: 'flex' }}>
        { tempArr.slice(0,9).map( d=>
          <TextField
            key={d}
            label={d + 1}
            variant="outlined"
            onChange={e =>handleHCP(e.target.value, d)}
          />
        )}
      </div>
      <div style={{ display: 'flex' }}>
        { tempArr.slice(9,18).map( d=>
          <TextField
            key={d}
            label={d + 1}
            variant="outlined"
            onChange={e =>handleHCP(e.target.value, d)}
          />
        )}
      </div>
      <div style={{ display: 'flex', marginTop: 24 }}>
        <div style={{ flex: 2 }}></div>
        <Button fullWidth className={classes.button}>Cancel</Button>
        <Button fullWidth variant="contained" color="primary" className={classes.button}
          onClick={handleCreate}>Create</Button>
      </div>

    </div>
  );
}
