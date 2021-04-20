import React from 'react';
import { useEditableContent } from 'fusion:content';
import { useFusionContext, registerSuccessEvent } from 'fusion:context';
import { PrimaryFont } from '@wpmedia/shared-styles';

const PromoHeadline = (props) => {
  const {
    content = {},
    text,
    link,
    className = '',
    linkClassName = '',
    headingClassName = '',
    newTab = false,
    editable = true,
  } = props;
  const { editableContent } = useEditableContent();
  const { arcSite } = useFusionContext();

  const linkURL = content?.websites?.[arcSite]?.website_url || link;
  const linkText = content?.headlines?.basic || text;

  const editableItem = content?.headlines && editable ? editableContent(content, 'headlines.basic') : {};

  return linkText ? (
    <div className={`promo-headline ${className}`}>
      <PrimaryFont
        as="h2"
        className={headingClassName}
        {...editableItem}
        suppressContentEditableWarning
      >
        <a
          href={linkURL}
          target={newTab ? '_blank' : '_self'}
          rel={newTab ? 'noreferrer noopener' : ''}
          className={linkClassName}
          onClick={registerSuccessEvent}
        >
          {linkText}
        </a>
      </PrimaryFont>
    </div>
  ) : null;
};

export default PromoHeadline;
