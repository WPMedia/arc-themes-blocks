import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { MetaData } from '@wpmedia/engine-theme-sdk';

// this is blank import but used to inject scss
import './default.scss';

/** polyfill.io has browser detection and will not load the feature
 *  if the browser already supports it.
 */
const polyFillScript = () => (
  <script async src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CElement.prototype.prepend%2CElement.prototype.remove%2CArray.prototype.find%2CArray.prototype.includes" />
);

/* Not sure window.isIE is even used. */
const isIEScript = () => (
  <script async dangerouslySetInnerHTML={{ __html: 'window.isIE = !!window.MSInputMethodContext && !!document.documentMode;' }} />
);

const chartBeatScript = (accountId, domain) => {
  if (!accountId || !domain) {
    return null;
  }
  const chartBeat = `
    (function() {
      var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
      _sf_async_config.uid = ${accountId};
      _sf_async_config.domain = "${domain}";
      _sf_async_config.useCanonical = true;
      _sf_async_config.useCanonicalDomain = true;
      _sf_async_config.sections = '';
      _sf_async_config.authors = '';
    })();
  `;
  return (
    <>
      <script async data-integration="chartbeat" dangerouslySetInnerHTML={{ __html: chartBeat }} />
      <script async data-integration="chartbeat" src="https://static.chartbeat.com/js/chartbeat.js" />
    </>
  );
};

const comscoreScript = (accountId) => {
  if (!accountId) {
    return null;
  }
  const scriptCode = `
    var _comscore = _comscore || []; _comscore.push({ c1: "2", c2: "${accountId}" });
  `;
  return (
    <>
      <link rel="preconnect" href="https://sb.scorecardresearch.com/" />
      <script async data-integration="comscore" dangerouslySetInnerHTML={{ __html: scriptCode }} />
      <script async data-integration="comscore" src="https://sb.scorecardresearch.com/beacon.js" />
    </>
  );
};

const comscoreNoScript = (accountId) => {
  if (!accountId) {
    return null;
  }
  return (
    <noscript data-integration="comscore">
      <img alt="comscore" src={`https://sb.scorecardresearch.com/p?c1=2&c2=${accountId}&cv=2.0&cj=1`} />
    </noscript>
  );
};

const googleAnalyticsScript = (gaID) => {
  if (!gaID) {
    return null;
  }
  const gaScript = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());gtag('config', '${gaID}');
  `;
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <script async data-integration="googleAnalytics" src={`https://www.googletagmanager.com/gtag/js?id=${gaID}`} />
      <script async data-integration="googleAnalytics" dangerouslySetInnerHTML={{ __html: gaScript }} />
    </>
  );
};

const googleTagManagerScript = (gtmID) => {
  if (!gtmID) {
    return null;
  }
  const gtmScript = `
    (function(w,d,s,l,i){
      w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmID}');
  `;
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <script async data-integration="googleTagManager" dangerouslySetInnerHTML={{ __html: gtmScript }} />
    </>
  );
};

const googleTagManagerNoScript = (gtmID) => {
  if (!gtmID) {
    return null;
  }
  return (
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
  );
};

const nativoIntegrationScript = (nativoIntegration) => {
  if (!nativoIntegration) {
    return null;
  }
  return (
    <script async data-integration="nativo-ad" src="https://s.ntv.io/serve/load.js" />
  );
};

const querylyCode = (querylyId, querylyOrg, pageType) => {
  if (!querylyId) {
    return null;
  }
  const querylyInit = `
    window.addEventListener('DOMContentLoaded', (event) => {
      queryly.init("${querylyId}", document.querySelectorAll("#fusion-app"));
    });
  `;
  return (
    <>
      <link rel="preconnect" href="https://www.queryly.com/" />
      <script defer data-integration="queryly" src="https://www.queryly.com/js/queryly.v4.min.js" />
      <script defer data-integration="queryly" dangerouslySetInnerHTML={{ __html: querylyInit }} />
      { pageType === 'queryly-search'
        ? <script defer data-integration="queryly" src={`https://www.queryly.com/js/${querylyOrg}-advanced-search.js`} />
        : null}
    </>
  );
};

const fontUrlLink = (fontUrl, deployment) => {
  // If fontURL is an array, then iterate over the array and build out the links
  if (fontUrl && Array.isArray(fontUrl) && fontUrl.length > 0) {
    const fontLinks = [...new Set(fontUrl)].map((url, index) => (
      <link rel="prefetch" as="font" key={url} data-testid={`font-loading-url-${index}`} href={deployment(url)} />
    ));
    return (
      <>{fontLinks}</>
    );
  }
  // Legacy support where fontUrl is a string
  return fontUrl ? <link rel="prefetch" as="font" href={deployment(fontUrl)} /> : '';
};

const injectStringScriptArray = (scriptStringArray) => (
  [...new Set(scriptStringArray)].map((scriptString, index) => (
    // no good way of getting keys for this
    // index used to remove warnings
    // this key will not affect performance or issues with changing order
    /* eslint-disable-next-line react/no-array-index-key */
    <script defer key={index} data-integration="injected" dangerouslySetInnerHTML={{ __html: scriptString }} />
  ))
);

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
  const { globalContent, arcSite } = useFusionContext();
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
    locale = 'en',
  } = getProperties(arcSite);

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <MetaData
          MetaTag={MetaTag}
          MetaTags={MetaTags}
          metaValue={metaValue}
          globalContent={globalContent}
          websiteName={websiteName}
          websiteDomain={websiteDomain}
          twitterUsername={twitterUsername}
          resizerURL={resizerURL}
          arcSite={arcSite}
          facebookAdmins={facebookAdmins}
          fallbackImage={fallbackImage}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        {fontUrlLink(fontUrl, deployment)}
        <CssLinks />
        <Libs />
        {isIEScript()}
        {polyFillScript()}
        {injectStringScriptArray(dangerouslyInjectJS)}
        {googleTagManagerScript(gtmID)}
        {googleAnalyticsScript(gaID)}
        {nativoIntegrationScript(nativoIntegration)}
        {chartBeatScript(chartBeatAccountId, chartBeatDomain)}
        {comscoreScript(comscoreID)}
        {querylyCode(querylyId, querylyOrg, metaValue('page-type'))}
      </head>
      <body>
        {comscoreNoScript(comscoreID)}
        {googleTagManagerNoScript(gtmID)}
        <div id="fusion-app" className="layout-section">{children}</div>
        <Fusion />
      </body>
    </html>
  );
};

export default SampleOutputType;
