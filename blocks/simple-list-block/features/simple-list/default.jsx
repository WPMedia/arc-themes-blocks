import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import Title from './_children/title';
import StoryItem from './_children/story-item';
import './simple-list.scss';

// helpers start

const extractImage = (storyObject) => storyObject.promo_items
  && storyObject.promo_items.basic
  && storyObject.promo_items.basic.type === 'image'
  && storyObject.promo_items.basic.url;

const unserializeStory = (storyObject) => ({
  id: storyObject._id,
  itemTitle: storyObject.headlines.basic,
  imageURL: extractImage(storyObject) || '',
});

// helpers end

const SimpleList = (props) => {
  const {
    customFields: {
      listContentConfig: {
        contentService = '',
        contentConfigValues = {},
      } = {},
      title = '',
    } = {},
    id = '',
  } = props;

  const { arcSite } = useFusionContext();

  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: contentConfigValues,
  }) || {};

  return (
    <div key={id} className="list-container">
      <Title className="list-title" primaryFont={primaryFont}>
        {title}
      </Title>
      {
        contentElements.map(unserializeStory).map(({ id: listItemId, itemTitle, imageURL }) => (
          <StoryItem
            key={listItemId}
            id={listItemId}
            itemTitle={itemTitle}
            imageURL={imageURL}
            primaryFont={primaryFont}
          />
        ))
      }
    </div>
  );
};

SimpleList.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({ label: 'Title' }),
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({
      label: 'Display Content Info',
    }),
  }),
};

SimpleList.label = 'Simple List – Arc Block';

export default SimpleList;
