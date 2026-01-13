"use client";

import React, { ReactNode } from "react";

interface PolarisPageProps {
  heading: string;
  inlineSize?: "base" | "large";
  primaryAction?: ReactNode;
  children: ReactNode;
  noBackground?: boolean; // New prop to remove background for modal use
}

/**
 * PolarisPage - A manual implementation of Polaris s-page component
 * 
 * Matches Polaris design system spacing and layout:
 * - Base size: max-width 672px, padding 24px (mobile) / 34px (desktop)
 * - Large size: full width, padding 16px (mobile) / 24px (desktop)
 * - Background: #f1f1f1 (matches Shopify admin background)
 * - Header spacing: 24px top padding, proper heading styles
 * - Primary action button: aligned to right of header
 */
export default function PolarisPage({
  heading,
  inlineSize = "base",
  primaryAction,
  children,
  noBackground = false,
}: PolarisPageProps) {
  return (
    <div className={noBackground ? "min-h-full w-full" : "bg-[#f1f1f1] min-h-full w-full"}>
      {/* Page Container - 24px padding on left and right, full width content */}
      <div
        className={`w-full px-[24px] pt-[16px] pb-[24px] sm:pb-[32px] lg:pb-[44px]`}
      >
        {/* Page Header - matches Polaris s-page header */}
        <div className="mb-[16px] sm:mb-[20px] flex flex-row items-center justify-between gap-[12px] sm:gap-[16px]">
          {/* Heading */}
          <div className="flex items-center gap-[8px] min-w-0 flex-shrink">
            <h1 className="text-[16px] font-[650] leading-[20px] text-[#303030] tracking-[-0.2px] truncate" style={{ opacity: 1 }}>
              {heading}
            </h1>
          </div>

          {/* Primary Action Slot - matches Polaris slot="primary-action" */}
          {primaryAction && (
            <div className="flex items-center shrink-0">
              {primaryAction}
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="space-y-[16px] sm:space-y-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}
