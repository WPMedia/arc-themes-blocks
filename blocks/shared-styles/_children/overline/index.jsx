import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import { formatURL } from '@wpmedia/engine-theme-sdk';
import PrimaryFont from '../primary-font';

import './overline.scss';

const Overline = (props) => {
  const { globalContent: content = {}, arcSite } = useFusionContext();
  const { editableContent } = useEditableContent();
  const {
    customText,
    customUrl,
    editable,
    story,
  } = props;

  let sourceContent = story || {};

  if ((story && !Object.keys(story).length) && Object.prototype.hasOwnProperty.call(content, '_id')) {
    sourceContent = content;
  }

  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText,
  } = (sourceContent.label && sourceContent.label.basic) || {};
  const shouldUseLabel = !!(labelDisplay);

  const {
    _id: sectionUrl,
    name: sectionText,
  } = (sourceContent.websites
    && sourceContent.websites[arcSite]
    && sourceContent.websites[arcSite].website_section) || {};

  const shouldUseProps = !!(customText || customUrl);
  const overlineContent = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];
  const editableContentPath = shouldUseLabel ? 'headlines.basic' : `websites.${arcSite}.website_section.name`;
  const [text, url] = shouldUseProps ? [customText, customUrl] : overlineContent;

  let edit = {};
  if (editable) {
    if (sourceContent._id) {
      edit = { ...editableContent(sourceContent, editableContentPath) };
    }
  }

  const itemProps = {
    ...edit,
    className: 'overline',
    as: 'span',
  };

  if (url) {
    itemProps.href = formatURL(url);
    itemProps.as = 'a';
  }

  return (url || text) ? (
    <PrimaryFont {...itemProps}>
      {text}
    </PrimaryFont>
  ) : null;
};

Overline.label = 'Overline – Arc Block';

Overline.propTypes = {
  customText: PropTypes.string,
  customUrl: PropTypes.string,
};

export default Overline;
