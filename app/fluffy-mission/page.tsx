'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Twitter, Wallet, Heart, Repeat, CheckCircle, Sparkles, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface MissionConfig {
  postId: string;
  fluffyBearsUsername: string;
}

interface TwitterVerification {
  liked: boolean;
  retweeted: boolean;
  username: string;
}

export default function FluffyMissionPage() {
  const [missionRevealed, setMissionRevealed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const [formData, setFormData] = useState({
    twitterUsername: '',
    walletAddress: ''
  });

  const [missionConfig, setMissionConfig] = useState<MissionConfig | null>(null);

  useEffect(() => {
    // Carregar configuração da missão
    const loadMissionConfig = async () => {
      try {
        const response = await fetch('/api/mission-config');
        const config = await response.json();
        setMissionConfig(config);
      } catch (error) {
        console.error('Error loading mission configuration:', error);
      }
    };
    
    loadMissionConfig();
  }, []);

  const revealMission = () => {
    setMissionRevealed(true);
    setTimeout(() => setShowForm(true), 1000);
  };

  const handleInputChange = (field: 'twitterUsername' | 'walletAddress', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.twitterUsername.trim() || !formData.walletAddress.trim()) {
      toast.error('Please fill all fields');
      return false;
    }
    
    if (!formData.twitterUsername.startsWith('@')) {
      setFormData(prev => ({
        ...prev,
        twitterUsername: '@' + prev.twitterUsername.replace('@', '')
      }));
    }
    
    if (!formData.walletAddress.startsWith('0x') || formData.walletAddress.length !== 42) {
      toast.error('Invalid wallet address (must start with 0x and be 42 characters)');
      return false;
    }
    
    return true;
  };

  const verifyAndComplete = async () => {
    if (!validateForm() || !missionConfig) return;
    
    setVerifying(true);
    
    try {
      const response = await fetch('/api/verify-mission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twitterUsername: formData.twitterUsername,
          walletAddress: formData.walletAddress,
          postId: missionConfig.postId
        }),
      });
      
      const result = await response.json();
      
      if (result.success && result.verified) {
        setCompleted(true);
        
        // Efeito de confete
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFA500', '#FF8C00', '#FFB347', '#FFCC5C']
        });
        
        toast.success('Congratulations! You are officially on the whitelist! 🎉');
        
        // Salvar dados da wallet
        await fetch('/api/save-whitelist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            twitterUsername: formData.twitterUsername,
            walletAddress: formData.walletAddress
          }),
        });
        
      } else {
        toast.error(result.message || 'Unable to verify Twitter interactions');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Error verifying mission. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-8 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Home Button */}
        <div className="absolute top-0 left-0 z-20">
          <a
            href="/"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-amber-800 px-4 py-2 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Home size={20} />
            Home
          </a>
        </div>
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-800 mb-4">
              🍯 Mysterious Mission
            </h1>
            <p className="text-xl text-amber-700">
              The Fluffy Bears have a special surprise for you...
            </p>
          </motion.div>
        </div>

        {!missionRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-amber-200">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                  <Eye size={60} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-amber-800 mb-4">
                  Something Sweet is Coming...
                </h2>
                <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto">
                  The Fluffy Bears have prepared a special mission that could secure your spot 
                  on our exclusive whitelist. Are you ready to discover it?
                </p>
              </div>
              
              <button
                onClick={revealMission}
                className="group relative bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-12 rounded-full text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-3" size={24} />
                  Reveal the Mission
                  <Sparkles className="ml-3" size={24} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {missionRevealed && !completed && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-amber-800 mb-4">
                    🍯 Get Some Honey!
                  </h2>
                  <p className="text-lg text-amber-700 max-w-3xl mx-auto">
                    To join our exclusive hive, show your support for the Fluffy Bears! 
                    Like and share our special Twitter/X post to secure your spot on the whitelist.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <div className="flex items-center mb-4">
                      <Twitter className="text-blue-500 mr-3" size={24} />
                      <h3 className="font-bold text-amber-800">Step 1: Interact on Twitter</h3>
                    </div>
                    <div className="space-y-3 text-amber-700">
                      <div className="flex items-center">
                        <Heart className="text-red-500 mr-2" size={18} />
                        <span>Like our special post</span>
                      </div>
                      <div className="flex items-center">
                        <Repeat className="text-green-500 mr-2" size={18} />
                        <span>Retweet to your followers</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <div className="flex items-center mb-4">
                      <Wallet className="text-purple-500 mr-3" size={24} />
                      <h3 className="font-bold text-amber-800">Step 2: Provide Your Data</h3>
                    </div>
                    <div className="space-y-3 text-amber-700">
                      <div className="flex items-center">
                        <span className="mr-2">@</span>
                        <span>Your Twitter username</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">🔗</span>
                        <span>Your Linea wallet address</span>
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200"
                    >
                      <h3 className="text-2xl font-bold text-amber-800 mb-6 text-center">
                        Complete Your Mission
                      </h3>
                      
                      <div className="space-y-6 max-w-md mx-auto">
                        <div>
                          <label className="block text-amber-800 font-semibold mb-2">
                            Your Twitter Username
                          </label>
                          <div className="relative">
                            <Twitter className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                              type="text"
                              value={formData.twitterUsername}
                              onChange={(e) => handleInputChange('twitterUsername', e.target.value)}
                              placeholder="@seu_username"
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-amber-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-amber-800 font-semibold mb-2">
                            Wallet Address (Linea)
                          </label>
                          <div className="relative">
                            <Wallet className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                              type="text"
                              value={formData.walletAddress}
                              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                              placeholder="0x..."
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-amber-800"
                            />
                          </div>
                        </div>

                        <button
                          onClick={verifyAndComplete}
                          disabled={verifying || !formData.twitterUsername || !formData.walletAddress}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {verifying ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Verifying...
                            </div>
                          ) : (
                            'Verify and Complete Mission'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-2xl p-12 border border-green-200">
                <div className="mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                    <CheckCircle size={60} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-green-800 mb-4">
                    🎉 Mission Completed!
                  </h2>
                  <p className="text-xl text-green-700 mb-6 max-w-2xl mx-auto">
                    Congratulations, brave bear! You have completed the mysterious mission and are now 
                    officially on the <strong>Fluffy Bears whitelist</strong>! 
                  </p>
                  <div className="bg-white rounded-2xl p-6 border border-green-200 max-w-md mx-auto">
                    <h3 className="font-bold text-green-800 mb-3">Your data has been registered:</h3>
                    <div className="space-y-2 text-green-700">
                      <div className="flex items-center justify-center">
                        <Twitter className="mr-2" size={16} />
                        <span>{formData.twitterUsername}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Wallet className="mr-2" size={16} />
                        <span className="font-mono text-xs">
                          {formData.walletAddress.slice(0, 6)}...{formData.walletAddress.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-green-600 mt-6">
                    Keep an eye on our channels for more news! 🍯
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}