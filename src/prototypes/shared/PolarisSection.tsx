"use client";

import React, { ReactNode } from "react";

interface PolarisSectionProps {
  heading?: string;
  children: ReactNode;
}

/**
 * PolarisSection - A manual implementation of Polaris s-section component
 * 
 * Matches Polaris design system:
 * - Card appearance with white background
 * - Rounded corners (12px)
 * - Padding: 16px (mobile) / 20px (desktop)
 * - Shadow matching Polaris card shadow
 * - Proper spacing between sections
 */
export default function PolarisSection({
  heading,
  children,
}: PolarisSectionProps) {
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_5px_5px_-2.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.02),0px_2px_2px_-1px_rgba(0,0,0,0.02),0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_0.5px_0.5px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]">
      <div className="p-[16px] sm:p-[20px]">
        {heading && (
          <h2 className="text-[16px] sm:text-[18px] font-[600] leading-[20px] sm:leading-[24px] text-[#303030] mb-[12px] sm:mb-[16px]">
            {heading}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}



