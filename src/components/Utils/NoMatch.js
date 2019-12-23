import React from 'react';
import { Link } from "react-router-dom";
import * as API from './../../api'

export default function NoMatch(props) {

  return (
    <div>
      <h3 style={{ textAlign: 'center', fontSize: 28 , marginTop: 72 }}>
        { API._getWord(props.sess && props.sess.language).No_match_for }
        <code>{window.location.pathname}</code>
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to='/'
          style={{
            textAlign: 'center', fontSize: 24, margin: '24px 0',
            color: '#1e88e5'
          }}>{ API._getWord(props.sess && props.sess.language).Go_to_home }</Link>
      </div>
    </div>
  );
}
