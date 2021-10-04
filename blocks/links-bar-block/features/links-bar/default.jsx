import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import Link from '@wpmedia/enhanced-styles-concept/components/link';

import './links-bar.scss';

const LinksBar = ({ customFields: { navigationConfig = {}, ariaLabel } }) => {
  const content = useContent({
    source: navigationConfig.contentService,
    query: {
      ...navigationConfig.contentConfigValues,
      feature: 'links-bar',
    },
    filter: `{
      children {
        _id
        node_type
        display_name
        name
        url
      }
    }`,
  });
  const { id, arcSite } = useFusionContext();
  const phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');
  const menuItems = (content && content.children) ? content.children : [];
  const showSeparator = !!(
    content
    && content.children
    && content.children.length > 1
  );

  return (
    <>
      <nav
        key={id}
        className="links-bar"
        aria-label={ariaLabel || phrases.t('links-bar-block.element-aria-label')}
      >
        {menuItems && menuItems.map((item, index) => (
          <React.Fragment key={item._id}>
            {
              item.node_type === 'link'
                ? (
                  <Link href={item.url} name={item.display_name} />
                )
                : (
                  <Link href={item._id} name={item.name} />
                )
            }
            {(content.children.length !== index + 1 && showSeparator) ? '\u00a0 • \u00a0' : ''}
          </React.Fragment>
        ))}
      </nav>
      <hr />
    </>
  );
};

LinksBar.label = 'Links Bar – Arc Block';

LinksBar.icon = 'hyperlink-3';

LinksBar.propTypes = {
  customFields: PropTypes.shape({
    navigationConfig: PropTypes.contentConfig('navigation-hierarchy').tag({
      group: 'Configure Content',
      label: 'Navigation',
    }),
    ariaLabel: PropTypes.string.tag({
      label: 'Aria-label',
      defaultValue: 'More Links',
      description: 'The label is provided to assistive technologies to provide it with a unique name for the links bar nav landmark - defaults to "More Links" if left blank',
    }),
  }),
};

export default LinksBar;
