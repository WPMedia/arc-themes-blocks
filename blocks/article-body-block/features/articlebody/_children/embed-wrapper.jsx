/* eslint react/destructuring-assignment: "off", react/no-unused-prop-types: "off" */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import htmlparser from 'htmlparser2';
import HtmlSafe from '../../../../_shared/partials/html-safe';

class EmbedWrapper extends PureComponent {
  constructor(props) {
    super(props);
    if (!props.src) {
      // don't have a defined endpoint so we need to parse the html
      let inScript = false;
      let src = '';
      let script = '';

      const parser = new htmlparser.Parser({
        onopentag(tag, attribs) {
          if (tag !== 'script') return;
          ({ src } = attribs);
          if (!src) inScript = true;
        },
        ontext(text) {
          if (!inScript) return;
          script = text;
        },
        onclosetag(tag) {
          if (tag !== 'script') return;
          inScript = false;
        },
      });

      parser.write(this.props.html);
      parser.end();
      if (src) this.scriptSrc = src;
      if (script) this.scriptText = script;
    }
  }

  componentDidMount() {
    const src = this.props.src || this.scriptSrc;
    if (src) {
      // if the endpoint is more than 1024 char, something is wrong
      const type = `src-${src}`.substring(0, 1024);
      if (window[type]) return;
      window[type] = true;
    }

    if (this.scriptText) {
      const scriptWithCode = document.createElement('script');
      scriptWithCode.text = this.scriptText;
      document.getElementsByTagName('body')[0].appendChild(scriptWithCode);
    }

    if (src) {
      const scriptWithUri = document.createElement('script');
      scriptWithUri.async = true;
      scriptWithUri.src = src;
      document.getElementsByTagName('body')[0].appendChild(scriptWithUri);
    }
  }

  render() {
    if (this.props.render) return this.props.render();
    return (
      <HtmlSafe
        compType="div"
        className="width_full center_align"
        content={this.props.html}
        allowedAttributes={false}
      />
    );
  }
}

EmbedWrapper.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
  element: PropTypes.object,
};

export default EmbedWrapper;
