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

function Banner1(props){

  return (
    <a
      href="mailto:support@tofftime.com"
      style={{ textDecoration: 'none' }}
      target="_blank">
      <div
        id="main-banner"
        style={{ maxWidth: 1200, maxHeight: 268, marginTop: 16, marginBottom: 16, marginLeft: 'auto', marginRight: 'auto', textDecoration: 'none' }}>
        <img
          style={{
            width: '100%',
            color: 'black',
            backgroundColor: props.COLOR.grey[300],
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          src={`https://${props.API._webURL()}/system/ads/ads.png`} />
      </div>
    </a>
  );
}

function MainPage(props) {
  const { sess } = props

  return (
    <React.Fragment>
      <Announce {...props} />
      <Banner1 {...props} />
      <MatchList {...props} />
      <OrganizerList {...props} />
      <News {...props} />

    </React.Fragment>
  );
}

export default MainPage;
