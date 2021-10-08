import React from 'react';
// import PropTypes from 'prop-types';
// import { useFusionContext } from 'fusion:context';

import { OverlineComponent, DateComponent } from '@wpmedia/theme-components';

const POCList = () => (
  <div className="b-list">
    <h2>List Block Title</h2>
    <div>
      <OverlineComponent text="News" />
      <DateComponent text="Friday 1st October 2021" />
    </div>
    <div>
      <OverlineComponent text="News" />
      <DateComponent text="Thursday 30th September 2021" />
    </div>
    <div>
      <OverlineComponent text="News" />
      <DateComponent text="Thursday 30th September 2021" />
    </div>
  </div>
);

POCList.label = 'POC List Block – Arc Block';

// POCList.icon = 'programming-language-html';

POCList.propTypes = {};

export default POCList;
