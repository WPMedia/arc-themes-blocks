export default {
  resolve({ hierarchy, 'arc-site': arcSite }) {
    return `/site/v3/navigation/${arcSite}${hierarchy ? `?hierarchy=${hierarchy}` : ''}`;
  },
  schemaName: 'navigation-hierarchy',
  params: {
    hierarchy: 'text',
  },
};
