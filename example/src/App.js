import React, { Component } from 'react';
// npm link from ../, then npm link react-iframe-resizer from the example directory
import ControlledIframe from 'react-iframe-resizer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlledIframe
          className="frame"
          id="ControlledFrame-One"
          frameBorder={0}
          src="/frame-content-static.html"
          options={{ log: true }}
        >iframes not supported</ControlledIframe>
        <ControlledIframe
          className="frame"
          id="ControlledFrame-Two"
          frameBorder={0}
          src="/frame-content-dynamic.html"
          options={{ log: true }}
        >iframes not supported</ControlledIframe>
        <h1>Content beneath iframes</h1>
      </div>
    );
  }
}

export default App;
