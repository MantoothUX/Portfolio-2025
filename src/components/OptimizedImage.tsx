import { useState } from 'react';
import { generateCloudflareImageUrl } from '../lib/cloudflare';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string; // applied to <img>
  containerClassName?: string; // applied to wrapper <div>
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  cloudflareImageId?: string; // Cloudflare Images ID
  cloudflareR2Url?: string; // R2 URL for videos/large files
  accountHash?: string; // Account hash for Cloudflare Images (optional, can come from env)
  style?: React.CSSProperties; // applied to <img>
}

/**
 * OptimizedImage component that supports Cloudflare Images and R2
 * Priority: cloudflareR2Url > cloudflareImageId > local src
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  width,
  height,
  loading = 'lazy',
  cloudflareImageId,
  cloudflareR2Url,
  accountHash,
  style
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Determine which URL to use (priority: R2 > Images > local)
  let imageUrl = src;
  
  if (cloudflareR2Url) {
    // Use R2 URL for videos/large files
    imageUrl = cloudflareR2Url;
  } else if (cloudflareImageId) {
    // Use Cloudflare Images with optimizations
    const cloudflareUrl = generateCloudflareImageUrl(cloudflareImageId, accountHash, {
      width: width,
      height: height,
      format: 'auto',
      quality: 90, // High quality (adjust as needed)
    });
    
    if (cloudflareUrl) {
      imageUrl = cloudflareUrl;
    }
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-900 z-10">
          <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-gray-400 z-10">
          <span style={{ fontFamily: "'balto', sans-serif" }}>Failed to load image</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          style={style}
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
