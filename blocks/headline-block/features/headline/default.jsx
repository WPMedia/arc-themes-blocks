import React, { Component } from 'react';
import Theme from 'fusion:themes';
import './headline.scss';

export default ({headline}) => {
  return (headline && headline.length > 0) ? (
    <h1 className={Theme.headline}>{headline}</h1>
  ) : null;
};

