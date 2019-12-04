import React from 'react';

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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <MetaTags />
      <Libs />
      <CssLinks />
      <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
    </head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58927291-1" />
    <script>{googleAnalytics()}</script>
    <body className="Test-x-2011">
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
