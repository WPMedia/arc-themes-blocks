import React from 'react';
import { playerRoot, videoOrg } from 'fusion:environment';

import './styles/test.scss';

const googleAnalytics = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());

  gtag('config', 'UA-58927291-1');
};

const powaBoot = `${playerRoot}/prod/powaBoot.js?=org=${videoOrg}`;
const powaDrive = `${playerRoot}/prod/powaDrive.js?org=${videoOrg}`;

const SampleOutputType = ({
  children,
  contextPath,
  deployment,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
}) => (
  <html lang="en">
    <head>
      <title>Fusion Article</title>
      <MetaTags />
      <Libs />
      <CssLinks />
      <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
    </head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58927291-1" />
    <script>{googleAnalytics()}</script>
    <script
      src={powaBoot}
      async
      data-powa-script
      data-loaded-via="powa-manifest"
    />
    <link rel="preload" as="script" href={powaDrive} />
    <body className="bmiller_20001">
      <div id="fusion-app">
        {children}
      </div>
      <Fusion />

      <script type="text/javascript" src={deployment(`${contextPath}/resources/js/yall.min.js`)} />
      <script type="text/javascript" src={deployment(`${contextPath}/resources/js/image-lazy.js`)} />
    </body>
  </html>
);

export default SampleOutputType;
