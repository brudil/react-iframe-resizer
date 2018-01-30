import React from 'react';
import omit from 'lodash.omit';
// @ts-ignore
import iframeResizer from 'iframe-resizer/js/iframeResizer';

export interface IProps {
  options?: any;
  id: string;
  src: string;
}

class ResizerManagedIframe extends React.Component<IProps> {
  private iframeResizer: any;
  private iframeElement: any;

  componentDidMount() {
    this.iframeResizer = iframeResizer(this.props.options, this.iframeElement);
  }

  componentWillUnmount() {
    this.iframeResizer.close();
  }

  render() {
    return (
      <iframe
        {...omit(this.props, ['children', 'options']) }
        ref={ref => {
          this.iframeElement = ref;
        }}
      >{this.props.children}</iframe>
    );
  }
}

export default ResizerManagedIframe;
