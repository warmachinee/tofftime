import React from 'react'
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import { LDCircular } from './../loading/LDCircular'
import * as API from './../../api'

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../Utils/LabelText'),
  loading: () => <LDCircular />
});

const SimulatorInput = Loadable({
  loader: () => import(/* webpackChunkName: "SimulatorInput" */'./SimulatorInput'),
  loading: () => <LDCircular />
});

const StatisticsTable = Loadable({
  loader: () => import(/* webpackChunkName: "StatisticsTable" */'./StatisticsTable'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {

  },
  grid: {
    padding: 12,
    maxWidth: 900
  },

}))

export default function Simulator(props){
  const classes = useStyles();
  const {
    sess, token, setCSRFToken, handleSnackBar,
  } = props
  const [ simulatorData, setSimulatorData ] = React.useState(null)

  const passingFunction = {
    ...props,
    handleFetchSimulator: handleFetchSimulator,
    simulatorData: simulatorData,

  }

  async function handleFetchSimulator(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadsimulator', {
        action: 'list'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log(d);
      setSimulatorData(d)
    })
  }

  React.useEffect(()=>{
    handleFetchSimulator()
  },[ ])

  return(
    <div>
      <LabelText text={ API._getWord(sess && sess.language).Simulator } />
      <div className={classes.grid}>
        <SimulatorInput {...passingFunction} />
        <StatisticsTable {...passingFunction} />
      </div>
    </div>
  );
}
