import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

export default function DoorHandleCheckin() {
  const [animationState, setAnimationState] = useState<'idle' | 'pulling' | 'opening' | 'opened' | 'checked-in'>('idle');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [successCardTop, setSuccessCardTop] = useState<string>('0px');
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const handleControls = useAnimationControls();
  const cardControls = useAnimationControls();
  const bgControls = useAnimationControls();
  const welcomeOverlayControls = useAnimationControls();
  const successControls = useAnimationControls();
  const headerControls = useAnimationControls();

  useEffect(() => {
    // Calculate initial position on mount for default state
    // Use offsetTop relative to the content area parent
    if (cardContainerRef.current && cardContainerRef.current.parentElement) {
      const topOffset = cardContainerRef.current.offsetTop;
      setSuccessCardTop(`${topOffset}px`);
    }
  }, []);

  const handleCheckIn = async () => {
    if (animationState !== 'idle') return;

    // Calculate success card position BEFORE any animations start
    // Use offsetTop relative to the content area parent (more reliable than getBoundingClientRect)
    if (cardContainerRef.current && cardContainerRef.current.parentElement) {
      const topOffset = cardContainerRef.current.offsetTop;
      setSuccessCardTop(`${topOffset}px`);
    }

    // Step 0: Brief pause before door handle animation (user reaction time)
    setAnimationState('pulling');
    await new Promise(resolve => setTimeout(resolve, 200));

    // Step 1: Pull down the door handle (slower, smoother)
    await handleControls.start({
      rotate: 45,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    });

    // Step 2: Swing door open and fade out header
    setAnimationState('opening');

    // Fade out header quickly
    const headerPromise = headerControls.start({
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    });

    // Swing and fade out card (fade starts at 75 degrees, swings to -105)
    await Promise.all([
      cardControls.start({
        rotateY: [-0, -75, -105],
        opacity: [1, 1, 0],
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.71, 1]
        },
      }),
      headerPromise
    ]);

    // Step 3: Show full-screen welcome overlay
    // Reset controls to initial state first
    welcomeOverlayControls.set({ opacity: 0, scale: 0.9 });
    setShowWelcomeOverlay(true);
    // Small delay to ensure component is mounted before animating
    await new Promise(resolve => setTimeout(resolve, 50));
    await welcomeOverlayControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    });

    // Step 4: Pause
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 5: Hide welcome overlay and wait for it to complete
    await welcomeOverlayControls.start({
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    });
    
    // Small delay to ensure welcome overlay animation completes
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Completely remove welcome overlay from DOM
    setShowWelcomeOverlay(false);

    // Step 6: Show success card (only after welcome overlay is completely hidden)
    setAnimationState('opened');
    setIsCheckedIn(true);
    setShowSuccessCard(true);
    // Small delay to ensure component is mounted before animating
    await new Promise(resolve => setTimeout(resolve, 50));
    await successControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    });
  };

  const handleReset = async () => {
    // Close the success card first
    await successControls.start({
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    });
    setShowSuccessCard(false);
    
    // First, restore the header visibility quickly
    await headerControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
    });
    
    // Then reverse door animation - close the door
    // First, ensure card is visible and at starting position for smooth animation
    await cardControls.set({
      rotateY: -105,
      opacity: 0,
    });
    
    // Small delay to ensure state is set
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Now animate smoothly from -105 to 0 with simpler easing
    const doorClosePromise = cardControls.start({
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1], // Simpler, smoother easing
      },
    });
    
    // Wait until door is almost closed (at ~75% of animation = 525ms) before returning badge
    await new Promise(resolve => setTimeout(resolve, 525));
    
    // Return handle/badge to original position after door is almost closed
    await handleControls.start({
      rotate: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    });
    
    // Ensure door animation completes
    await doorClosePromise;
    // Change state to checked-in so the card shows the checked-in UI
    setAnimationState('checked-in');
    // Keep isCheckedIn as true so the checked-in state is visible
    // The card will show the room details and "Contact hotel" button
  };

  const handleFullReset = async () => {
    // Reset everything back to initial state
    setShowSuccessCard(false);
    setIsCheckedIn(false);
    setAnimationState('idle');
    
    // Reset all animations to initial state
    await Promise.all([
      cardControls.start({
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }),
      handleControls.start({
        rotate: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }),
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }),
      welcomeOverlayControls.start({
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }),
      successControls.start({
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }),
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
      {/* Mobile Phone Frame - iPhone 16 Plus */}
      <div className="relative w-[430px] h-[932px] bg-black rounded-[3rem] shadow-2xl p-2.5 border-[10px] border-gray-900">
        {/* Phone Notch - Dynamic Island */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50"></div>

        {/* Phone Screen */}
        <div className="relative w-full h-full bg-gray-50 rounded-[2.75rem] overflow-hidden">

          {/* Trip Details Header */}
          <motion.div
            animate={headerControls}
            initial={{ opacity: 1, y: 0 }}
            className="relative z-20 bg-white rounded-b-3xl shadow-lg overflow-hidden"
          >
            {/* Background Image with Gradient Fade */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/Denver.png)',
                  maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 85%)',
                  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 85%)'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 pt-16 pb-8">
              {/* Trip Title and Badge */}
              <div className="flex items-start justify-between mb-16">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 drop-shadow-sm">Denver trip</h1>
                  <p className="text-sm text-gray-700 font-medium drop-shadow-sm">Oct 21 – Oct 23, 2024</p>
                </div>
                <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  Business
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-full p-1">
                <button className="flex-1 text-sm font-medium text-gray-600 py-2.5 rounded-full transition-colors">
                  Flights
                </button>
                <button className="flex-1 text-sm font-semibold text-gray-900 bg-white py-2.5 rounded-full shadow-sm transition-colors">
                  Hotels
                </button>
                <button className="flex-1 text-sm font-medium text-gray-600 py-2.5 rounded-full transition-colors">
                  Transport
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content Area with Card - positioned with margin-top for relative spacing */}
          <div className="relative left-0 right-0 flex justify-center z-10 mt-8">
            <div className="flex flex-col items-center w-full" style={{ maxWidth: 'calc(100% - 40px)' }}>
            {/* Card Container with 3D perspective */}
          <div 
            ref={cardContainerRef}
            className="relative w-full rounded-2xl overflow-visible" 
            style={{ 
              perspective: '1500px', 
              marginLeft: '20px', 
              marginRight: '20px'
            }}
          >
            {/* Check-in Card that swings open */}
            <motion.div
              animate={cardControls}
              initial={{ rotateY: 0, opacity: 1 }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'right center',
                willChange: (animationState === 'opening' || animationState === 'pulling' || animationState === 'checked-in' || showSuccessCard) ? 'transform' : 'auto',
                backfaceVisibility: 'hidden',
              }}
              className="relative shadow-2xl rounded-2xl"
            >
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Hotel Image */}
                <div className="relative h-36 bg-cover bg-center" style={{ backgroundImage: 'url(/dubtree.png)' }}>
                  {/* Door Handle Badge */}
                  <motion.div
                    animate={handleControls}
                    className="absolute top-3 left-3 font-bold px-3 py-1.5 rounded-full shadow-lg z-10 text-xs flex items-center gap-1 text-white bg-gradient-to-r from-emerald-500 to-teal-600"
                    style={{ transformOrigin: 'left center' }}
                  >
                    {isCheckedIn && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {isCheckedIn ? 'CHECKED IN' : 'CHECK-IN READY'}
                  </motion.div>
                </div>

                {/* Hotel Information */}
                <div className="p-4">
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">
                    DoubleTree by Hilton Denver
                  </h2>
                  <p className="text-gray-600 mb-2 text-xs">
                    Oct 21 – Oct 23 • John Doe + 2 others
                  </p>

                  <div className="flex items-center justify-between text-[10px] mb-4">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Denver, CO
                    </div>
                    <div className="text-gray-500 font-mono">
                      #9658SE146968
                    </div>
                  </div>

                  {/* Room Details - only show when checked in */}
                  {isCheckedIn && (
                    <div className="bg-gray-100 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <p className="text-gray-600 text-[10px] mb-0.5">Room Number</p>
                          <p className="text-base font-bold text-gray-900">412</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-[10px] mb-0.5">Floor</p>
                          <p className="text-base font-bold text-gray-900">4th</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Check in Button */}
                  <button
                    onClick={handleCheckIn}
                    disabled={animationState !== 'idle'}
                    className={`w-full font-semibold py-2.5 rounded-full transition-colors disabled:cursor-not-allowed text-sm ${
                      isCheckedIn
                        ? 'bg-gray-50 text-emerald-600 border-2 border-emerald-600 hover:bg-gray-100'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
                    }`}
                  >
                    {isCheckedIn ? 'Contact hotel' : 'Check in'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reset Button - positioned below the card, only show when checked-in */}
          {isCheckedIn && animationState === 'checked-in' && (
            <button
              onClick={handleFullReset}
              className="text-blue-600 hover:text-blue-700 text-xs font-mono transition-colors mt-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              reset
            </button>
          )}
            </div>

          {/* Success Card - positioned relative to content area */}
          {showSuccessCard && (
            <motion.div
              animate={successControls}
              initial={{ opacity: 0, scale: 0.9 }}
              className="absolute bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-5 z-[60]"
              style={{ 
                left: '20px',
                right: '20px',
                top: successCardTop,
                pointerEvents: 'auto'
              }}
            >
            {/* Close X button */}
            <motion.button
              onClick={handleReset}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={showSuccessCard ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, delay: 1.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Success Icon */}
            <motion.div
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 mx-auto relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={animationState === 'opened' ? {
                scale: [0, 1.3, 0.9, 1.1, 1],
                rotate: [0, 10, -10, 5, 0],
              } : {}}
              transition={{
                duration: 1.2,
                times: [0, 0.4, 0.6, 0.8, 1],
                ease: "easeOut",
                delay: 0.4
              }}
            >
              {/* Ripple effects */}
              <motion.div
                className="absolute inset-0 bg-emerald-400 rounded-full"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={animationState === 'opened' ? { scale: [1, 2.5, 3.5], opacity: [0.6, 0.3, 0] } : {}}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-emerald-300 rounded-full"
                initial={{ scale: 0, opacity: 0.4 }}
                animate={animationState === 'opened' ? { scale: [1, 2.5, 3.5], opacity: [0.4, 0.2, 0] } : {}}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              />

              {/* Check Icon */}
              <motion.svg
                className="w-8 h-8 text-emerald-500 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                animate={animationState === 'opened' ? { rotate: [0, -10, 5, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={animationState === 'opened' ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
                />
              </motion.svg>
            </motion.div>

            {/* Success Message */}
            <motion.p
              className="text-xl font-bold mb-1 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={animationState === 'opened' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              You're checked in!
            </motion.p>

            <motion.p
              className="text-white/90 text-center mb-5 text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={animationState === 'opened' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              DoubleTree by Hilton Denver
            </motion.p>

            {/* Room Details */}
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 w-full mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={animationState === 'opened' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="grid grid-cols-2 gap-3 text-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={animationState === 'opened' ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <p className="text-white/80 text-[10px] mb-0.5">Room Number</p>
                  <p className="text-lg font-bold text-white">412</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={animationState === 'opened' ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <p className="text-white/80 text-[10px] mb-0.5">Floor</p>
                  <p className="text-lg font-bold text-white">4th</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          )}

          {/* Full-screen Welcome Overlay - only render when showWelcomeOverlay is true */}
          {showWelcomeOverlay && (
            <motion.div
              animate={welcomeOverlayControls}
              initial={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-40"
              style={{ 
                pointerEvents: 'auto'
              }}
            >
            <h1 className="text-3xl font-bold text-gray-900 text-center px-8">
              Contacting the hotel
              <span className="inline-flex ml-1">
                <motion.span
                  animate={animationState === 'opening' ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.6, delay: 0 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={animationState === 'opening' ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.6, delay: 0.15 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={animationState === 'opening' ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.6, delay: 0.3 }}
                >
                  .
                </motion.span>
              </span>
            </h1>
          </motion.div>
          )}
          </div>
          {/* End Content Area */}

        </div>
      </div>
    </div>
  );
}
