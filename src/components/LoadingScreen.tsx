import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, hsl(220 20% 8%) 0%, hsl(220 18% 12%) 100%)'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Decorative gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: 'hsl(var(--primary))' }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
              style={{ background: 'hsl(var(--accent))' }}
            />
          </div>

          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo text with gradient */}
            <div className="flex flex-col items-center gap-2">
              <span 
                className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: 'var(--gradient-primary)',
                  fontFamily: 'Space Grotesk, system-ui, sans-serif'
                }}
              >
                Unbound
              </span>
              <p 
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Agency
              </p>
            </div>

            {/* Elegant loading bar */}
            <div className="w-40 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  backgroundImage: 'var(--gradient-primary)'
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
