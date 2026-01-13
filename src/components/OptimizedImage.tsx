import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  cloudinaryPublicId?: string; // If using Cloudinary, provide public ID
}

/**
 * OptimizedImage component that supports Cloudinary optimization
 * If cloudinaryPublicId is provided, uses Cloudinary URL with transformations
 * Otherwise, uses the src URL directly
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  cloudinaryPublicId
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // If Cloudinary public ID is provided, generate optimized URL
  const getOptimizedUrl = () => {
    if (cloudinaryPublicId) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
      const transformations = [
        'f_auto', // Auto format (WebP/AVIF)
        'q_auto', // Auto quality
        width ? `w_${width}` : 'w_auto', // Responsive width
        'c_limit', // Maintain aspect ratio
        'dpr_auto' // Device pixel ratio
      ].filter(Boolean).join(',');
      return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cloudinaryPublicId}`;
    }
    return src;
  };

  const imageUrl = getOptimizedUrl();

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
          <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-gray-400">
          <span style={{ fontFamily: "'balto', sans-serif" }}>Failed to load image</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
