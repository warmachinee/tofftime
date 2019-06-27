import React from 'react';

function MainPage(props) {
  return (
    <div>
      <h3 style={{ textAlign: 'center', fontSize: 28 , margin: '72px 0'}}>
        No match for
        <code>{props.location.pathname}</code>
      </h3>
    </div>
  );
}

export default MainPage;
