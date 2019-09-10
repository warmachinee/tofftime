import React from 'react';
import Loadable from 'react-loadable';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../TemplateDialog'),
  loading: () => null
});

const UpcomingList = Loadable({
  loader: () => import(/* webpackChunkName: "UpcomingList" */ './UpcomingList'),
  loading: () => null
});

export default function UpcomingDialog(props) {
  const { upcomingState, toggleUpcoming } = props

  return (
    <TemplateDialog open={upcomingState} handleClose={toggleUpcoming} fullScreen>
      <div>
        <UpcomingList {...props} />
      </div>
    </TemplateDialog>
  );
}
