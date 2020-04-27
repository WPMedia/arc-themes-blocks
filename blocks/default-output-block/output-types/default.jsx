import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { playerRoot, videoOrg } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import './default.scss';

const powaBoot = `${playerRoot}/prod/powaBoot.js?=org=${videoOrg}`;
const powaDrive = `${playerRoot}/prod/powaDrive.js?org=${videoOrg}`;

const getCustomMetaData = (metaHTMLString) => {
  let customMetaData = null;
  if (typeof window === 'undefined') {
    const DomParser = require('dom-parser');
    customMetaData = new DomParser().parseFromString(metaHTMLString)
      .getElementsByTagName('META')
      .map((metaNode) => ({
        metaName: metaNode.getAttribute('name'),
        metaValue: (metaNode.getAttribute('value') || metaNode.getAttribute('content')),
      }));
  }
  return customMetaData;
};

const generateCustomMetaTags = (metaData, MetaTag, MetaTags) => {
  const metaHTMLString = ReactDOMServer.renderToString(<MetaTags />);
  const customMetaData = getCustomMetaData(metaHTMLString)
    .filter((metaObj) => !metaData[metaObj.metaName]);
  return (
    <>
      {customMetaData.length > 0 && customMetaData.map((metaObj, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MetaTag key={`custom-meta-data-${i}`} name={metaObj.metaName} default={metaObj.metaValue} />
      ))}
    </>
  );
};

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
    websiteName, twitterSite, gtmID, dangerouslyInjectJS = [],
  } = getProperties(arcSite);
  const pageType = metaValue('page-type') || '';
  let storyMetaDataTags = null;
  let tagMetaDataTags = null;
  let authorMetaDataTags = null;
  let searchMetaDataTags = null;
  let twitterTags = null;

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
        return '';
    }
  };


  const metaData = {
    'page-type': pageType,
    title: websiteName,
    ogTitle: websiteName,
    ogSiteName: websiteName,
    twitterSite: twitterSite ? `@${twitterSite}` : null,
    twitterCard: 'summary_large_image',
  };

  if (pageType === 'article' || pageType === 'video' || pageType === 'gallery') {
    if (typeof window === 'undefined') {
      const { getImgURL, getImgAlt } = require('./_children/promoImageHelper');
      let description = null;
      let headline = null;

      if (gc && gc.description && gc.headlines) {
        description = gc.description.basic;
        headline = gc.headlines.basic;
      }

      if (metaValue('title')) {
        metaData.title = `${metaValue('title')} – ${websiteName}`;
      } else if (headline) {
        metaData.title = `${headline} – ${websiteName}`;
      } else {
        metaData.title = websiteName;
      }
      metaData.description = metaValue('description') || description || null;
      metaData.ogTitle = metaValue('og:title') || headline || websiteName;
      metaData.ogImage = getImgURL(metaValue, 'og:image', gc);
      metaData.ogImageAlt = getImgAlt(metaValue, 'og:image:alt', gc);

      // Keywords could be comma delimited string or array of string or an array of objects
      if (metaValue('keywords')) {
        metaData.keywords = metaValue('keywords');
      } else if (gc && gc.taxonomy && gc.taxonomy.seo_keywords) {
        if (
          typeof gc.taxonomy.seo_keywords !== 'undefined'
            && gc.taxonomy.seo_keywords !== null
        ) {
          metaData.keywords = gc.taxonomy.seo_keywords.join(',');
        }
      } else if (gc && gc.taxonomy && gc.taxonomy.tags) {
        if (typeof gc.taxonomy.tags !== 'undefined'
            && gc.taxonomy.tags !== null && gc.taxonomy.tags.length) {
          metaData.keywords = [];
          gc.taxonomy.tags.forEach((item) => {
            if (item.slug) metaData.keywords.push(item.slug);
          });
        }
      } else {
        metaData.keywords = null;
      }

      storyMetaDataTags = (
        <>
          { metaData.description
            && <meta name="description" content={metaData.description} />}
          { metaData.keywords
            && <meta name="keywords" content={metaData.keywords} />}

          <meta property="og:title" content={metaData.ogTitle} />

          { metaData.ogImage
            && <meta property="og:image" content={metaData.ogImage} />}
          { metaData.ogImageAlt
            && <meta property="og:image:alt" content={metaData.ogImageAlt} />}
          {pageType === 'article' && (
            <meta name="robots" content="noarchive" />
          )}
        </>
      );
    }
  } else if (pageType === 'author') {
    const author = (gc.authors && gc.authors.length) ? gc.authors[0] : {};
    metaData.description = metaValue('description') || author.bio || null;
    metaData.ogTitle = metaValue('og:title') || author.byline || '';
    if (metaData.ogTitle === '') {
      metaData.title = websiteName;
      metaData.ogTitle = websiteName;
    } else {
      metaData.title = `${metaData.ogTitle} - ${websiteName}`;
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }

    authorMetaDataTags = (
      <>
        {
            metaData.description
            && <meta name="description" content={metaData.description} />
          }
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  } else if (pageType === 'search') {
    metaData.title = `Search - ${websiteName}`;
    metaData.ogTitle = `Search - ${websiteName}`;

    searchMetaDataTags = (
      <>
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  } else if (pageType === 'tag') {
    const payload = (gc.Payload && gc.Payload.length) ? gc.Payload[0] : {};
    metaData.description = metaValue('description') || payload.description || null;
    metaData.ogTitle = metaValue('og:title') || payload.name || '';
    if (metaData.ogTitle === '') {
      metaData.title = websiteName;
      metaData.ogTitle = websiteName;
    } else {
      metaData.title = `${metaData.ogTitle} - ${websiteName}`;
      metaData.ogTitle = `${metaData.ogTitle} - ${websiteName}`;
    }

    tagMetaDataTags = (
      <>
        { metaData.description
          && <meta name="description" content={metaData.description} />}
        <meta property="og:title" content={metaData.ogTitle} />
      </>
    );
  }
  // Twitter meta tags go on all pages
  twitterTags = (
    <>
      { metaData.ogSiteName
        && <meta property="og:site_name" content={metaData.ogSiteName} />}
      { metaData.twitterSite
        && <meta property="twitter:site" content={metaData.twitterSite} />}
      { metaData.twitterCard
        && <meta property="twitter:card" content={metaData.twitterCard} />}
    </>
  );

  const customMetaTags = generateCustomMetaTags(metaData, MetaTag, MetaTags);
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
        <title>{metaData.title}</title>
        {storyMetaDataTags}
        {tagMetaDataTags}
        {authorMetaDataTags}
        {searchMetaDataTags}
        {customMetaTags}
        {twitterTags}
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
      </head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58927291-1" />
      <script
        src={powaBoot}
        async
        data-powa-script
        data-loaded-via="powa-manifest"
      />
      <link rel="preload" as="script" href={powaDrive} />
      {googleFonts()}
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
