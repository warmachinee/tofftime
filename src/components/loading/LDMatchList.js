import React from 'react';

export function LDMatchList(){
  const root = {
    maxWidth: 1200,
    position: 'relative',
    margin: '0 auto',
    borderRadius: 2,
    backgroundColor: 'white',
    borderTop: '1px solid #e1e1e1',
    borderBottom: '1px solid #e1e1e1',
  }
  const title = {
    marginTop: 32,
    padding: '0 5%',
    color: "#ccc",
    fontWeight: 600,
    fontSize: 32,
    fontVariant: 'petite-caps'
  }
  return(
    <div className={root}>
      <h4 style={title}>
        Match List
      </h4>
      <LDMatchCard />
    </div>
  );
}
function LDMatchCard() {
  const [ count, setCount ] = React.useState(0);
  const [ delay, setDelay ] = React.useState(1000);
  const [ opacity, setOpacity ] = React.useState(0.01)

  const style = {
    backgroundColor: '#CCC', margin: '8px 0',
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

  const render = (
    <div
      style={{
        maxWidth: 345, height: 375,
        marginLeft: 'auto', marginRight: 'auto', marginTop: 32, marginBottom: 32,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      }}>
      <div style={{ padding: 16 }}>
        <div style={{ ...style, height: 32, width: '100%', transitionDelay: '0s' }}></div>
        <div style={{ ...style, height: 24, width: '30%', transitionDelay: '.1s' }}></div>
      </div>
      <div style={{ ...style, height: 140, width: '100%', margin: 0, transitionDelay: '.2s' }}></div>
      <div style={{ padding: 16 }}>
        <div style={{ ...style, height: 24, width: '40%', marginBottom: 16, transitionDelay: '.3s' }}></div>
        <div style={{ ...style, height: 14, width: '100%', transitionDelay: '.4s' }}></div>
      </div>
    </div>
  )
  const renderMobile = (
    <div
      style={{
        maxWidth: 345, height: 280,
        marginLeft: 'auto', marginRight: 'auto', marginTop: 32, marginBottom: 32,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      }}>
      <div style={{ ...style, height: 140, width: '100%', margin: 0, transitionDelay: '0s' }}></div>
      <div style={{ padding: 16, paddingBottom: 0 }}>
        <div style={{ ...style, height: 32, width: '70%', marginBottom: 16, transitionDelay: '.1s' }}></div>
      </div>
      <div style={{ display: 'flex', padding: 8 }}>
        <div style={{ ...style, height: 24, width: '30%', margin: 8 , transitionDelay: '.2s' }}></div>
        <div style={{ flex: 1 }}></div>
        <div style={{ ...style, height: 24, width: 24, borderRadius: 12, margin: 12 , transitionDelay: '.3s' }}></div>
      </div>
    </div>
  )
  if(window.innerWidth < 500){
    return (
      <React.Fragment>
        {renderMobile}
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        {render}
      </React.Fragment>
    );
  }
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
