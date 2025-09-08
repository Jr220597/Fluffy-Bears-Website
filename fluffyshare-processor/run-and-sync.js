#!/usr/bin/env node

import { syncFiles } from './sync-data.js';

/**
 * Complete workflow: Process data and sync to main site
 */

async function runCompleteWorkflow() {
  console.log('🚀 Starting complete Fluffyshare workflow...');
  console.log('=' .repeat(60));
  
  try {
    // Step 1: Run the processor
    console.log('📊 Step 1: Running data processor...');
    
    const { default: processor } = await import('./index.js');
    // The processor will run automatically when imported
    
    // Step 2: Sync files
    console.log('\n🔄 Step 2: Syncing data files...');
    await syncFiles();
    
    console.log('\n🎉 Complete workflow finished!');
    console.log('=' .repeat(60));
    console.log('✅ Data processed and synced');
    console.log('📡 Ready for Vercel deployment');
    console.log('\nNext steps:');
    console.log('1. cd .. (back to main project)');
    console.log('2. vercel --prod (deploy to production)');
    console.log('3. Check https://your-site.vercel.app/twitter-game');

  } catch (error) {
    console.error('❌ Workflow failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCompleteWorkflow();
}