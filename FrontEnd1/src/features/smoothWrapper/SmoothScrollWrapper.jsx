import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const SmoothScrollWrapper = ({
  children,
  options = {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: true,
    touchMultiplier: 2,
  },
}) => {
  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  const y = useTransform(scrollY, (value) => -value);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let target = 0;

    // Set body height to allow native scrollbar
    document.body.style.height = `${container.getBoundingClientRect().height}px`;

    // Wheel event for mouse + touchpad
    const onWheel = (e) => {
      if (!options.smoothWheel) return;
      const delta = e.deltaY * options.wheelMultiplier;
      target = target + delta;
      target = Math.max(0, Math.min(target, container.scrollHeight - window.innerHeight));
      animate(scrollY, target, { duration: options.duration, ease: [0.22, 1, 0.36, 1] });
    };

    // Touch events for real touch screens
    let lastTouchY = null;
    const onTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!options.smoothTouch) return;
      const currentY = e.touches[0].clientY;
      const delta = (lastTouchY - currentY) * options.touchMultiplier;
      target = target + delta;
      target = Math.max(0, Math.min(target, container.scrollHeight - window.innerHeight));
      animate(scrollY, target, { duration: options.duration, ease: [0.22, 1, 0.36, 1] });
      lastTouchY = currentY;
    };
    const onTouchEnd = () => {
      lastTouchY = null;
    };

    // Update scrollY on native scroll (fallback)
    const onScroll = () => {
      if (!options.smoothWheel && !options.smoothTouch) {
        scrollY.set(window.scrollY);
      }
    };

    // Add listeners
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      document.body.style.height = "";
    };
  }, [scrollY, options]);

  return (
    <motion.div ref={containerRef} style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
};

export default SmoothScrollWrapper;
