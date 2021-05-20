import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { formatURL } from '@wpmedia/engine-theme-sdk';
import PrimaryFont from '../primary-font';

import './overline.scss';

const Overline = (props) => {
  const { globalContent, arcSite } = useFusionContext();
  const { editableContent } = useEditableContent();
  const phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');
  const {
    customText,
    customUrl,
    editable,
    story,
    className = '',
  } = props;

  const sourceContent = story || globalContent || {};

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
  const editableContentPath = shouldUseLabel ? 'headlines.basic' : `websites.${arcSite}.website_section.name`;

  // Default to websites object data
  let [text, url] = [sectionText, sectionUrl];

  if (sourceContent?.owner?.sponsored) {
    text = sourceContent?.label?.basic || phrases.t('overline.sponsored-content');
    url = null;
  } else if (shouldUseProps) {
    text = customText;
    url = customUrl;
  } else if (shouldUseLabel) {
    [text, url] = [labelText, labelUrl];
  }

  let edit = {};
  if (editable) {
    if (sourceContent._id) {
      edit = { ...editableContent(sourceContent, editableContentPath) };
    }
  }

  const classNames = ['overline'];
  const itemProps = {
    ...edit,
    as: 'span',
  };

  if (url) {
    itemProps.href = formatURL(url);
    itemProps.as = 'a';
    classNames.push('overline--link');
  }

  if (className) {
    classNames.push(className);
  }

  itemProps.className = classNames.join(' ');

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
