import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Home, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getWorkflow } from "../lib/workflows";

export default function WorkflowFloatingNav() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Extract current workflow and iteration from pathname and query params
  const pathParts = location.pathname?.split("/").filter(Boolean) || [];
  // Check if we're on the order-printer prototype page
  // Paths can be: /prototypes/order-printer or /prototypes/order-printer/[subpage]
  // After filter(Boolean), pathParts[0] = "prototypes", pathParts[1] = "order-printer"
  const isOrderPrinter = pathParts[0] === "prototypes" && pathParts[1] === "order-printer";
  const currentWorkflowId = isOrderPrinter ? "order-printer" : null;
  const currentIterationId = searchParams.get("iteration") || null;
  
  // Get the current workflow to show its iterations
  const currentWorkflow = currentWorkflowId ? getWorkflow(currentWorkflowId) : null;
  
  // Debug logging (remove in production)
  useEffect(() => {
    if (isOrderPrinter) {
      console.log("WorkflowFloatingNav Debug:", {
        pathname: location.pathname,
        pathParts,
        currentWorkflowId,
        currentWorkflow,
        currentIterationId,
        workflowFound: !!currentWorkflow
      });
    }
  }, [location.pathname, currentWorkflowId, currentWorkflow, currentIterationId, isOrderPrinter, pathParts]);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    }

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handleIterationChange = (iterationId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("iteration", iterationId);
    setSearchParams(newSearchParams);
    setIsPopoverOpen(false);
  };

  return (
    <nav className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3 relative">
        {/* Home Button */}
        <Link
          to="/prototypes"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all hover:bg-white dark:hover:bg-zinc-900"
          aria-label="Go to prototypes"
        >
          <Home className="w-5 h-5" style={{ color: '#00ff88' }} />
        </Link>

        {/* Adjustment/Settings Button with Popover */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all hover:bg-white dark:hover:bg-zinc-900 ${
              isPopoverOpen ? "bg-white dark:bg-zinc-900" : ""
            }`}
            aria-label="Switch version"
          >
            <img 
              src="/Order_printer_proto/icons/Menu_vert-Desktop.svg" 
              alt="Menu" 
              className="w-5 h-5"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(67%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(1.1) contrast(1.1)',
                WebkitFilter: 'brightness(0) saturate(100%) invert(67%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(1.1) contrast(1.1)'
              }}
            />
          </button>

          {/* Popover */}
          <AnimatePresence>
            {isPopoverOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-2 bg-[#0a0a0a] border border-[#00ff88]/30 rounded-lg shadow-xl p-2 min-w-[220px] backdrop-blur-xl"
                style={{ boxShadow: '0 10px 40px rgba(0, 255, 136, 0.2)' }}
              >
                <div className="py-1">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[#00ff88]/20 mb-2">
                    <div className="text-xs font-semibold text-[#00ff88] uppercase tracking-wider">
                      Switch Version
                    </div>
                    <button
                      onClick={() => setIsPopoverOpen(false)}
                      className="p-1 hover:bg-[#00ff88]/10 rounded transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4 text-[#00ff88]/80" />
                    </button>
                  </div>
                  {currentWorkflow ? (
                    <div>
                      <div className="px-3 py-1 text-xs font-medium text-[#00ff88]/60 mb-1">
                        {currentWorkflow.name}
                      </div>
                      {currentWorkflow.iterations.map((iteration) => {
                        const isActive = iteration.id === currentIterationId;
                        return (
                          <button
                            key={iteration.id}
                            onClick={() => handleIterationChange(iteration.id)}
                            className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive
                                ? "bg-[#00ff88]/20 text-[#00ff88] font-medium"
                                : "text-[#00ff88]/80 hover:bg-[#00ff88]/10"
                            }`}
                          >
                            {iteration.name}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="px-3 py-2 text-sm text-[#00ff88]/60">
                      No versions available
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
