import { useState, useCallback } from 'react';

export const useLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
  };
};
