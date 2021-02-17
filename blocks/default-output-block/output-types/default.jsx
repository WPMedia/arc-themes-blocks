import React from 'react';
import { playerRoot, videoOrg } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { MetaData } from '@wpmedia/engine-theme-sdk';

// this is blank import but used to inject scss
import './default.scss';

const powaBoot = `${playerRoot}/prod/powaBoot.js?=org=${videoOrg}`;
const powaDrive = `${playerRoot}/prod/powaDrive.js?org=${videoOrg}`;

const injectStringScriptArray = (scriptStringArray) => (
  scriptStringArray.map((scriptString, index) => (
    // no good way of getting keys for this
    // index used to remove warnings
    // this key will not affect performance or issues with changing order
    /* eslint-disable-next-line react/no-array-index-key */
    <script key={index} dangerouslySetInnerHTML={{ __html: scriptString }} />
  ))
);

const chartBeatCode = (accountId, domain) => {
  if (!accountId || !domain) {
    return null;
  }
  return `
    (function() {
        var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
        _sf_async_config.uid = ${accountId};
        _sf_async_config.domain = "${domain}";
        _sf_async_config.useCanonical = true;
        _sf_async_config.useCanonicalDomain = true;
        _sf_async_config.sections = '';
        _sf_async_config.authors = '';
        function loadChartbeat() {
            var e = document.createElement('script');
            var n = document.getElementsByTagName('script')[0];
            e.type = 'text/javascript';
            e.async = true;
            e.src = '//static.chartbeat.com/js/chartbeat.js';
            n.parentNode.insertBefore(e, n);
        }
        loadChartbeat();
     })();
  `;
};

const querylyCode = (querylyId, querylyOrg, pageType) => {
  const querylyInit = `
    queryly.init("${querylyId}", document.querySelectorAll("#fusion-app"));
  `;
  return (
    <>
      <script data-integration="queryly" src="https://www.queryly.com/js/queryly.v4.js" />
      <script data-integration="queryly" dangerouslySetInnerHTML={{ __html: querylyInit }} />
      { pageType === 'queryly-search'
        ? <script data-integration="queryly" src={`https://www.queryly.com/js/${querylyOrg}-advanced-search.js`} />
        : null}
    </>
  );
};

const comscoreScript = (accountId) => {
  if (!accountId) {
    return null;
  }
  const scriptCode = `
    var _comscore = _comscore || [];
    _comscore.push({ c1: "2", c2: "${accountId}" });
    (function() {
      var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
      s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
      el.parentNode.insertBefore(s, el);
    })();
  `;

  return (
    <script data-integration="comscore" dangerouslySetInnerHTML={{ __html: scriptCode }} />
  );
};

const comscoreNoScript = (accountId) => {
  if (!accountId) {
    return null;
  }
  return (
    <noscript data-integration="comscore">
      <img alt="comscore" src={`http://b.scorecardresearch.com/p?c1=2&c2=${accountId}&cv=2.0&cj=1`} />
    </noscript>
  );
};

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
    websiteName,
    websiteDomain,
    twitterUsername,
    gtmID,
    gaID,
    dangerouslyInjectJS = [],
    fontUrl,
    resizerURL,
    facebookAdmins,
    nativoIntegration,
    chartBeatAccountId,
    chartBeatDomain,
    fallbackImage,
    comscoreID,
    querylyId,
    querylyOrg,
  } = getProperties(arcSite);

  const pageType = metaValue('page-type');

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
  const gtmScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmID}');
  `;
  const gaScript = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());gtag('config', '${gaID}');
  `;
  const renderGaScript = () => (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaID}`} />
      <script dangerouslySetInnerHTML={{ __html: gaScript }} />
    </>
  );
  const chartBeat = chartBeatCode(chartBeatAccountId, chartBeatDomain);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {gtmID
          ? (<script dangerouslySetInnerHTML={{ __html: gtmScript }} />)
          : null}
        {gaID ? renderGaScript() : null}
        <MetaData
          MetaTag={MetaTag}
          MetaTags={MetaTags}
          metaValue={metaValue}
          globalContent={gc}
          websiteName={websiteName}
          websiteDomain={websiteDomain}
          twitterUsername={twitterUsername}
          resizerURL={resizerURL}
          arcSite={arcSite}
          facebookAdmins={facebookAdmins}
          fallbackImage={fallbackImage}
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
        {nativoIntegration
          ? (<script type="text/javascript" data-integration="nativo-ad" src="https://s.ntv.io/serve/load.js" async />)
          : null}
        {chartBeat && <script data-integration="chartbeat" dangerouslySetInnerHTML={{ __html: chartBeat }} /> }
        {comscoreScript(comscoreID)}
      </head>
      <body>
        {comscoreNoScript(comscoreID)}
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
        <div id="fusion-app" className="layout-section">
          {children}
        </div>
        <Fusion />
        {querylyId ? querylyCode(querylyId, querylyOrg, pageType) : null}
      </body>
    </html>
  );
};

export default SampleOutputType;
