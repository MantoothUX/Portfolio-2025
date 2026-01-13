"use client";

import { ReactNode } from "react";

/**
 * PolarisIcon - Wrapper component for Shopify Polaris icons
 * 
 * This component ensures consistent sizing and styling for all Polaris icons
 * used in Shopify prototypes. All icons should be 14x14px to match Polaris spec.
 * 
 * Usage:
 * <PolarisIcon>
 *   <YourIconSVG />
 * </PolarisIcon>
 */
interface PolarisIconProps {
  children: ReactNode;
  className?: string;
}

export default function PolarisIcon({ children, className = "" }: PolarisIconProps) {
  return (
    <div className={`relative shrink-0 size-[14px] flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}



