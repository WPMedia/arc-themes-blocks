import React from 'react';
import ArticleDate from './features/date/default';

export default {
  title: 'Blocks/Date',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const mockContent = {
  display_date: '2021-08-05T20:00:19+00:00',
};

export const dateFromArticleContent = () => (
  <ArticleDate globalContent={mockContent} />
);

export const dateFromCustomDate = () => (
  <ArticleDate date="2021-01-01T20:00:19+00:00" />
);
