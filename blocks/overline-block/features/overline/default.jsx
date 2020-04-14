
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import getThemeStyle from 'fusion:themes';
import './overline.scss';

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const Overline = (props) => {
  const { globalContent: content = {}, arcSite } = useFusionContext();
  const { editableContent } = useEditableContent();
  const { customText, customUrl, editable } = props;

  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText,
  } = (content.label && content.label.basic) || {};
  const shouldUseLabel = !!(labelDisplay);

  const {
    _id: sectionUrl,
    name: sectionText,
  } = (content.websites
    && content.websites[arcSite]
    && content.websites[arcSite].website_section) || {};

  const shouldUseProps = !!((customText && customUrl));
  const useGlobalContent = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];

  const [text, url] = shouldUseProps ? [customText, customUrl] : useGlobalContent;
  const edit = editable ? { ...editableContent(content, text) } : {};

  return text
    ? (
      <StyledLink
        href={url}
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
        {...edit}
        suppressContentEditableWarning
      >
        {text}
      </StyledLink>
    )
    : null;
};

Overline.label = 'Overline – Arc Block';

Overline.propTypes = {
  customText: PropTypes.string,
  customUrl: PropTypes.string,
};

export default Overline;
