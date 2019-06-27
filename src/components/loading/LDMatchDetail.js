import React from 'react';

export function LDMatchDetail() {
  const [ count, setCount ] = React.useState(0);
  const [ delay, setDelay ] = React.useState(1000);
  const [ opacity, setOpacity ] = React.useState(0.01)
  let wd = window.innerWidth

  const grid = {
    padding: '24px 16px',
  }

  const body = {
    width: '100%',
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    background: '#ccc',
    height: '50vh',
    transitionProperty: 'all',
    transitionDuration: '.7s',
    transitionTimingFuction: 'ease-in',
    opacity: opacity
  }

  useInterval(() => {
    if(count % 2 === 0){
      setOpacity(1)
    }else{
      setOpacity(0.01)
    }
    setCount(count + 1);
  }, delay);

  return (
    <div style={grid}>
      <div style={body}></div>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
