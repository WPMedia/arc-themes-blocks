import React from 'react';
import Header from './features/header/default';

export default {
  title: 'Blocks/Header',
};

export const extraLarge = () => {
  const customFields = {
    text: 'Baby panda born at the zoo',
    size: 'Extra Large',
  };

  return (
    <Header customFields={customFields} />
  );
};

export const large = () => {
  const customFields = {
    text: 'Baby panda born at the zoo',
    size: 'Large',
  };

  return (
    <Header customFields={customFields} />
  );
};

export const medium = () => {
  const customFields = {
    text: 'Baby panda born at the zoo',
    size: 'Medium',
  };

  return (
    <Header customFields={customFields} />
  );
};

export const small = () => {
  const customFields = {
    text: 'Baby panda born at the zoo',
    size: 'Small',
  };

  return (
    <Header customFields={customFields} />
  );
};
