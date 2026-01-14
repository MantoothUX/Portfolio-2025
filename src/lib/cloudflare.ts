/**
 * Cloudflare helper functions for generating optimized image URLs
 */

interface CloudflareImageOptions {
  width?: number;
  height?: number;
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  quality?: number; // 1-100
  variant?: string; // Custom variant name (e.g., 'thumbnail', 'hero', 'gallery')
}

/**
 * Generate a Cloudflare Images URL with optional transformations
 * @param imageId - Cloudflare Images ID
 * @param accountHash - Account hash from Cloudflare (obtained from upload response)
 * @param options - Optional transformation options
 * @returns Optimized Cloudflare Images URL or null if not configured
 */
export function generateCloudflareImageUrl(
  imageId: string,
  accountHash?: string,
  options: CloudflareImageOptions = {}
): string | null {
  if (!imageId) {
    return null;
  }

  // Cloudflare Images URL format: https://imagedelivery.net/{accountHash}/{imageId}/{variant}
  // Account hash is obtained from the upload API response
  // If not provided, we'll need to get it from environment or mapping file
  const hash = accountHash || import.meta.env.VITE_CLOUDFLARE_ACCOUNT_HASH;
  
  if (!hash) {
    // Fallback: try to construct URL without hash (may not work)
    console.warn('Cloudflare account hash not found. Image may not load correctly.');
    return null;
  }

  const variant = options.variant || 'public';
  const baseUrl = `https://imagedelivery.net/${hash}/${imageId}/${variant}`;
  
  // Cloudflare Images supports transformations via URL parameters
  const params: string[] = [];
  
  if (options.width) params.push(`width=${options.width}`);
  if (options.height) params.push(`height=${options.height}`);
  if (options.fit) params.push(`fit=${options.fit}`);
  if (options.format && options.format !== 'auto') params.push(`format=${options.format}`);
  if (options.quality) params.push(`quality=${options.quality}`);
  
  return params.length > 0 ? `${baseUrl}?${params.join('&')}` : baseUrl;
}

/**
 * Generate an R2 public URL for a file
 * @param fileKey - File path/key in R2 bucket
 * @returns R2 public URL or null if not configured
 */
export function generateR2Url(fileKey: string): string | null {
  const endpoint = import.meta.env.CLOUDFLARE_R2_ENDPOINT;
  const bucketName = import.meta.env.CLOUDFLARE_R2_BUCKET_NAME;
  
  if (!endpoint || !bucketName || !fileKey) {
    return null;
  }

  // Remove leading slash from fileKey if present
  const cleanKey = fileKey.startsWith('/') ? fileKey.slice(1) : fileKey;
  
  // R2 public URL format: https://{bucket}.{account_id}.r2.cloudflarestorage.com/{fileKey}
  // Or if using custom domain: https://{custom-domain}/{fileKey}
  // For now, we'll use the endpoint format
  const baseUrl = endpoint.replace(/\/$/, ''); // Remove trailing slash
  return `${baseUrl}/${cleanKey}`;
}

/**
 * Get Cloudflare Image ID from a local file path
 * Helper function to map local paths to Cloudflare Image IDs
 * @param localPath - Local file path (e.g., "/projects/project/image.png")
 * @returns Cloudflare Image ID or null
 */
export function getCloudflareImageId(localPath: string): string | null {
  // This will be populated by the upload script via mapping file
  // For now, return null to use fallback
  return null;
}

/**
 * Check if Cloudflare is configured
 */
export function isCloudflareConfigured(): boolean {
  return !!(
    import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID &&
    import.meta.env.CLOUDFLARE_IMAGES_API_TOKEN
  );
}
