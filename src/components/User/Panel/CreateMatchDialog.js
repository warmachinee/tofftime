import React from 'react';
import Loadable from 'react-loadable';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const MatchStepper = Loadable({
  loader: () => import(/* webpackChunkName: "MatchStepper" */ './Match/MatchStepper'),
  loading: () => null
});

import {
  Paper,

} from '@material-ui/core'

import {
  Person,

} from '@material-ui/icons';

export default function CreateMatchDialog(props) {
  const { API, sess } = props

  return (
    <div style={{
        position: 'relative',
        padding: '8px 16px',
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
      <LabelText text={ API._getWord(sess && sess.language).Create_Match } />
      <MatchStepper {...props} />
    </div>
  );
}
