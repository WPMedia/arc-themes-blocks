export default {
  resolve(resolveParams) {
    const { hierarchy, sectionId, 'arc-site': arcSite } = resolveParams;
    return `/site/v3/navigation/${arcSite}?${hierarchy ? `hierarchy=${hierarchy}` : ''}${sectionId ? `&_id=${sectionId}` : ''}`;
  },
  schemaName: 'navigation-hierarchy',
  params: {
    hierarchy: 'text',
    sectionId: 'text',
  },
};
