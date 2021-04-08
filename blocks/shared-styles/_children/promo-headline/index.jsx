import React from 'react';
import { useEditableContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { PrimaryFont } from '@wpmedia/shared-styles';

const PromoHeadline = (props) => {
  const {
    content = {},
    text,
    link,
    className = '',
    linkClassName = '',
    headingClassName = '',
  } = props;
  const { editableContent } = useEditableContent();
  const { arcSite } = useFusionContext();

  const linkURL = content?.websites?.[arcSite]?.website_url || link;
  const linkText = content?.headlines?.basic || text;

  const editableItem = content?.headlines ? editableContent(content, 'headlines.basic') : {};

  return linkText ? (
    <div className={`promo-headline ${className}`}>
      <PrimaryFont
        as="h2"
        className={headingClassName}
        {...editableItem}
        suppressContentEditableWarning
      >
        <a href={linkURL} className={linkClassName}>
          {linkText}
        </a>
      </PrimaryFont>
    </div>
  ) : null;
};

export default PromoHeadline;
