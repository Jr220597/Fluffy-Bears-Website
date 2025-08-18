'use client';

import { motion } from 'framer-motion';

interface PointsDisplayProps {
  points: number;
  rewards: string;
  isLoading?: boolean;
}

const PointsDisplay = ({ points, rewards, isLoading = false }: PointsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      <motion.div 
        className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-md border border-amber-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-amber-900 text-lg font-bold mb-2">
          Total Points
        </h3>
        
        {isLoading ? (
          <div className="animate-pulse h-10 bg-amber-200 rounded-lg w-40"></div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-amber-600">
              {points.toLocaleString()}
            </span>
            <span className="ml-2 text-amber-700">
              points
            </span>
          </div>
        )}
        
        <p className="mt-3 text-amber-700 text-sm">
          Points accumulate based on the duration each NFT has been staked. The longer you stake, the more points you earn.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md border border-blue-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-blue-900 text-lg font-bold mb-2">
          Available Rewards
        </h3>
        
        {isLoading ? (
          <div className="animate-pulse h-10 bg-blue-200 rounded-lg w-40"></div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-600">
              {rewards}
            </span>
            <span className="ml-2 text-blue-700">
              BGT
            </span>
          </div>
        )}
        
        <p className="mt-3 text-blue-700 text-sm">
          Rewards are distributed every 45 days based on accumulated points.
        </p>
      </motion.div>
    </div>
  );
};

export default PointsDisplay; 