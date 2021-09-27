import React, { useEffect, useState, useRef } from 'react';

import './styles.scss';

const SubscriptionOverlay = ({ children }) => {
  const overlayRef = useRef();
  const contentRef = useRef();
  const [scrollDelta, setScrollDelta] = useState(0);
  const [overlayTouchLast, setOverlayTouchLast] = useState(0);
  const [contentTouchLast, setContentTouchLast] = useState(0);

  useEffect(() => {
    const disableScroll = (event) => event.preventDefault();
    const scrollElement = overlayRef.current.ownerDocument.scrollingElement;
    const { overflow } = scrollElement.style;

    scrollElement.addEventListener('scroll', disableScroll);
    scrollElement.style.overflow = 'hidden';
    scrollElement.style.maxHeight = '100vh';

    return () => {
      scrollElement.removeEventListener('scroll', disableScroll);
      scrollElement.style.overflow = overflow;
      scrollElement.style.maxHeight = 'auto';
    };
  }, [overlayRef]);

  useEffect(() => {
    const contentTopFactor = overlayRef.current.scrollTop / overlayRef.current.clientHeight;

    if (contentRef.current.scrollTop >= 0 && contentTopFactor < 0.25) {
      overlayRef.current.scrollTop += scrollDelta;
    } else {
      contentRef.current.scrollTop += scrollDelta;
    }
  }, [contentRef, overlayRef, scrollDelta]);

  return (
    <section
      className="xpmedia-subscription-overlay"
      ref={overlayRef}
      onWheel={(event) => {
        setScrollDelta(event.deltaY);
      }}
      onTouchMove={(event) => {
        setScrollDelta(overlayTouchLast - event.changedTouches[0].clientY);
        setOverlayTouchLast(event.changedTouches[0].clientY);
      }}
      onTouchStart={(event) => {
        setOverlayTouchLast(event.changedTouches[0].clientY);
      }}
      role="alert"
    >
      <div
        aria-live="assertive"
        className="xpmedia-subscription-overlay-content"
        onWheel={(event) => {
          setScrollDelta(event.deltaY);
        }}
        onTouchMove={(event) => {
          setScrollDelta(contentTouchLast - event.changedTouches[0].clientY);
          setContentTouchLast(event.changedTouches[0].clientY);
        }}
        onTouchStart={(event) => {
          setContentTouchLast(event.changedTouches[0].clientY);
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </section>
  );
};

export default SubscriptionOverlay;
