import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxGalleryProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const LightboxGallery = ({ images, initialIndex = 0, isOpen, onClose }: LightboxGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
  }, [images.length]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  if (!images.length) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoom <= 1}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="flex items-center px-3 text-white text-sm">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoom >= 3}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${zoom})` }}
              transition={{ duration: 0.2 }}
              draggable={false}
            />
          </motion.div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    setZoom(1);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightboxGallery;
