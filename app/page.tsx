'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, Filter, TrendingUp, Clock, User } from 'lucide-react';

const apis = [
  { id: 1, name: 'Stripe', category: 'Payments', rating: 4.9, reviews: 3420, trending: true },
  { id: 2, name: 'Twilio', category: 'Communications', rating: 4.7, reviews: 2150, trending: true },
  { id: 3, name: 'Auth0', category: 'Security', rating: 4.8, reviews: 1890, trending: false },
  { id: 4, name: 'SendGrid', category: 'Email', rating: 4.5, reviews: 1560, trending: false },
  { id: 5, name: 'Cloudinary', category: 'Media', rating: 4.6, reviews: 980, trending: true },
  { id: 6, name: 'OpenWeather', category: 'Weather', rating: 4.4, reviews: 890, trending: false },
];

const reviews = [
  { id: 1, api: 'Stripe', user: 'DevPro', avatar: '👨‍💻', rating: 5, content: 'Excellent API! Documentation is top-notch and the SDKs make integration a breeze. Customer support is also very responsive.', date: '2 hours ago', helpful: 42 },
  { id: 2, api: 'Twilio', user: 'StartupFounder', avatar: '👩‍🚀', rating: 4, content: 'Great SMS API, but the pricing can get expensive at scale. Webhooks sometimes have delays.', date: '1 day ago', helpful: 28 },
  { id: 3, api: 'Auth0', user: 'SecurityDev', avatar: '🔐', rating: 5, content: 'Best authentication solution out there. The Universal Login is beautiful and works flawlessly.', date: '3 days ago', helpful: 56 },
  { id: 4, api: 'SendGrid', user: 'MarketingTech', avatar: '📧', rating: 4, content: 'Reliable email delivery. Had some issues with templates initially but support helped out.', date: '5 days ago', helpful: 12 },
  { id: 5, api: 'Cloudinary', user: 'MediaDev', avatar: '📸', rating: 5, content: 'Perfect for image/video manipulation. The transformations API is incredibly powerful.', date: '1 week ago', helpful: 33 },
];

export default function RatingsPage() {
  const [selectedApi, setSelectedApi] = useState(apis[0]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredReviews = reviews
    .filter(r => filter === 'all' || r.api === filter)
    .sort((a, b) => sortBy === 'recent' ? 0 : b.helpful - a.helpful);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            <h1 className="text-xl font-bold">API Ratings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - API List */}
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Top APIs
            </h3>
            <div className="space-y-2">
              {apis.map((api) => (
                <button
                  key={api.id}
                  onClick={() => setSelectedApi(api)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    selectedApi.id === api.id 
                      ? 'bg-blue-600' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{api.name}</span>
                    {api.trending && <span className="text-xs bg-green-500 px-2 py-0.5 rounded">🔥</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(api.rating)}
                    <span className="text-xs text-slate-400">({api.reviews})</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Reviews */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex items-center justify-between bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-700 border-none rounded px-3 py-1.5 text-sm"
              >
                <option value="all">All APIs</option>
                {apis.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700 border-none rounded px-3 py-1.5 text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Selected API Stats */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedApi.name}</h2>
                <p className="text-slate-400">{selectedApi.category}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400">{selectedApi.rating}</div>
                {renderStars(selectedApi.rating)}
                <p className="text-sm text-slate-400 mt-1">{selectedApi.reviews} reviews</p>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800 rounded-lg border border-slate-700 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{review.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <span className="text-xs text-slate-500">• {review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {renderStars(review.rating)}
                        <span className="text-xs text-slate-500 ml-2">{review.api}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 mb-3">{review.content}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <button className="flex items-center gap-1 hover:text-white">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-white">
                    <MessageSquare className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
