import React from 'react';
import Loadable from 'react-loadable';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../TemplateDialog'),
  loading: () => null
});

const History = Loadable({
  loader: () => import(/* webpackChunkName: "History" */ './History'),
  loading: () => null
});

export default function HistoryDialog(props) {
  const { historyState, toggleHistory } = props

  return (
    <TemplateDialog open={historyState} handleClose={toggleHistory} fullScreen>
      <div>
        <History {...props} />
      </div>
    </TemplateDialog>
  );
}
