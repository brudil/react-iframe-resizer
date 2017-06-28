import React, { Component } from 'react';
// npm link from ../, then npm link react-iframe-resizer from the example directory
import ControlledIframe from 'react-iframe-resizer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      useTwoIFrames: false,
    };

    this.handleIframeMessage = (messageData) => {
      this.setState({ messageData, lastAction: 'message' });
      alert(messageData.message);
      this.iframeEl.iFrameResizer.sendMessage('Hello back from parent page');
    };
  }

  render() {
    const { data, lastAction, useTwoIFrames } = this.state;
    return (
      <div className="App">
      <h2>Automagically resizing iFrame</h2>
      <p>Resize window or click one of the links in the iFrame to watch it resize. Or try with <button onClick={() => this.setState({ useTwoIFrames: !useTwoIFrames})}>{useTwoIFrames ? 'single iframe' : 'two iframes'}</button>.</p>
      <div style={{ margin: '20px' }}>
        <ControlledIframe
          className="frame"
          id="ControlledFrame-One"
          frameBorder={0}
          src="/frame.content.html"
          ref={ref => (this.iframeEl = ref)}
          options={{
            log: true,
            inPageLinks: true,
          }}
          onResize={(messageData) => this.setState({ messageData, lastAction: 'resize' })}
          onMessage={this.handleIframeMessage}
          onClose={id => this.setState({ data: id, lastAction: 'close' })}
        ></ControlledIframe>

        {useTwoIFrames ? <ControlledIframe
          className="frame"
          id="ControlledFrame-Two"
          frameBorder={0}
          src="/frame.content.html"
          ref={ref => (this.iframeEl = ref)}
          options={{
            log: true,
            inPageLinks: true,
          }}
          onResize={(messageData) => this.setState({ messageData, lastAction: 'resize' })}
          onMessage={this.handleIframeMessage}
          onClose={id => this.setState({ data: id, lastAction: 'close' })}
        ></ControlledIframe> : null}

      </div>
      <p>
        {lastAction === 'resize' ? <div>
          <b>Frame ID:</b> {data.iframe.id}
          <b>Height:</b> {data.height}
          <b>Width:</b> {data.width}
          <b>Event type:</b> {data.type}
        </div> : null}
        {lastAction === 'message' ? <div>
          <b>Frame ID:</b> {data.iframe.id}
          <b>Message:</b> {data.message}
        </div> : null}
        {lastAction === 'close' ? <div>
          <b>IFrame (:</b> {data}<b>) removed from page.</b>
        </div> : null}
      </p>
      <div style={{ margin: '8px 0', fontSize: '13px' }}>
        For details on how this works, see
        <a href="http://davidjbradshaw.github.io/iframe-resizer/">http://davidjbradshaw.github.io/iframe-resizer/</a>.
      </div>

      </div>
    );
  }
}

export default App;
