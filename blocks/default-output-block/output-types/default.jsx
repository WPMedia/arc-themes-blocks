import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { playerRoot, videoOrg } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';

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

const getCustomMetaData = (metaHTMLString) => {
  let customMetaData = null;
  // eslint-disable-line global-require,@typescript-eslint/no-var-requires
  if (typeof window === 'undefined') {
    const DomParser = require('dom-parser');
    customMetaData = new DomParser().parseFromString(metaHTMLString)
      .getElementsByTagName('META')
      .map(metaNode => ({
        metaName: metaNode.getAttribute('name'),
        metaValue: (metaNode.getAttribute('value') || metaNode.getAttribute('content')),
      }));
  }
  return customMetaData;
};

const generateCustomMetaTags = (metaData, MetaTag, MetaTags) => {
  const metaHTMLString = ReactDOMServer.renderToString(<MetaTags />);
  const customMetaData = getCustomMetaData(metaHTMLString)
    .filter(metaObj => !metaData[metaObj.metaName]);
  return (
    <>
      {customMetaData.length > 0 && customMetaData.map((metaObj, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MetaTag key={`custom-meta-data-${i}`} name={metaObj.metaName} default={metaObj.metaValue} />
      ))}
    </>
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
  const { websiteName } = getProperties(arcSite);
  const pageType = metaValue('page-type') || '';
  let metaDataTags = null;
  const metaData = {
    'page-type': pageType,
    title: websiteName,
    ogTitle: websiteName,
  };
  if (pageType === 'article' || pageType === 'video' || pageType === 'gallery') {
    if (typeof window === 'undefined') {
      // eslint-disable-line global-require,@typescript-eslint/no-var-requires
      const { getImgURL, getImgAlt } = require('./_children/promoImageHelper');

      metaData.title = metaValue('title') || gc.headlines.basic || websiteName;
      metaData.description = metaValue('description') || gc.description.basic || null;
      metaData.ogTitle = metaValue('og:title') || gc.headlines.basic || websiteName;
      metaData.ogImage = getImgURL(metaValue, 'og:image', gc);
      metaData.ogImageAlt = getImgAlt(metaValue, 'og:image:alt', gc);

      // Keywords could be comma delimited string or array of string or an array of objects
      if (metaValue('keywords')) {
        metaData.keywords = metaValue('keywords');
      } else if (typeof gc.taxonomy.seo_keywords !== 'undefined'
        && gc.taxonomy.seo_keywords !== null) {
        metaData.keywords = gc.taxonomy.seo_keywords.join(',');
      } else if (typeof gc.taxonomy.tags !== 'undefined'
        && gc.taxonomy.tags !== null && gc.taxonomy.tags.length) {
        metaData.keywords = [];
        gc.taxonomy.tags.forEach((item) => {
          if (item.slug) metaData.keywords.push(item.slug);
        });
      } else {
        metaData.keywords = null;
      }

      metaDataTags = (
        <>
          <title>{metaData.title}</title>
          { metaData.description
            && <meta name="description" content={metaData.description} />
          }
          { metaData.keywords
          && <meta name="keywords" content={metaData.keywords} />
          }

          <meta property="og:title" content={metaData.ogTitle} />

          { metaData.ogImage
          && <meta property="og:image" content={metaData.ogImage} />
          }
          { metaData.ogImageAlt
          && <meta property="og:image:alt" content={metaData.ogImageAlt} />
          }
          {pageType === 'article' && (
            <meta name="robots" content="noarchive" />
          )}
        </>
      );
    }
  }

  const customMetaTags = generateCustomMetaTags(metaData, MetaTag, MetaTags);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {metaDataTags}
        {customMetaTags}
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
};


export default SampleOutputType;
