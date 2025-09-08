import cron from 'node-cron';
import { fluffyshareProcessor } from './fluffyshare-processor';

interface CronJobOptions {
  timezone?: string;
  enabled?: boolean;
}

export class FluffyshareCronManager {
  private jobs: Map<string, cron.ScheduledTask> = new Map();
  private isInitialized = false;

  constructor() {
    this.initializeJobs();
  }

  private initializeJobs() {
    if (this.isInitialized) return;

    // Daily processing at 3:00 AM UTC
    this.scheduleJob('daily-processing', '0 3 * * *', this.runDailyProcessing.bind(this), {
      timezone: 'UTC',
      enabled: true
    });

    // Cleanup old data weekly at 2:00 AM UTC on Sundays
    this.scheduleJob('weekly-cleanup', '0 2 * * 0', this.runWeeklyCleanup.bind(this), {
      timezone: 'UTC',
      enabled: true
    });

    this.isInitialized = true;
    console.log('🕒 Fluffyshare cron jobs initialized');
  }

  private scheduleJob(
    name: string,
    schedule: string,
    task: () => Promise<void>,
    options: CronJobOptions = {}
  ) {
    if (this.jobs.has(name)) {
      console.log(`⚠️ Job ${name} already exists, replacing...`);
      this.jobs.get(name)?.destroy();
    }

    const job = cron.schedule(schedule, async () => {
      console.log(`🚀 Starting ${name} at ${new Date().toISOString()}`);
      
      try {
        await task();
        console.log(`✅ Completed ${name} at ${new Date().toISOString()}`);
      } catch (error) {
        console.error(`❌ Failed ${name} at ${new Date().toISOString()}:`, error);
      }
    }, {
      scheduled: options.enabled !== false,
      timezone: options.timezone || 'UTC'
    });

    this.jobs.set(name, job);
    console.log(`📅 Scheduled ${name}: ${schedule} (${options.timezone || 'UTC'})`);
  }

  private async runDailyProcessing() {
    console.log('🍯 Starting daily Fluffyshare processing...');
    
    const result = await fluffyshareProcessor.processFluffyshareData({
      processType: 'daily_batch',
      maxTweets: 2000,
      windowHours: 48
    });

    if (result.success) {
      console.log(`✅ Daily processing completed successfully:`, {
        tweetsProcessed: result.metrics.tweetsProcessed,
        accountsUpdated: result.metrics.accountsUpdated,
        scoresComputed: result.metrics.scoresComputed,
        duration: `${result.metrics.duration}ms`,
        logId: result.logId
      });
    } else {
      console.error('❌ Daily processing failed:', {
        errors: result.errors,
        logId: result.logId
      });
    }
  }

  private async runWeeklyCleanup() {
    console.log('🧹 Starting weekly cleanup...');
    
    try {
      // This would involve cleaning old processing logs, optimizing database, etc.
      // For now, just log that it ran
      console.log('✅ Weekly cleanup completed');
    } catch (error) {
      console.error('❌ Weekly cleanup failed:', error);
    }
  }

  /**
   * Start all scheduled jobs
   */
  start() {
    console.log('▶️ Starting Fluffyshare cron jobs...');
    
    this.jobs.forEach((job, name) => {
      if (!job.getStatus()) {
        job.start();
        console.log(`✅ Started ${name}`);
      }
    });
  }

  /**
   * Stop all scheduled jobs
   */
  stop() {
    console.log('⏹️ Stopping Fluffyshare cron jobs...');
    
    this.jobs.forEach((job, name) => {
      if (job.getStatus()) {
        job.stop();
        console.log(`⏸️ Stopped ${name}`);
      }
    });
  }

  /**
   * Get status of all jobs
   */
  getStatus() {
    const status: { [key: string]: boolean } = {};
    
    this.jobs.forEach((job, name) => {
      status[name] = job.getStatus();
    });
    
    return status;
  }

  /**
   * Manually trigger a specific job
   */
  async triggerJob(jobName: string) {
    switch (jobName) {
      case 'daily-processing':
        await this.runDailyProcessing();
        break;
      case 'weekly-cleanup':
        await this.runWeeklyCleanup();
        break;
      default:
        throw new Error(`Unknown job: ${jobName}`);
    }
  }

  /**
   * Destroy all jobs and clean up
   */
  destroy() {
    console.log('🗑️ Destroying Fluffyshare cron jobs...');
    
    this.jobs.forEach((job, name) => {
      job.destroy();
      console.log(`🗑️ Destroyed ${name}`);
    });
    
    this.jobs.clear();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const fluffyshareCronManager = new FluffyshareCronManager();

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  fluffyshareCronManager.start();
  console.log('🚀 Fluffyshare cron jobs auto-started in production mode');
}