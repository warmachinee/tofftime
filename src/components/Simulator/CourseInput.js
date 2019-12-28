import React from 'react'
import Loadable from 'react-loadable';
import { LDCircular } from './../loading/LDCircular'
import { primary, grey, } from './../../api/palette'

const Location = Loadable({
  loader: () => import(/* webpackChunkName: "Location" */'./../SystemAdmin/Course/Location'),
  loading: () => <LDCircular />
});

export default function CourseInput(props){

  React.useEffect(()=>{

  },[ ])

  return(
    <div
      style={{
        padding: 8, marginLeft: 'auto', marginRight: 'auto', maxWidth: 700,
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      }}>
      <Location {...props} />
    </div>
  );
}
