'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Users, Hash, Activity, Home, Download, Search, Zap, Star, Crown, Medal, RefreshCw, Clock, Award, Eye, X } from 'lucide-react';

interface FluffyshareUser {
  userId: string;
  username: string;
  displayName: string | null;
  totalScore: number;
  tweetCount: number;
  avgScore: number;
  fluffyFollowers: number;
  bonusMultiplier: number;
  verified: boolean;
  profileImage: string | null;
  rank: number;
}

interface FluffyshareStats {
  totalUsers: number;
  totalTweets: number;
  totalScore: number;
  avgScore: number;
  topFluffyFollower: {
    username: string;
    fluffyFollowers: number;
  } | null;
  processingStatus: {
    lastProcessed: string | null;
    status: 'idle' | 'processing' | 'error';
    nextRun: string | null;
  };
}

interface UserDetails {
  account: {
    username: string;
    displayName: string | null;
    verified: boolean;
    followersCount: number;
    fluffyFollowers: number;
    bonusMultiplier: number;
    botScore: number;
    profileImage: string | null;
  };
  totalScore: number;
  tweetCount: number;
  avgScore: number;
  scores: Array<{
    tweet: {
      tweetId: string;
      text: string;
      createdAt: Date;
      type: string;
      likeCount: number;
      retweetCount: number;
      replyCount: number;
    };
    score: {
      finalScore: number;
      rawScore: number;
      decayFactor: number;
      bonusMultiplier: number;
      botPenalty: number;
    };
  }>;
}

export default function FluffysharePage() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'stats' | 'processing'>('leaderboard');
  const [leaderboard, setLeaderboard] = useState<FluffyshareUser[]>([]);
  const [stats, setStats] = useState<FluffyshareStats | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeWindow, setTimeWindow] = useState<7 | 30 | 90>(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/fluffyshare/leaderboard?window=${timeWindow}&limit=100`);
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard || []);
        setStats(data.stats || null);
      } else {
        setError('Failed to load Fluffyshare leaderboard');
      }
    } catch (err) {
      setError('Error connecting to API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`/api/fluffyshare/user/${userId}?window=${timeWindow}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedUser(data.user);
        setShowUserModal(true);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const triggerProcessing = async () => {
    try {
      const response = await fetch('/api/fluffyshare/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'manual_trigger' })
      });
      const data = await response.json();
      
      if (data.success) {
        // Refresh data after processing
        setTimeout(fetchLeaderboard, 2000);
      }
    } catch (err) {
      console.error('Error triggering processing:', err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [timeWindow]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const tabs = [
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'stats', label: 'Analytics', icon: TrendingUp },
    { id: 'processing', label: 'Processing', icon: Activity },
  ] as const;

  const timeWindows = [
    { days: 7, label: '7 Days' },
    { days: 30, label: '30 Days' },
    { days: 90, label: '90 Days' },
  ];

  const filteredLeaderboard = leaderboard.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.displayName && user.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-yellow-600" />;
    return <span className="text-lg font-bold text-amber-600">#{rank}</span>;
  };

  const formatScore = (score: number) => {
    if (score >= 1000) return `${(score / 1000).toFixed(1)}k`;
    return score.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <a
                  href="/"
                  className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-amber-800 px-4 py-2 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  <Home size={20} />
                  Home
                </a>
                <h1 className="text-4xl font-bold text-amber-800">
                  🍯 Fluffyshare
                </h1>
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  BETA
                </div>
              </div>
              <p className="text-lg text-amber-700 max-w-2xl">
                Mindshare ranking for @Fluffy_Bearss mentions • Powered by social engagement metrics
              </p>
              {stats?.processingStatus && (
                <div className="text-sm text-amber-600 mt-2">
                  {stats.processingStatus.lastProcessed ? (
                    <span>
                      📊 Last updated: {new Date(stats.processingStatus.lastProcessed).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-yellow-600">⏳ Processing data...</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchLeaderboard}
                disabled={loading}
                className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={triggerProcessing}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Process Now
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {activeTab === 'leaderboard' && (
              <>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2">
                  {timeWindows.map((window) => (
                    <button
                      key={window.days}
                      onClick={() => setTimeWindow(window.days as 7 | 30 | 90)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        timeWindow === window.days
                          ? 'bg-blue-500 text-white'
                          : 'text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {window.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Search size={20} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none placeholder-gray-400 text-gray-700"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-amber-700">Loading Fluffyshare data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-lg"
            >
              <strong>Error:</strong> {error}
            </motion.div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && stats && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tweets</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalTweets}</p>
                    </div>
                    <Hash className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Score</p>
                      <p className="text-3xl font-bold text-amber-600">{formatScore(stats.totalScore)}</p>
                    </div>
                    <Star className="h-8 w-8 text-amber-500" />
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Score</p>
                      <p className="text-3xl font-bold text-purple-600">{formatScore(stats.avgScore)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Quick Stats */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-amber-200">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-amber-200">
                    <p className="text-sm font-medium text-gray-600">Total Mentions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalTweets}</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-amber-200">
                    <p className="text-sm font-medium text-gray-600">Total Score</p>
                    <p className="text-2xl font-bold text-amber-600">{formatScore(stats.totalScore)}</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-amber-200">
                    <p className="text-sm font-medium text-gray-600">Top Fluffy Follower</p>
                    <p className="text-lg font-bold text-purple-600">
                      {stats.topFluffyFollower ? `@${stats.topFluffyFollower.username}` : 'N/A'}
                    </p>
                  </div>
                </div>
              )}

              {/* Leaderboard */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-amber-200">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Trophy className="w-6 h-6" />
                      Mindshare Leaderboard ({timeWindow} Days)
                    </h3>
                    <div className="flex items-center gap-2 text-amber-100">
                      <span className="text-sm">Showing {filteredLeaderboard.length} users</span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {filteredLeaderboard.length === 0 ? (
                    <div className="px-6 py-12 text-center text-gray-500">
                      <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No users found matching your search</p>
                    </div>
                  ) : (
                    filteredLeaderboard.map((user, index) => (
                      <motion.div
                        key={user.userId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-6 py-4 hover:bg-amber-50/50 transition-colors cursor-pointer ${
                          user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : ''
                        }`}
                        onClick={() => fetchUserDetails(user.userId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Rank */}
                            <div className="flex items-center justify-center w-12 h-12">
                              {getRankIcon(user.rank)}
                            </div>

                            {/* Profile */}
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold shadow-lg">
                                {user.profileImage ? (
                                  <img
                                    src={user.profileImage}
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                ) : (
                                  user.username.charAt(0).toUpperCase()
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-bold text-gray-900">@{user.username}</p>
                                  {user.verified && (
                                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {user.displayName || user.username}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>{user.tweetCount} tweets</span>
                                  <span>{user.fluffyFollowers} 🍯 followers</span>
                                  <span>{user.bonusMultiplier.toFixed(1)}x bonus</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Score */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-amber-600">
                              {formatScore(user.totalScore)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatScore(user.avgScore)} avg
                            </p>
                            {user.fluffyFollowers > 0 && (
                              <div className="flex items-center gap-1 text-xs text-purple-600 justify-end">
                                <Star className="w-3 h-3" />
                                <span>+{((user.bonusMultiplier - 1) * 100).toFixed(0)}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Processing Tab */}
          {activeTab === 'processing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-green-500" />
                  Processing Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Current Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <strong className={stats?.processingStatus.status === 'processing' ? 'text-yellow-600' : 'text-green-600'}>
                          {stats?.processingStatus.status || 'idle'}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Last processed:</span>
                        <strong>
                          {stats?.processingStatus.lastProcessed 
                            ? new Date(stats.processingStatus.lastProcessed).toLocaleString()
                            : 'Never'
                          }
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Next scheduled:</span>
                        <strong>
                          {stats?.processingStatus.nextRun 
                            ? new Date(stats.processingStatus.nextRun).toLocaleString()
                            : 'N/A'
                          }
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
                    <div className="space-y-3">
                      <button
                        onClick={triggerProcessing}
                        className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Trigger Manual Processing
                      </button>
                      <button
                        onClick={fetchLeaderboard}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold shadow-lg text-2xl">
                      {selectedUser.account.profileImage ? (
                        <img
                          src={selectedUser.account.profileImage}
                          alt={selectedUser.account.username}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        selectedUser.account.username.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        @{selectedUser.account.username}
                        {selectedUser.account.verified && (
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </h2>
                      <p className="text-gray-600">{selectedUser.account.displayName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span>{selectedUser.account.followersCount.toLocaleString()} followers</span>
                        <span>{selectedUser.account.fluffyFollowers} 🍯 followers</span>
                        <span>{selectedUser.account.bonusMultiplier.toFixed(1)}x bonus</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{formatScore(selectedUser.totalScore)}</p>
                    <p className="text-sm text-gray-600">Total Score</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedUser.tweetCount}</p>
                    <p className="text-sm text-gray-600">Tweets</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{formatScore(selectedUser.avgScore)}</p>
                    <p className="text-sm text-gray-600">Avg Score</p>
                  </div>
                </div>

                {/* Tweet Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Tweets</h3>
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {selectedUser.scores.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.tweet.type}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.tweet.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-600">{formatScore(item.score.finalScore)}</p>
                            <p className="text-xs text-gray-500">score</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{item.tweet.text.substring(0, 200)}...</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>❤️ {item.tweet.likeCount}</span>
                          <span>🔄 {item.tweet.retweetCount}</span>
                          <span>💬 {item.tweet.replyCount}</span>
                          <span>Decay: {item.score.decayFactor.toFixed(2)}</span>
                          <span>Bonus: {item.score.bonusMultiplier.toFixed(2)}x</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}