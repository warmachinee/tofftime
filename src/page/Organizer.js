import React from 'react';
import Loadable from 'react-loadable';


const Announce = Loadable({
  loader: () => import(/* webpackChunkName: "Announce" */ './../components/Announce/Announce'),
  loading: () => null
});

export default function Organizer(props) {
  const { sess } = props

  return (
    <React.Fragment>

    </React.Fragment>
  );
}
