import React, { Component } from 'react';
import Theme from 'fusion:themes';
import './subheadline.scss';

export default ({children}) => {
  return  (
    <h2 className="sub-headline">{children}</h2>
  );
};
