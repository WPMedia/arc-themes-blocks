import React, { Component } from 'react';
import Theme from 'fusion:themes';
import './articlebody.scss';

export default ({children}) => {
  return  (
    <h1 className="headline">{children}</h1>
  );
};
