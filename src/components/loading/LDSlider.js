import React from 'react';

export function LDSlider() {
  const [ count, setCount ] = React.useState(0);
  const [ delay, setDelay ] = React.useState(1000);
  const [ opacity, setOpacity ] = React.useState(0.01)
  const [ width, setWidth ] = React.useState(0)

  let wd = window.innerWidth

  const root = {
    width: '100%',
    position: 'relative'
  }

  const fade = {
    transitionProperty: 'all',
    transitionDuration: '.5s',
    transitionTimingFuction: 'ease-in',
    opacity: opacity
  }

  const fade2 = {
    transitionProperty: 'all',
    transitionDuration: '.3s',
    transitionTimingFuction: 'ease-in',
    width: width,
    opacity: opacity
  }

  const body = {
    width: '100%',
    height: window.innerWidth * .45,
    maxHeight: 450,
  }

  const left = {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: '#bbb',
    left: '2%',
    top: '40%',
    position: 'absolute',
    zIndex: '10',
  }

  const right = {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: '#bbb',
    right: '2%',
    top: '40%',
    position: 'absolute',
    zIndex: '10',
  }

  const label = {
    height: 56,
    background: '#bbb',
    bottom: 0,
    position: 'absolute',
    zIndex: '10',
  }

  useInterval(() => {
    if(count % 2 === 0){
      setOpacity(1)
      setWidth('100%')
    }else{
      setOpacity(0.01)
      setWidth(0)
    }
    setCount(count + 1);
  }, delay);

  return (
    <div style={root}>
      <div style={body}></div>
      <div style={{...fade, ...left, transitionDelay: '.1s'}}></div>
      <div style={{...fade, ...right, transitionDelay: '.1s'}}></div>
      <div style={{...fade2, ...label, transitionDelay: '.3s'}}></div>
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
