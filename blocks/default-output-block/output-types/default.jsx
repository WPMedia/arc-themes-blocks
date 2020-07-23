import React from 'react';
import { playerRoot, videoOrg } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { MetaData } from '@wpmedia/engine-theme-sdk';
import './default.scss';

const powaBoot = `${playerRoot}/prod/powaBoot.js?=org=${videoOrg}`;
const powaDrive = `${playerRoot}/prod/powaDrive.js?org=${videoOrg}`;

const injectStringScriptArray = (scriptStringArray) => scriptStringArray.map((scriptString) => (
  <script dangerouslySetInnerHTML={{ __html: scriptString }} />
));

const SampleOutputType = ({
  children,
  contextPath,
  deployment,
  CssLinks,
  Fusion,
  Libs,
  MetaTag,
  MetaTags,
  metaValue,
}) => {
  const { globalContent: gc, arcSite } = useFusionContext();
  const {
    websiteName, twitterUsername, gtmID, dangerouslyInjectJS = [], fontUrl, resizerURL,
  } = getProperties(arcSite);

  const googleFonts = () => {
    switch (websiteName) {
      case 'Arc Demo 1':
        return (
          <link href="https://fonts.googleapis.com/css?family=Work Sans" rel="stylesheet" />
        );
      case 'Arc Demo 2':
        return (
          <link href="https://fonts.googleapis.com/css?family=Eczar" rel="stylesheet" />
        );
      case 'Arc Demo 3':
        return (
          <>
            <link href="https://fonts.googleapis.com/css?family=Open Sans" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" />
          </>
        );
      case 'Arc Demo 4':
        return (
          <>
            <link href="https://fonts.googleapis.com/css?family=Open Sans" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" />
          </>
        );
      case 'Arc Demo 5':
        return (
          <link href="https://fonts.googleapis.com/css?family=Space Mono" rel="stylesheet" />
        );
      default:
        return fontUrl ? <link href={fontUrl} rel="stylesheet" /> : '';
    }
  };

  const ieTest = 'window.isIE = !!window.MSInputMethodContext && !!document.documentMode;';
  const gaScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmID}');
  `;
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {gtmID
          ? (
            <script dangerouslySetInnerHTML={{ __html: gaScript }} />
          ) : null}
        <MetaData
          MetaTag={MetaTag}
          MetaTags={MetaTags}
          metaValue={metaValue}
          globalContent={gc}
          websiteName={websiteName}
          twitterUsername={twitterUsername}
          resizerURL={resizerURL}
        />

        <script dangerouslySetInnerHTML={{ __html: ieTest }} />
        {
          /** polyfill.io has browser detection and will not load the feature
           *  if the browser already supports it.
           */
        }
        <script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CElement.prototype.prepend%2CElement.prototype.remove%2CArray.prototype.find%2CArray.prototype.includes" />
        {injectStringScriptArray(dangerouslyInjectJS)}
        <Libs />
        <CssLinks />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <script
          src={powaBoot}
          async
          data-powa-script
          data-loaded-via="powa-manifest"
        />
        <link rel="preload" as="script" href={powaDrive} />
        {googleFonts()}
      </head>
      <body>
        {gtmID
          ? (
            <noscript>
              <iframe
                title="gtm"
                src={`https://www.googletagmanager.com/ns.html?id=${gtmID}`}
                height="0"
                width="0"
                style={{
                  display: 'none',
                  visibility: 'hidden',
                }}
              />
            </noscript>
          ) : null}
        <div id="fusion-app">
          {children}
        </div>
        <Fusion />
      </body>
    </html>
  );
};

export default SampleOutputType;
