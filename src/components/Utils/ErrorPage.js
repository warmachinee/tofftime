import React from 'react';
import { Link } from "react-router-dom";

function ErrorPage(props) {

  return (
    <div>
      <h3 style={{ textAlign: 'center', fontSize: 28 , marginTop: 72 }}>
        Something went wrong! Please try again.
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to='/'
          style={{
            textAlign: 'center', fontSize: 24, margin: '24px 0',
            color: '#1e88e5'
          }}>Go to home</Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to='/'
          style={{
            textAlign: 'center', fontSize: 24, margin: '24px 0',
            color: '#1e88e5'
          }}>Go back</Link>
      </div>
    </div>
  );
}

export default NoMatch;
