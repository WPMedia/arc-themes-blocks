import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent } from 'fusion:content';
import { useComponentContext } from 'fusion:context';
import './small-promo.scss';


const SmallPromo = ({ customFields }) => {
  // Receive global content
  const { globalContent: content } = useComponentContext();

  // Retrieve two functions from the useEditableContent hook
  const { editableContent } = useEditableContent();

  const headlineClass = customFields.showImage ? 'col-sm-xl-8' : 'col-sm-xl-12';

  return (
    <div className="container-fluid small-promo">
      <div className="row">
        {customFields.showHeadline
          && (
          <div className={headlineClass}>
            <div className="sm-promo-headline" {...editableContent(content, 'headlines.basic')}>
              {content && content.headlines ? content.headlines.basic : ''}
            </div>
          </div>
          )
        }
        {customFields.showImage
        && (
          <div className="col-sm-xl-4">
            <img src="https://loremflickr.com/300/200" alt="headline" />
          </div>
        )
        }
      </div>
    </div>
  );
};

SmallPromo.propTypes = {
  customFields: PropTypes.shape({
    showHeadline: PropTypes.bool.tag(
      {
        name: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        name: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    imageOverrideURL: PropTypes.string.tag({
      name: 'Image URL',
      group: 'Image',
    }),
    itemContentConfig: PropTypes.contentConfig('ans-item'),
  }),

};

SmallPromo.label = 'Small Promo – Arc Block';

export default SmallPromo;
