import React from 'react';
import Footer from './features/footer/default';

export default { title: 'Footer' };

export const basic = () => (
  <footer>
    <Footer customFields={{ navigationConfig: { contentService: 'footer-service', contentConfiguration: {} } }} />
  </footer>
);
