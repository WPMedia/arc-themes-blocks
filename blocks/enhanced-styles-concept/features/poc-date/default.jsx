import React from 'react';
// import PropTypes from 'prop-types';
import { DateComponent } from '@wpmedia/theme-components';

const POCDate = () => (
  <DateComponent text={new Date().toGMTString()} />
);

POCDate.label = 'POC Date Block – Arc Block';

// POCDate.icon = 'programming-language-html';

POCDate.propTypes = {};

export default POCDate;
