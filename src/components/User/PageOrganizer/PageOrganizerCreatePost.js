import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../../Utils/LabelText'),
  loading: () => null
});

const PageOrganizerPostEditor = Loadable({
  loader: () => import(/* webpackChunkName: "PageOrganizerPostEditor" */ './PageOrganizerPostEditor'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {

  },

}));

export default function PageOrganizerCreatePost(props) {
  const classes = useStyles();
  const { API, sess, BTN, token, setCSRFToken, handleSnackBar } = props
  const [ selectedTypePost, setSelectedTypePost ] = React.useState('post')

  return (
    <TemplateDialog maxWidth={selectedTypePost === 'match' ? "md" : "sm"}
      open={props.dialog.createPost} handleClose={props.dialogCloseAll} elementId="create-post-dialog">
      <div className={classes.root}>
        <LabelText text={ API._getWord(sess && sess.language).Create_post } />
        <PageOrganizerPostEditor {...props}
          handleCloseEditor={props.dialogCloseAll}
          selectedTypePost={selectedTypePost}
          setSelectedTypePost={setSelectedTypePost} />
      </div>
    </TemplateDialog>
  );
}
