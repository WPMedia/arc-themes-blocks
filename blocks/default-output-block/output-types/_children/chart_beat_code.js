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

module.exports = chartBeatCode;
