import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    let lenis;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis');
        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
          smoothTouch: false,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Expose lenis globally for other components
        window._lenis = lenis;
      } catch (e) {
        console.warn('Lenis not available, using native scroll');
      }
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);
}
