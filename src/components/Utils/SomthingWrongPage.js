import React from 'react'

export default function SomthingWrongPage(props){
  //const { errMsg } = props

  const tempErrMsg = {
    error: 'ReferenceError: asdasdasd is not defined',
    stack: (
      "in App (created by LoadableComponent)\n" +
      "\tin LoadableComponent (created by RenderApp)\n" +
      "\tin Router (created by BrowserRouter)\n" +
      "\tin BrowserRouter (created by RenderApp)\n" +
      "\tin RenderApp\n"
    )
  }

  const errMsg = /localhost/.test(window.location.href) ? tempErrMsg : props.errMsg

  return (
    <div style={{ margin: 64 }}>
      <h1>Something went wrong.</h1>
      <br></br>
      <h1 style={{ whiteSpace: 'pre-wrap' }}>
        {errMsg && errMsg.error && errMsg.error.toString()}
        <br />
        {errMsg && errMsg.stack}
      </h1>
      <div>
        { window.history.length > 1 &&
          <button onClick={()=>console.log('Back')}>Back</button>
        }
        <button onClick={()=>console.log('Home')}>Home</button>
        <button onClick={()=>console.log('Try again')}>Try again</button>
      </div>
    </div>
  );
}
