const extractVideoEmbedFromStory = (content) => {
  const contentEl = (
    (content?.type === 'video' && content) || (
      content?.type === 'story'
      && content?.promo_items?.lead_art?.type === 'video'
      && content?.promo_items?.lead_art
    )
  );
  return contentEl?.embed_html;
};

export default extractVideoEmbedFromStory;
