import React from 'react';

const Facebook = ({ fill = '$ui-medium-primary-color', title = '', desc = '' }) => (
  <svg
    aria-labelledby="title"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="title" lang="en">Facebook</title>
    <desc>{desc}</desc>
    <path
      d="M22.595 12.298C22.595 6.609 17.986 2 12.298 2 6.609 2 2 6.609 2 12.298c0 5.14 3.766 9.4 8.689 10.173v-7.197H8.073v-2.976h2.616v-2.27c0-2.58 1.536-4.005 3.889-4.005 1.127 0 2.305.2 2.305.2v2.534h-1.299c-1.278 0-1.677.793-1.677 1.608v1.933h2.855l-.456 2.976h-2.4v7.197c4.923-.774 8.69-5.034 8.69-10.173z"
      fill={fill}
      fillRule="nonzero"
    />
  </svg>
);

export default Facebook;
