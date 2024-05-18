"use client";
import React, { useRef, useState, useEffect } from "react";

interface ScrollWrapperProps {
  children: React.ReactNode;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -windowWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: windowWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "scroll",
        updateArrowVisibility
      );
      updateArrowVisibility(); // Initial check
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          updateArrowVisibility
        );
      }
    };
  }, [windowWidth]);

  return (
    <div className="relative w-screen text-red-600">
      {/* Scroll Buttons */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white font-bold text-xl p-4 rounded-md z-10 lg:p-6"
          onClick={scrollLeft}
        >
          ←
        </button>
      )}
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white font-bold text-xl p-4 mr-4 rounded-md z-10 lg:p-6"
          onClick={scrollRight}
        >
          →
        </button>
      )}
      <div className="w-screen overflow-x-scroll" ref={scrollContainerRef}>
        {children}
      </div>
    </div>
  );
};

export default ScrollWrapper;
