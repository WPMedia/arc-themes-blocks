export default {
  resolve(resolveParams) {
    const { hierarchy, 'arc-site': arcSite } = resolveParams;
    return `/site/v3/navigation/${arcSite}${hierarchy ? `?hierarchy=${hierarchy}` : ''}`;
  },
  schemaName: 'navigation-hierarchy',
  params: {
    hierarchy: 'text',
  },
};
