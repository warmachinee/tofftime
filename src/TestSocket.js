import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

class TestSocket extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      message: [],
      endpoint: "https://thai-pga.com"
    }
  }

  componentDidMount = () => {
    this.response()
  }

  send = (message) => {
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    socket.emit('client-message', {
      action: "scorebysystemadmin",
      matchid: 92778945,
      userid: 767936,
      userscore: [input,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,input],
    })
    this.setState({ input: '' })
  }

  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('server-message', (messageNew) => {
      console.log(messageNew);
      this.setState({ message: messageNew })
    })
  }

  changeInput = (e) => {
    this.setState({ input: parseInt(e.target.value) })
  }

  render() {
    const { input, message } = this.state
    return (
      <div>
        <div style={style}>
          <input value={input} onChange={this.changeInput} />
          <button onClick={() => this.send()}>Send</button>
          {message && message.result &&
            message.result.filter((d)=>{
              return d.userid === 767936
            }).map( d=>
              <React.Fragment key={d.userid}>
                <div>{d.firstname}{d.lastname}({d.userid})</div>
                {d.score.map( (d,i)=>
                  <div key={i}>
                    {d}
                  </div>
                )}
              </React.Fragment>
            )
          }
        </div>
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default TestSocket
