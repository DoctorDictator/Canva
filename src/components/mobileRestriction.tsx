"use client";

import { useEffect, useState } from "react";
// eslint-disable-next-line
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  // eslint-disable-next-line
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function MobileRestriction({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth <= 1024;
      setIsMobile(isMobileDevice);
    };
    checkIsMobile();
    const handleResize = debounce(checkIsMobile, 150);
    window.addEventListener("resize", handleResize);
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      console.log("matchMedia change:", { matches: e.matches });
      checkIsMobile();
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Desktop Version Required</h1>
        <p className="text-lg text-center">
          This website is only accessible on desktop devices. Please switch to a
          desktop browser to continue.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
