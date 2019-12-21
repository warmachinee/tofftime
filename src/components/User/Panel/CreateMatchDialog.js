import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary } from './../../../api/palette'

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
  FormControlLabel,
  Switch,

} from '@material-ui/core'

import {
  Person,

} from '@material-ui/icons';

const StyledSwitch = withStyles({
  switchBase: {
    color: primary[300],
    '&$checked': {
      color: primary[500],
    },
    '&$checked + $track': {
      backgroundColor: primary[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function CreateMatchDialog(props) {
  const { API, sess, pageOrganizer } = props
  const [ isCreateAfterDone, setIsCreateAfterDone ] = React.useState(true)
  const [ swtichCreateAfterDone, setSwtichCreateAfterDone ] = React.useState(true)

  return (
    <div style={{
        position: 'relative',
        padding: '0 16px',
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: 900,
      }}>
      <LabelText text={ API._getWord(sess && sess.language).Create_Match } paddingTop={0} />
      { pageOrganizer &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <StyledSwitch checked={isCreateAfterDone} onChange={e =>setIsCreateAfterDone(e.target.checked)} />
            }
            label={ API._getWord(sess && sess.language)['Add to your group after create.'] }
          />
        </div>
      }
      <MatchStepper
        {...props}
        {...(pageOrganizer && {
          isCreateAfterDone: isCreateAfterDone,
          swtichCreateAfterDone: true
        })} />
    </div>
  );
}
