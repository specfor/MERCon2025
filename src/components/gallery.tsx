import React, { useState, useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./sectionHeader";

// --- CSS Styles ---
const galleryStyles = `
  .perspective-container {
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .gallery-card {
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: center center;
    will-change: transform, opacity, filter;
  }

  /* Active (Center) Card */
  .card-active {
    transform: translateX(-50%) translateZ(0) scale(1);
    z-index: 30;
    opacity: 1;
    filter: blur(0px) brightness(1.1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 2px rgba(251, 236, 109, 0.5);
  }

  /* Left (Previous) Card */
  .card-left {
    transform: translateX(-120%) translateZ(-100px) scale(0.85) rotateY(15deg);
    z-index: 20;
    opacity: 0.6;
    filter: blur(2px) brightness(0.7);
    cursor: pointer;
  }
  
  .card-left:hover {
    filter: blur(0px) brightness(0.9);
    opacity: 0.8;
  }

  /* Right (Next) Card */
  .card-right {
    transform: translateX(20%) translateZ(-100px) scale(0.85) rotateY(-15deg);
    z-index: 20;
    opacity: 0.6;
    filter: blur(2px) brightness(0.7);
    cursor: pointer;
  }

  .card-right:hover {
    filter: blur(0px) brightness(0.9);
    opacity: 0.8;
  }

  /* Hidden Cards (Stacked behind center) */
  .card-hidden {
    transform: translateX(-50%) translateZ(-200px) scale(0.5);
    z-index: 10;
    opacity: 0;
    pointer-events: none;
  }

  /* Progress Bar Animation */
  @keyframes progress {
    from { width: 0%; }
    to { width: 100%; }
  }
  
  .animate-progress {
    animation: progress 5s linear;
  }
`;

// ... [Keep your galleryImages array exactly as it is] ...
const galleryImages = [
  {
    id: 1,
    image: <StaticImage src="../images/img/gallery/m1.jpg" alt="Gallery 1" className="w-full h-full object-cover" />,
  },
  {
    id: 2,
    image: <StaticImage src="../images/img/gallery/m2.jpg" alt="Gallery 2" className="w-full h-full object-cover" />,
  },
  {
    id: 3,
    image: <StaticImage src="../images/img/gallery/m3.jpg" alt="Gallery 3" className="w-full h-full object-cover" />,
  },
  // ... add the rest of your images here
  {
    id: 4,
    image: <StaticImage src="../images/img/gallery/m4.jpg" alt="Gallery 4" className="w-full h-full object-cover" />,
  },
  {
    id: 5,
    image: <StaticImage src="../images/img/gallery/m5.jpg" alt="Gallery 5" className="w-full h-full object-cover" />,
  },
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const totalImages = galleryImages.length;

  // Use a ref to reset the autoplay timer correctly on interactions
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to calculate circular indices
  const getIndex = (offset: number) => {
    return (currentIndex + offset + totalImages) % totalImages;
  };

  // Logic to determine the state of an image based on its index
  const getImageClass = (index: number) => {
    if (index === currentIndex) return "card-active";
    if (index === getIndex(-1)) return "card-left"; // Previous image
    if (index === getIndex(1)) return "card-right"; // Next image
    return "card-hidden";
  };

  // --- Auto Play Logic ---
  useEffect(() => {
    if (isAutoPlay) {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isAutoPlay]);

  // --- Handlers ---
  const resetAutoPlay = () => {
    setIsAutoPlay(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Restart autoplay after a delay of user inactivity
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleManualNext = () => {
    resetAutoPlay();
    handleNext();
  };

  const handleManualPrev = () => {
    resetAutoPlay();
    handlePrevious();
  };

  const handleDotClick = (index: number) => {
    resetAutoPlay();
    setCurrentIndex(index);
  };

  return (
    <>
      <style>{galleryStyles}</style>
      <section id="gallery" className="w-full py-20 px-4 bg-dark-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <SectionHeader headerText="Gallery" />
          </div>

          {/* 3D Carousel Container */}
          <div className="relative h-[400px] md:h-[550px] w-full perspective-container flex items-center justify-center">
            {/* Navigation Buttons (Placed absolutely to be on top) */}
            <button
              onClick={handleManualPrev}
              className="absolute left-2 md:left-10 z-50 p-4 rounded-full bg-black/30 hover:bg-primary-500/80 text-white backdrop-blur-sm border border-white/10 transition-all hover:scale-110 group"
              aria-label="Previous"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleManualNext}
              className="absolute right-2 md:right-10 z-50 p-4 rounded-full bg-black/30 hover:bg-primary-500/80 text-white backdrop-blur-sm border border-white/10 transition-all hover:scale-110 group"
              aria-label="Next"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Images Deck */}
            <div className="relative w-full h-full max-w-4xl mx-auto">
              {galleryImages.map((item, index) => {
                const positionClass = getImageClass(index);

                // We add an onClick to the side images to allow users to click them to navigate
                const isLeft = positionClass === "card-left";
                const isRight = positionClass === "card-right";

                return (
                  <div
                    key={item.id}
                    className={`gallery-card w-[280px] h-[350px] md:w-[600px] md:h-[450px] rounded-2xl overflow-hidden ${positionClass}`}
                    onClick={() => {
                      if (isLeft) handleManualPrev();
                      if (isRight) handleManualNext();
                    }}
                  >
                    {/* Image Container */}
                    <div className="w-full h-full relative">
                      {item.image}

                      {/* Overlay gradient for non-active cards to darken them slightly */}
                      <div
                        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                          positionClass === "card-active" ? "opacity-0" : "opacity-40 hover:opacity-10"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls & Indicators */}
          <div className="mt-8 flex flex-col items-center gap-6">
            {/* Progress Bar (Visual indicator of autoplay) */}
            {isAutoPlay && (
              <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  key={currentIndex} // Key change forces animation restart
                  className="h-full bg-primary-500 animate-progress"
                />
              </div>
            )}

            {/* Pagination Dots */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl px-4">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex ? "w-8 h-2 bg-primary-500" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
