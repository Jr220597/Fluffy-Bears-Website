#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Script to sync generated data files to the main site's public directory
 */

const SOURCE_DIR = '../public/data/fluffyshare';
const DEST_DIR = '../public/data/fluffyshare';

const FILES_TO_SYNC = [
  'leaderboard.json',
  'stats.json', 
  'last-updated.json',
  'metadata.json'
];

async function syncFiles() {
  console.log('🔄 Starting data sync...');
  
  try {
    // Ensure destination directory exists
    if (!fs.existsSync(DEST_DIR)) {
      fs.mkdirSync(DEST_DIR, { recursive: true });
      console.log(`📁 Created destination directory: ${DEST_DIR}`);
    }

    let syncedCount = 0;
    let errorCount = 0;

    for (const filename of FILES_TO_SYNC) {
      const sourcePath = path.join(SOURCE_DIR, filename);
      const destPath = path.join(DEST_DIR, filename);

      try {
        if (fs.existsSync(sourcePath)) {
          // Read source file
          const data = fs.readFileSync(sourcePath, 'utf8');
          
          // Write to destination
          fs.writeFileSync(destPath, data);
          
          console.log(`✅ Synced: ${filename}`);
          syncedCount++;
        } else {
          console.warn(`⚠️  Source file not found: ${filename}`);
        }
      } catch (error) {
        console.error(`❌ Error syncing ${filename}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n🎉 Sync completed!`);
    console.log(`✅ Files synced: ${syncedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    
    if (syncedCount > 0) {
      console.log(`\n📡 Ready to deploy to Vercel!`);
      console.log(`   Run: vercel --prod`);
    }

  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncFiles();
}

export { syncFiles };