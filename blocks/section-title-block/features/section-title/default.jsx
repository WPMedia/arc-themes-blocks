import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import GlobalContentSectionTitle from './_children/global-content';
import CustomContentSectionTitle from './_children/custom-content';

const SectionTitleContainer = (
  {
    customFields: {
      inheritGlobalContent = true,
      sectionContentConfig,
    } = {},
  } = {},
) => {
  if (inheritGlobalContent) {
    return <GlobalContentSectionTitle />;
  }

  return <CustomContentSectionTitle contentConfig={sectionContentConfig} />;
};

SectionTitleContainer.label = 'Section Title – Arc Block';

SectionTitleContainer.propTypes = {
  customFields: PropTypes.shape({
    sectionContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      group: 'Configure Content',
    }),
  }),
};

export default SectionTitleContainer;
