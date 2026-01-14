/**
 * Script to upload all images from public/ directory to Cloudflare Images
 * 
 * Usage:
 * 1. Set up .env.local with Cloudflare credentials
 * 2. Run: npm run upload:images
 * 
 * This script will:
 * - Upload all images from public/ directory to Cloudflare Images
 * - Maintain folder structure via metadata
 * - Generate a mapping file (cloudflare-images-mapping.json) with local path -> Cloudflare Image ID
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const accountId = process.env.VITE_CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_IMAGES_API_TOKEN;

if (!accountId || !apiToken) {
  console.error('❌ Missing Cloudflare credentials!');
  console.error('Please set up .env.local with:');
  console.error('  VITE_CLOUDFLARE_ACCOUNT_ID=your_account_id');
  console.error('  CLOUDFLARE_IMAGES_API_TOKEN=your_api_token');
  process.exit(1);
}

interface ImageMapping {
  localPath: string;
  cloudflareImageId: string;
  cloudflareUrl: string;
  accountHash: string;
  uploaded: boolean;
}

const mapping: ImageMapping[] = [];
const publicDir = path.resolve(__dirname, '../public');
let accountHash: string | null = null;

/**
 * Get all image files recursively from a directory
 */
function getAllImageFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      // Skip node_modules and other ignored directories
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
        continue;
      }
      files.push(...getAllImageFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Include common image formats (exclude videos/GIFs over 10MB - those go to R2)
      if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
        files.push(fullPath);
      } else if (ext === '.gif') {
        // Check file size - if under 10MB, upload to Images, otherwise skip (will go to R2)
        const stats = fs.statSync(fullPath);
        if (stats.size < 10 * 1024 * 1024) {
          files.push(fullPath);
        }
      }
    }
  }

  return files;
}

/**
 * Convert local file path to content.json path format
 * Example: public/projects/project/image.png -> /projects/project/image.png
 */
function pathToContentPath(filePath: string): string {
  const relativePath = path.relative(publicDir, filePath);
  return `/${relativePath.replace(/\\/g, '/')}`;
}

/**
 * Upload a single image to Cloudflare Images
 */
async function uploadImage(filePath: string): Promise<ImageMapping> {
  const contentPath = pathToContentPath(filePath);
  const fileStats = fs.statSync(filePath);
  
  // Skip files over 10MB (they should go to R2 instead)
  if (fileStats.size > 10 * 1024 * 1024) {
    console.log(`⏭️  Skipping large file (${(fileStats.size / 1024 / 1024).toFixed(2)}MB): ${contentPath}`);
    return {
      localPath: contentPath,
      cloudflareImageId: '',
      cloudflareUrl: '',
      accountHash: '',
      uploaded: false,
    };
  }

  try {
    console.log(`📤 Uploading: ${contentPath}`);

    // Read file as buffer
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), fileName);
    
    // Add metadata to maintain folder structure
    const folderPath = path.dirname(contentPath).replace(/^\//, '');
    if (folderPath) {
      formData.append('metadata', JSON.stringify({ folder: folderPath }));
    }

    // Upload to Cloudflare Images
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    
    // Extract account hash from the response (it's in the variants URLs)
    if (result.result && result.result.variants && result.result.variants.length > 0) {
      const variantUrl = result.result.variants[0];
      // Extract hash from URL: https://imagedelivery.net/{hash}/{id}/{variant}
      const hashMatch = variantUrl.match(/imagedelivery\.net\/([^/]+)\//);
      if (hashMatch && !accountHash) {
        accountHash = hashMatch[1];
        console.log(`✅ Found account hash: ${accountHash}`);
      }
    }

    const imageId = result.result.id;
    const imageUrl = result.result.variants?.[0] || '';

    console.log(`✅ Uploaded: ${imageUrl}`);

    return {
      localPath: contentPath,
      cloudflareImageId: imageId,
      cloudflareUrl: imageUrl,
      accountHash: accountHash || '',
      uploaded: true,
    };
  } catch (error: any) {
    console.error(`❌ Error uploading ${contentPath}:`, error.message);
    return {
      localPath: contentPath,
      cloudflareImageId: '',
      cloudflareUrl: '',
      accountHash: '',
      uploaded: false,
    };
  }
}

/**
 * Main upload function
 */
async function main() {
  console.log('🚀 Starting Cloudflare Images upload...\n');
  console.log(`📁 Scanning: ${publicDir}\n`);

  const imageFiles = getAllImageFiles(publicDir);
  console.log(`Found ${imageFiles.length} image files\n`);

  if (imageFiles.length === 0) {
    console.log('No images found to upload.');
    return;
  }

  // Upload images in batches to avoid rate limits
  const batchSize = 5;
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(uploadImage));
    mapping.push(...results);
    console.log(`\nProgress: ${Math.min(i + batchSize, imageFiles.length)}/${imageFiles.length}\n`);
  }

  // Save account hash to mapping file and .env.local if found
  if (accountHash) {
    // Update .env.local with account hash (if not already present)
    const envPath = path.resolve(__dirname, '../.env.local');
    let envContent = fs.readFileSync(envPath, 'utf-8');
    if (!envContent.includes('VITE_CLOUDFLARE_ACCOUNT_HASH')) {
      envContent += `\nVITE_CLOUDFLARE_ACCOUNT_HASH=${accountHash}\n`;
      fs.writeFileSync(envPath, envContent);
      console.log(`✅ Added account hash to .env.local`);
    }
  }

  // Save mapping file
  const mappingPath = path.resolve(__dirname, '../cloudflare-images-mapping.json');
  fs.writeFileSync(
    mappingPath,
    JSON.stringify(mapping, null, 2)
  );

  const uploadedCount = mapping.filter(m => m.uploaded).length;
  const skippedCount = mapping.filter(m => !m.uploaded && !m.cloudflareImageId).length;
  const failedCount = mapping.filter(m => !m.uploaded && m.cloudflareImageId === '').length;

  console.log('\n📊 Upload Summary:');
  console.log(`  ✅ Uploaded: ${uploadedCount}`);
  console.log(`  ⏭️  Skipped (large files): ${skippedCount}`);
  console.log(`  ❌ Failed: ${failedCount}`);
  console.log(`\n📄 Mapping saved to: cloudflare-images-mapping.json`);
  if (accountHash) {
    console.log(`\n💡 Account hash: ${accountHash} (saved to .env.local)`);
  }
}

main().catch(console.error);
