'use client';

import { useState, useEffect } from 'react';

export function useResponsive() {
  // Initialize state with undefined to safely handle Next.js SSR
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    current: 'desktop', // fallback default
  });

  useEffect(() => {
    // Media queries aligned with standard Tailwind CSS breakpoints
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const updateMatch = () => {
      setScreen({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
        current: mobileQuery.matches 
          ? 'mobile' 
          : tabletQuery.matches 
          ? 'tablet' 
          : 'desktop',
      });
    };

    // Run initial check on client mount
    updateMatch();

    // Listen for resize changes efficiently via media query listeners
    mobileQuery.addEventListener('change', updateMatch);
    tabletQuery.addEventListener('change', updateMatch);
    desktopQuery.addEventListener('change', updateMatch);

    // Clean up event listeners on unmount
    return () => {
      mobileQuery.removeEventListener('change', updateMatch);
      tabletQuery.removeEventListener('change', updateMatch);
      desktopQuery.removeEventListener('change', updateMatch);
    };
  }, []);

  return screen;
}
