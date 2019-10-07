import React from 'react';
import Loadable from 'react-loadable';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../LabelText'),
  loading: () => null
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../TemplateDialog'),
  loading: () => null
});

const MatchStepper = Loadable({
  loader: () => import(/* webpackChunkName: "MatchStepper" */ './Match/MatchStepper'),
  loading: () => null
});

import {
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Menu,

} from '@material-ui/core'

import {
  Person,

} from '@material-ui/icons';

export default function CreateMatchDialog(props) {
  const { sess, createMatchState, toggleCreateMatch } = props

  return (
    <TemplateDialog open={createMatchState} handleClose={toggleCreateMatch} maxWidth={700}>
      <div>
        <LabelText text={ ( sess && sess.language === 'TH' ) ? "สร้างการแข่งขัน" : 'Create Match' } />
        <MatchStepper {...props} dialogStepper/>
      </div>
    </TemplateDialog>
  );
}
