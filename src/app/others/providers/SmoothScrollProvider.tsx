"use client";

import {
  useEffect,
  useRef,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number },
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? -80,
          duration: options?.duration ?? 1.2,
        });
      }
    },
    [],
  );

  useEffect(() => {
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const createdLenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = createdLenis;

    gsap.registerPlugin(ScrollTrigger);

    createdLenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      createdLenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      createdLenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
      createdLenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
