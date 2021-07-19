import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';
import PAGE_TYPE_TABOOLA_MAPPING from './constants/pageTypeTaboolaMapping';

const taboolaLoader = (publisherID, pageType) => (
  `window._taboola = window._taboola || [];
    _taboola.push({${pageType}:'auto'});
    !function (e, f, u, i) {
      if (!document.getElementById(i)){
        e.async = 1;
        e.src = u;
        e.id = i;
        f.parentNode.insertBefore(e, f);
      }
    }(document.createElement('script'),
    document.getElementsByTagName('script')[0],
    '//cdn.taboola.com/libtrc/${publisherID}/loader.js',
    'tb_loader_script');
    if(window.performance && typeof window.performance.mark == 'function')
      {window.performance.mark('tbl_ic');}
  `
);

const taboolaFlusher = () => (
  `
  window._taboola = window._taboola || [];
  _taboola.push({flush: true});
  `
);

@Consumer
class AdTaboola extends Component {
  constructor(props) {
    super(props);

    const { arcSite } = this.props;
    this.publisherID = getProperties(arcSite).taboolaPublisherId;
    const { customFields: { placement, mode, container } = {} } = props;

    this.state = {
      placement,
      mode,
      container,
    };
  }

  componentDidMount() {
    if (!this.canRender()) {
      return;
    }

    this.insertLoader();
    this.insertFlusher();
  }

  appendScript = (name, container, sourceResolver) => {
    const script = document.createElement('script');
    script.id = name;
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = sourceResolver();

    container.appendChild(script);
  }

  canRender() {
    const { placement, mode, container } = this.state;
    return (this.publisherID && placement && mode && container);
  }

  insertLoader() {
    const loader = document.getElementById('tbl-loader');
    if (loader) {
      return;
    }
    const head = document.getElementsByTagName('head')[0];
    if (!head) {
      return;
    }

    const { metaValue } = this.props;

    const pageType = metaValue('page-type');

    const taboolaValue = PAGE_TYPE_TABOOLA_MAPPING[pageType] || '';

    // if taboola value empty falsy string, then do not include script
    if (taboolaValue) {
      this.appendScript('tbl-loader', head, () => taboolaLoader(this.publisherID, pageType));
    }
  }

  insertFlusher() {
    const flusher = document.getElementById('tbl-flusher');
    if (flusher) {
      return;
    }
    const body = document.getElementsByTagName('body')[0];
    if (!body) {
      return;
    }

    this.appendScript('tbl-flusher', body, taboolaFlusher);
  }

  render() {
    if (!this.canRender()) {
      return null;
    }
    const { isAdmin } = this.props;
    const { placement, mode, container } = this.state;

    if (isAdmin) {
      return (
        <>
          <div
            className="tbl-wrapper"
            style={{
              backgroundColor: '#ffefd5',
              padding: '20px',
            }}
          >
            <small>Taboola widget&nbsp;</small>
            <strong>{placement}</strong>
          </div>
          <hr />
        </>
      );
    }

    const scriptString = `
      window._taboola = window._taboola || [];
      _taboola.push({
        mode: '${mode}',
        container: '${container}',
        placement: '${placement}',
        target_type: 'mix'
      });
    `;

    return (
      <>
        <div id={`${container}`} />
        <hr />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: scriptString }} />
      </>
    );
  }
}

AdTaboola.label = 'Taboola Ad – Arc Block';

AdTaboola.propTypes = {
  customFields: PropTypes.shape({
    placement: PropTypes.string.tag({
      label: 'Taboola Placement',
      group: 'Configure Taboola Widget',
    }),
    mode: PropTypes.string.tag({
      label: 'Taboola Mode',
      group: 'Configure Taboola Widget',
    }),
    container: PropTypes.string.tag({
      label: 'Taboola Container',
      group: 'Configure Taboola Widget',
    }),
  }),
};

export default AdTaboola;
