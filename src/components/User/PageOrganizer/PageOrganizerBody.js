import React from 'react';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import { primary } from './../../../api/palette'

import {
  FormControlLabel,
  Switch,

} from '@material-ui/core';

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

const PageOrganizerOverview = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerOverview" */ './PageOrganizerOverview'),
  loading: () => null
});

const PageOrganizerSetAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerSetAdmin" */ './PageOrganizerSetAdmin'),
  loading: () => null
});

const PageOrganizerCreatePost = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerCreatePost" */ './PageOrganizerCreatePost'),
  loading: () => null
});

const OrganizerAnnounce = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerAnnounce" */ './../../Organizer/OrganizerAnnounce'),
  loading: () => null
});

const OrganizerMatchList = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerMatchList" */ './../../Organizer/OrganizerMatchList'),
  loading: () => null
});

const OrganizerPost = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerPost" */ './../../Organizer/OrganizerPost'),
  loading: () => null
});

const MatchStepper = Loadable({
  loader: () => import(/* webpackChunkName: "MatchStepper" */ './../Panel/Match/MatchStepper'),
  loading: () => null
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../../Utils/LabelText'),
  loading: () => null
});

export default function PageOrganizerBody(props) {
  const { API, sess, token, setCSRFToken, handleSnackBar, pageData } = props
  const [ dialog, setDialog ] = React.useState({
    createMatch: false,
    createPost: false,
    setAdmin: false
  })
  const [ isCreateAfterDone, setIsCreateAfterDone ] = React.useState(true)

  const passingProps = {
    ...props,
    dialog: dialog,
    dialogOpen: dialogOpen,
    dialogCloseAll: dialogCloseAll,
    ...(pageData) && { pageid: pageData.pageid  }
  }

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function dialogCloseAll(){
    setDialog({
      createMatch: false,
      createPost: false,
      setAdmin: false
    })
  }

  return (
    <React.Fragment>
      <PageOrganizerOverview {...passingProps} />
      <TemplateDialog maxWidth="md" open={dialog.createMatch} handleClose={()=>dialogClose('createMatch')}>
        <LabelText text={ API._getWord(sess && sess.language).Create_Match } />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <StyledSwitch checked={isCreateAfterDone} onChange={e =>setIsCreateAfterDone(e.target.checked)} />
            }
            label={ API._getWord(sess && sess.language)['Add to your page after create.'] }
          />
        </div>
        <MatchStepper {...passingProps} isCreateAfterDone={isCreateAfterDone} />
      </TemplateDialog>
      <div style={{ padding: 12, position: 'relative', boxSizing: 'border-box' }}>
        <OrganizerAnnounce {...passingProps} />
        <OrganizerMatchList {...passingProps} />
        <OrganizerPost {...passingProps} />
      </div>
      <PageOrganizerSetAdmin
        {...passingProps} />
      <PageOrganizerCreatePost
        {...passingProps} />
    </React.Fragment>
  );
}
