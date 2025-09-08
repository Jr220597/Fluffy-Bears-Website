'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Download, Calendar, Wallet, Twitter, RefreshCw, Eye, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface WhitelistUser {
  id: number;
  twitterUsername: string;
  walletAddress: string;
  completedAt: string;
}

interface WhitelistStats {
  totalUsers: number;
  todayUsers: number;
  lastRegistration: string | null;
}

interface WhitelistData {
  users: WhitelistUser[];
  stats: WhitelistStats;
}

export default function AdminPage() {
  const [data, setData] = useState<WhitelistData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string>('');

  const fetchWhitelistData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/whitelist-admin');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError('Error loading whitelist data');
      }
    } catch (err) {
      setError('API connection error');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      const response = await fetch('/api/whitelist-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'export-csv' }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fluffy-bears-whitelist.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('CSV exported successfully!');
      } else {
        toast.error('Error exporting CSV');
      }
    } catch (err) {
      toast.error('Error exporting CSV');
      console.error('Error:', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAddress(text);
      toast.success('Address copied!');
      setTimeout(() => setCopiedAddress(''), 2000);
    }).catch(() => {
      toast.error('Error copying address');
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    fetchWhitelistData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 mb-2">
              🍯 Admin - Fluffy Bears Whitelist
            </h1>
            <p className="text-amber-700">
              Mysterious mission whitelist management
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={fetchWhitelistData}
              disabled={loading}
              className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-amber-700">Loading whitelist data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{data.stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Registrations</p>
                    <p className="text-3xl font-bold text-gray-900">{data.stats.todayUsers}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Registration</p>
                    <p className="text-lg font-bold text-gray-900">
                      {data.stats.lastRegistration 
                        ? formatDate(data.stats.lastRegistration).split(' ')[0]
                        : 'N/A'
                      }
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Lista de Usuários */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-amber-50 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  👥 Whitelist Users ({data.users.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Twitter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wallet Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date/Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Twitter className="w-4 h-4 text-blue-500 mr-2" />
                            <a 
                              href={`https://twitter.com/${user.twitterUsername}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              @{user.twitterUsername}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <Wallet className="w-4 h-4 text-purple-500" />
                            <span className="font-mono">{truncateAddress(user.walletAddress)}</span>
                            <button
                              onClick={() => copyToClipboard(user.walletAddress)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {copiedAddress === user.walletAddress ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(user.completedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}