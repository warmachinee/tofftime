import React from 'react';
import Loadable from 'react-loadable';

import NewsCardSkeleton from './../components/News/NewsCardSkeleton'

const Announce = Loadable({
  loader: () => import(/* webpackChunkName: "Announce" */ './../components/Announce/Announce'),
  loading: () => null
});

const News = Loadable({
  loader: () => import(/* webpackChunkName: "News" */ './../components/News/News'),
  loading: () => Array.from(new Array(3)).map((d, i) => <NewsCardSkeleton key={i} />)
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */ './../components/Match/MatchList'),
  loading: () => null
});

const OrganizerList = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerList" */ './../components/Organizer/OrganizerList'),
  loading: () => null
});

function MainPage(props) {
  const { sess } = props

  return (
    <React.Fragment>
      <Announce {...props} />
      <MatchList {...props} />
      <OrganizerList {...props} />
      <News {...props} />

    </React.Fragment>
  );
}

export default MainPage;
