import React from 'react';

export function LDTopnav() {
  const [ count, setCount ] = React.useState(0);
  const [ delay, setDelay ] = React.useState(1000);
  const [ opacity, setOpacity ] = React.useState(0.01)
  let wd = window.innerWidth
  const fade = {
    transitionProperty: 'all',
    transitionDuration: '.5s',
    transitionTimingFuction: 'ease-in',
    opacity: opacity
  }
  const body = {
    width: '100%',
    height: 64,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    paddingLeft: ( wd > 600 )?24:16,
    paddingRight: ( wd > 600 )?24:16, display: 'flex', position: 'relative', alignItems: 'center'
  }
  const logo = {
    ...fade, backgroundColor: '#ccc', borderRadius: 20,
    height: ( wd > 600 )?40:32,
    width: ( wd > 600 )?40:32,
    marginLeft: ( wd > 600 )?28:0,
    marginRight: ( wd > 600 )?20:12,
  }
  const title = {
    ...fade, display: 'block', marginRight: 8, fontSize: '1.25rem', fontWeight: '500', color: '#ccc'
  }
  const search = {
    ...fade, backgroundColor: '#ccc', borderRadius: 4, height: 35,
    width:
    ( wd > 600 )?184:
    ( wd > 500 )?'50%':'90%',
    marginLeft: ( wd > 600 )?16:8,
    marginRight: 8,
    position: 'relative'
  }
  const login = {
    ...fade, fontSize: '0.875rem', fontWeight: '500', color: '#ccc', padding: '6px 8px', position: 'fixed', right: ( wd > 600 )?26:20
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
    <div style={body}>
      <div style={logo}></div>
      { wd > 500 &&
        <div style={title}>T-off Time</div>
      }
      <div style={search}></div>
      <div style={{ flexGrow: 1 }}></div>
      { wd > 500 &&
        <div style={login}>LOGIN</div>
      }
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
