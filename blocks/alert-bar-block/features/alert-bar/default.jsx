import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import { CloseIcon } from '@wpmedia/engine-theme-sdk';

import './alert-bar.scss';

const AlertBarSpan = styled.span`
  a {
    font-family: ${(props) => props.primaryFont};
  }
`;

const AlertBar = () => {
  const { arcSite = '', customFields: { refreshIntervals } = {} } = useFusionContext();
  const { content_elements: elements = {} } = useContent({
    source: 'alert-bar-collections',
    query: {
      site: arcSite,
    },
  });
  const [visible, setVisibility] = useState(true);

  // The content source will always return an array with one story in it
  const article = elements[0];
  const { websites = {} } = article;
  const { website_url: websiteURL = '' } = websites[arcSite];

  // Refresh this component by assigning new keys to the encompassing component
  // every interval seconds
  useEffect(() => {
    setInterval(() => {
      useContent({
        source: 'alert-bar-collections',
        query: {
          site: arcSite,
        },
      });
    }, (refreshIntervals ? refreshIntervals * 1000 : 30000));
  }, []);


  return (
    (visible
      ? (
        <nav className="alert-bar">
          <AlertBarSpan primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
            <a href={websiteURL} className="article-link">{article.headlines.basic}</a>
          </AlertBarSpan>
          <button type="button" onClick={() => setVisibility(false)}>
            <CloseIcon className="close" fill="white" />
          </button>
        </nav>
      )
      : null
    )
  );
};

AlertBar.label = 'Alert Bar – Arc Block';

AlertBar.propTypes = {
  customFields: PropTypes.shape({
    refreshIntervals: PropTypes.number.isRequired.tag({
      label: 'Refresh Intervals (in seconds)',
      description: 'This is the frequency at which this feature will refresh. Default is 30 seconds.',
      default: 30,
    }),
  }),
};

export default AlertBar;
