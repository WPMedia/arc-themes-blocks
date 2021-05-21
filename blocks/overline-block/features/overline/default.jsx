import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import getThemeStyle from 'fusion:themes';
import { formatURL } from '@wpmedia/engine-theme-sdk';
import './overline.scss';
import { PrimaryFont } from '@wpmedia/shared-styles';

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

  const shouldUseProps = !!(customText && customUrl); // ? true : sourceContent._id ? false : false;
  const useGlobalContent = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];
  const editableContentPath = shouldUseLabel ? 'headlines.basic' : `websites.${arcSite}.website_section.name`;
  const [text, url] = shouldUseProps ? [customText, customUrl] : useGlobalContent;

  let edit = {};
  if (editable) {
    if (sourceContent._id) {
      edit = { ...editableContent(sourceContent, editableContentPath) };
    }
  }

  if (url) {
    return (
      <PrimaryFont
        as="a"
        href={formatURL(url)}
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
        {...edit}
        suppressContentEditableWarning
      >
        {text}
      </PrimaryFont>
    );
  }

  if (text) {
    return (
      <PrimaryFont
        as="span"
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
        {...edit}
        suppressContentEditableWarning
      >
        {text}
      </PrimaryFont>
    );
  }

  return null;
};

Overline.label = 'Overline – Arc Block';

Overline.propTypes = {
  customText: PropTypes.string,
  customUrl: PropTypes.string,
};

export default Overline;
