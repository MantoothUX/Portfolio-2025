import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ToastProps {
  /**
   * The message to display in the toast
   * @default "Template saved"
   */
  message?: string;
  /**
   * Whether the toast is currently visible (controlled mode)
   */
  isVisible?: boolean;
  /**
   * Alias for isVisible for backward compatibility
   */
  show?: boolean;
  /**
   * Callback when close button is clicked or auto-dismiss
   */
  onClose?: () => void;
  /**
   * Duration in ms to auto-dismiss. 0 to disable.
   * @default 3000
   */
  duration?: number;
}

// @component: Toast
export const Toast = ({
  message = "Template saved",
  isVisible: controlledVisible,
  show,
  onClose,
  duration = 3000
}: ToastProps) => {
  const [internalVisible, setInternalVisible] = useState(false);

  // Use show prop if provided, otherwise use isVisible, otherwise use internal state
  const isVisible = show !== undefined ? show : (controlledVisible !== undefined ? controlledVisible : internalVisible);

  const handleClose = useCallback(() => {
    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
    onClose?.();
  }, [controlledVisible, onClose]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, handleClose]);

  // Shadow copied from the specific values in the HTML to match perfectly
  const specificShadow = "0px 20px 32px -12px rgba(0, 0, 0, 0.2), 0px 10px 16px -6px rgba(0, 0, 0, 0.08), 0px 3px 6px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.06)";

  // @return
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.95
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            mass: 1
          }}
          className={cn(
            "flex items-center gap-4",
            "bg-[#1a1a1a] text-[#e3e3e3]",
            "rounded-[8px] p-[12px]",
            "w-auto inline-flex",
            "box-border",
            "flex-shrink-0"
          )}
          style={{
            boxShadow: specificShadow,
            // Ensure font smoothing matches the high-quality look of the original
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="text-center font-medium m-0 tracking-normal leading-5"
              style={{
                fontSize: '13px',
                fontWeight: 550
              }}
            >
              {message}
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center self-center flex-col cursor-pointer ml-2 p-0 bg-transparent border-none text-[#e3e3e3] hover:text-white transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] focus-visible:ring-white/30 rounded-sm"
            aria-label="Close"
          >
            <div aria-hidden="true" className="flex items-center justify-center w-5 h-5">
              <X size={16} strokeWidth={2.5} />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

