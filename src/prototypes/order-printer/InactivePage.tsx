
import { Link, useLocation, useSearchParams } from "react-router-dom";

interface InactivePageProps {
  pageName: string;
}

export default function InactivePage({ pageName }: InactivePageProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get iteration from query params or default to v1
  const iteration = searchParams.get("iteration") || "v1";
  
  // Link back to the order printer landing page for the current iteration
  const returnLink = `/prototypes/order-printer?iteration=${iteration}`;
  
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
      <div 
        className="bg-white rounded-[12px] shadow-sm border-0 overflow-hidden"
        style={{
          padding: "16px",
          boxShadow: "0px 5px 5px -2.5px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.02), 0px 2px 2px -1px rgba(0,0,0,0.02), 0px 1px 1px -0.5px rgba(0,0,0,0.03), 0px 0.5px 0.5px 0px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(0,0,0,0.06)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-[32px] py-8">
          {/* Icon and Heading Section */}
          <div className="flex flex-col items-center gap-[24px]">
            {/* Empty State Illustration */}
            <div className="flex items-center justify-center" style={{ height: "100px", width: "130px" }}>
              <img 
                src="/Order_printer_proto/icons/empty_illo.svg" 
                alt="Empty state" 
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            
            {/* Heading */}
            <h2 
              className="font-semibold text-black text-center"
              style={{
                fontSize: "20px",
                lineHeight: "20px",
                fontFamily: "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              This page is not yet available
            </h2>
          </div>
          
          {/* Link Section */}
          <Link 
            to={returnLink}
            className="flex items-center gap-[16px] text-[#2f80ed] hover:opacity-80 transition-opacity"
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              fontFamily: "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif",
              textDecoration: "none",
            }}
          >
            {/* Arrow Left Icon */}
            <div 
              style={{ 
                width: "20px", 
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg 
                width="9.5" 
                height="13" 
                viewBox="0 0 9.5 13" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0 6.5L9.5 0V13L0 6.5Z" 
                  fill="#2f80ed"
                />
              </svg>
            </div>
            
            {/* Link Text */}
            <span style={{ whiteSpace: "nowrap" }}>
              Return to order printer app
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

