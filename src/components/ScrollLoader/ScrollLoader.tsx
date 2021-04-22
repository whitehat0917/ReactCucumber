import React, { useRef } from 'react';
import { ScrollLoaderBody, ScrollLoaderContent } from './styled';

interface IScrollLoaderProps {
  children: React.ReactElement;
  className?: string;
  onLoadMore?: () => void;
  loadThreshold?: number;
  scrollRef?: React.RefObject<HTMLElement>;
}

const ScrollLoader: React.FC<IScrollLoaderProps> = ({ className, onLoadMore, loadThreshold, children, scrollRef }) => {
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    if (onLoadMore && e.target && contentRef.current) {
      const realLoadThreshold = loadThreshold ?? 1.5;

      const wndHeight = e.target.clientHeight;
      const loadPos = contentRef.current.clientHeight - wndHeight * realLoadThreshold;

      if (e.target.scrollTop >= loadPos) onLoadMore();
    }
  };

  return (
    <ScrollLoaderBody className={className} ref={scrollRef} onScroll={onLoadMore && handleScroll}>
      <ScrollLoaderContent ref={contentRef}>{children}</ScrollLoaderContent>
    </ScrollLoaderBody>
  );
};

export default ScrollLoader;
