import React, { useLayoutEffect } from 'react';

/**
 * This prevents the article content from still being
 * scrollable while the paywall is displayed.
 *
 * Without this, users could still read the article.
 * Ideally, I think we would want a scanner of some sort
 * that would re-establish the block on scrolling
 * if the user was savvy enough to use the browser's inspector.
 *
 * Because it needs to use useLayoutEffect, not sure how to
 * make a test with this as it uses the dom and Jest runs server side
 * and even dumps out a warning about that.
 */
const BlockBodyScroll = ({ children }) => {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    // eslint-disable-next-line no-return-assign
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return (
    <>
      { children }
    </>
  );
};

export default BlockBodyScroll;
