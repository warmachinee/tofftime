import React from 'react';

export function LDSlider() {
  const [ count, setCount ] = React.useState(0);
  const [ delay, setDelay ] = React.useState(1000);
  const [ opacity, setOpacity ] = React.useState(0.01)
  let wd = window.innerWidth

  const body = {
    width: '100%',
    height:
    (wd >= 1000)?400:
    (wd >= 900)?350:
    (wd >= 750)?300:
    (wd >= 600)?350:
    (wd >= 500)?300:250,
    background: '#ccc',
    transitionProperty: 'all',
    transitionDuration: '.5s',
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
    <div style={body}></div>
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
