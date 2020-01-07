import React from 'react';

const Facebook = ({ fill = '#14689A', title = '', desc = '' }) => (
  <svg
    aria-labelledby="title"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 100 100"
  >
    <title id="title" lang="en">{title}</title>
    <desc>{desc}</desc>
    <path
      d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
      fill={fill}
      fillRule="nonzero"
      scale={0.1}
    />
  </svg>
);

export default Facebook;
