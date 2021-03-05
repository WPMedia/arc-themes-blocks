import PropTypes from 'prop-types';
import { framework } from '@wpmedia/news-theme-css/js/framework';

const labelAndValueLabelGroup = (keyValueObject) => {
  const newKeyMap = {};

  Object.keys(keyValueObject).forEach((item) => {
    newKeyMap[item] = `${keyValueObject[item]} - ${item}`;
  });
  return newKeyMap;
};

const customFieldHelper = (labelObject, element, name, group, defaultValue, description) => {
  const elementTextProp = {
    [`${element}`]: PropTypes.oneOf(Object.keys(labelObject)).tag({
      name,
      description,
      defaultValue,
      labels: labelObject,
      group,
    }),
  };

  return { ...elementTextProp };
};

/**
 * Helper to create spacer properties to be used on CustomFields
 *
 * example usage:
 *
 *   customFields: PropTypes.shape({
 *    ...spacerCustomField('spacing', 'Vertical Block Spacing', 'spacing', 'md', '.....' ),
 *  });
 *
 *
 * @param element Base name of the element
 * @param name Name of the custom field
 * @param group Group to witch the element belong to
 * @param defaultValue Default value to use for this property
 * @param description Help text for custom field to show in PB Editor under ?
 *
 * @return A property object to be use on CustomFields
 */
const spacerCustomField = (element, name, group, defaultValue, description) => {
  const labelObject = labelAndValueLabelGroup(framework.spacers);
  return customFieldHelper(labelObject, element, name, group, defaultValue, description);
};

/**
 * Helper to create breakpoint properties to be used on CustomFields
 *
 * example usage:
 *
 *   customFields: PropTypes.shape({
 *    ...breakpointCustomField('breakpoints', 'Breakpoints', 'spacing', 'md', '.....' ),
 *  });
 *
 *
 * @param element Base name of the element
 * @param name Name of the custom field
 * @param group Group to witch the element belong to
 * @param defaultValue Default value to use for this property
 * @param description Help text for custom field to show in PB Editor under ?
 *
 * @return A property object to be use on CustomFields
 */
const breakpointCustomField = (element, name, group, defaultValue, description) => {
  const labelObject = labelAndValueLabelGroup(framework.gridBreakpoints);
  return customFieldHelper(labelObject, element, name, group, defaultValue, description);
};

export {
  spacerCustomField,
  breakpointCustomField,
};
