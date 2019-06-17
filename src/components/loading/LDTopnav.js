import React from 'react';

export function LDTopnav() {
  const [ count, setCount ] = React.useState(0);
  const [ delay, setDelay ] = React.useState(1000);
  const [ opacity, setOpacity ] = React.useState(0.01)

  const fade = {
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
    <div
      style={{
        width: '100%',
        height: 64,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        paddingLeft: 24, paddingRight: 24, display: 'flex', position: 'relative', alignItems: 'center'
      }}>
      <div style={{ ...fade, backgroundColor: '#ccc', borderRadius: 20, height: 40, width: 40, marginLeft: 28, marginRight: 20, }}></div>
      <div style={{ ...fade, display: 'block', marginRight: 8, fontSize: '1.25rem', fontWeight: '500', color: '#ccc' }}>T-off Time</div>
      <div style={{ ...fade, backgroundColor: '#ccc', borderRadius: 4, height: 35, width: 184, marginLeft: 16, marginRight: 8, }}></div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ ...fade, fontSize: '0.875rem', fontWeight: '500', color: '#ccc', padding: '6px 8px', position: 'fixed', right: 26 }}>LOGIN</div>
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
