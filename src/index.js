import React from 'react';
import omit from 'lodash.omit';
// eslint-disable-next-line no-unused-vars
import objectAssign from 'object-assign';
import iframeResizer from 'iframe-resizer/js/iframeResizer';

function noop() {}

class ResizerManagedIframe extends React.PureComponent {
  constructor(props) {
    super(props);

    this.callbacks = {
      closeCallback: props.onCloseRequest || noop,
      initCallback: props.onInit || noop,
      messageCallback: props.onMessage || () => console.warn('Unhandled message from iFrame')),
      resizeCallback: props.onResize || noop,
      scrollCallback: props.onScroll || () => true),
    };

    this.omitProps = [
      'children',
      'options',
      'onCloseRequest',
      'onInit',
      'onMessage',
      'onResize',
      'onScroll',
    ];

    this.ref = ref => this.iframeElement = ref;
  }

  componentDidMount() {
    const options = Object.assign({ __mode: 'react' }, this.props.options, this.callbacks);
    this.iframeResizer = iframeResizer(options, this.iframeElement);
  }

  componentWillUnmount() {
    this.iframeResizer.close();
    delete this.iframeResizer;
  }

  render() {
    return (
      <iframe
        {...omit(this.props, this.omitProps)}
        ref={this.ref}
      >
        { this.children }
      </iframe>
    );
  }
}

ResizerManagedIframe.propTypes = {
  children: React.PropTypes.node,
  src: React.PropTypes.string,
  options: React.PropTypes.object,
  onCloseRequest: React.PropTypes.func,
  onInit: React.PropTypes.func,
  onMessage: React.PropTypes.func,
  onResize: React.PropTypes.func,
  onScroll: React.PropTypes.func,
};

ResizerManagedIframe.defaultProps = {
  options: {},
};

export default ResizerManagedIframe;
