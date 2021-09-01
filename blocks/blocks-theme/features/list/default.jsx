import React from 'react';

import Headline from '../../components/headline';
import Overline from '../../components/overline';

import './styles.css';

const List = () => (
  <div className="xpmedia-b-list">
    <h2>List Block</h2>
    <div>
      <Overline text="Overline Text" />
      <Headline text="Headline 1" />
    </div>
    <div>
      <Overline text="Overline Text" />
      <Headline text="Headline 2" />
    </div>
    <div>
      <Overline text="Overline Text" />
      <Headline text="Headline 3" />
    </div>
    <div>
      <Overline text="Overline Text" />
      <Headline text="Headline 4" />
    </div>
  </div>
);

List.label = 'List – Arc Block ES';

List.icon = 'arc-overline';

export default List;
