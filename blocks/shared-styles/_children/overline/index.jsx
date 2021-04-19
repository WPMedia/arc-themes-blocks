import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import PrimaryFont from '../primary-font';

import './overline.scss';

function getLocation(uri) {
  let url;
  if (typeof window === 'undefined') {
    url = new URL(uri, 'http://example.com');
  } else {
    url = document.createElement('a');
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    url.href = uri;
    if (url.host === '') {
      url.href = `${url.href}`;
    }
  }
  return url;
}

function fixTrailingSlash(item) {
  const url = getLocation(item);

  if (url.hash || url.search || url.pathname.match(/\./)) {
    return item;
  }

  if (item[item.length - 1] !== '/') {
    return `${item}/`;
  }
  return item;
}

const Overline = (props) => {
  const { globalContent: content = {}, arcSite } = useFusionContext();
  const { editableContent } = useEditableContent();
  const {
    customText,
    customUrl,
    editable,
    story,
  } = props;
  const sourceContent = story || (Object.prototype.hasOwnProperty.call(content, '_id') && content) || {};

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
  const useGlobalContent = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];
  const editableContentPath = shouldUseLabel ? 'headlines.basic' : `websites.${arcSite}.website_section.name`;
  const [text, url] = shouldUseProps ? [customText, customUrl] : useGlobalContent;

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
    itemProps.href = fixTrailingSlash(url);
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
