const XLSX = require('xlsx');
const path = require('path');

// Classe para calcular pontos (copiada do sistema)
class TwitterPointsCalculator {
  static calculateTweetPoints(tweet) {
    const points = {
      basePoints: 0,
      engagementBonus: 0,
      qualityBonus: 0,
      officialBonus: 0,
      totalPoints: 0
    };

    // Pontos base por tipo de ação
    if (tweet.isRetweet) {
      points.basePoints = 2;
    } else {
      points.basePoints = 5; // Tweet original
    }

    // Bônus de engajamento
    const likes = tweet.like_count || tweet.likes || 0;
    const retweets = tweet.retweet_count || tweet.retweets || 0;
    const replies = tweet.reply_count || tweet.replies || 0;
    const quotes = tweet.quote_count || tweet.quotes || 0;

    // Escala progressiva para likes
    if (likes > 0) {
      if (likes >= 100) points.engagementBonus += 15;
      else if (likes >= 50) points.engagementBonus += 10;
      else if (likes >= 20) points.engagementBonus += 7;
      else if (likes >= 10) points.engagementBonus += 5;
      else if (likes >= 5) points.engagementBonus += 3;
      else points.engagementBonus += 1;
    }

    // Bônus para retweets (mais valioso que likes)
    if (retweets > 0) {
      points.engagementBonus += Math.min(retweets * 2, 30);
    }

    // Bônus para replies (indica engajamento)
    if (replies > 0) {
      points.engagementBonus += Math.min(replies * 1.5, 20);
    }

    // Bônus para quotes (compartilhamento com comentário)
    if (quotes > 0) {
      points.engagementBonus += Math.min(quotes * 3, 25);
    }

    // Bônus de qualidade
    const text = tweet.text || '';
    const hashtags = tweet.hashtags || [];
    const mentions = tweet.mentions || [];

    // Tweet longo e bem estruturado
    if (text.length > 100) {
      points.qualityBonus += 2;
    }

    // Uso de hashtags relevantes
    const fluffyHashtags = hashtags.filter(tag => 
      tag.toLowerCase().includes('fluffybears') || 
      tag.toLowerCase().includes('fluffy') ||
      tag.toLowerCase().includes('bears') ||
      tag.toLowerCase().includes('nft')
    );
    points.qualityBonus += Math.min(fluffyHashtags.length * 3, 10);

    // Menção ao perfil oficial
    const officialMentions = mentions.filter(mention => 
      mention.toLowerCase().includes('fluffy_bearss') ||
      mention.toLowerCase().includes('fluffybears')
    );
    if (officialMentions.length > 0) {
      points.officialBonus += 5;
    }

    // Bônus se é do perfil oficial
    const username = tweet.username || tweet.author?.username || '';
    if (username.toLowerCase() === 'fluffy_bearss') {
      points.officialBonus += 10;
    }

    points.totalPoints = points.basePoints + points.engagementBonus + points.qualityBonus + points.officialBonus;
    
    return points;
  }

  static calculateEngagementRate(tweet) {
    const likes = tweet.like_count || tweet.likes || 0;
    const retweets = tweet.retweet_count || tweet.retweets || 0;
    const replies = tweet.reply_count || tweet.replies || 0;
    const quotes = tweet.quote_count || tweet.quotes || 0;
    const views = tweet.view_count || tweet.views || 1;

    const totalEngagement = likes + retweets + replies + quotes;
    return (totalEngagement / Math.max(views, 1)) * 100;
  }
}

// Função para extrair username da URL
function extractUsernameFromUrl(url) {
  if (!url) return 'unknown';
  
  // Padrões possíveis:
  // https://x.com/USERNAME/status/1234567890
  // https://twitter.com/USERNAME/status/1234567890
  // https://twitter.com/i/web/status/1234567890 (caso especial)
  
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
    
    // Se é /i/web/status/... é um link genérico
    if (pathParts[0] === 'i' && pathParts[1] === 'web') {
      return 'twitter_generic';
    }
    
    // Padrão normal: /USERNAME/status/ID
    if (pathParts.length >= 3 && pathParts[1] === 'status') {
      return pathParts[0];
    }
    
    // Fallback: primeiro segmento do path
    return pathParts[0] || 'unknown';
  } catch (error) {
    console.warn(`Erro ao extrair username da URL: ${url}`, error.message);
    return 'unknown';
  }
}

// Função para transformar dados Excel
function transformExcelData(items) {
  return items.map((item, index) => {
    // Extrair username da URL
    const extractedUsername = extractUsernameFromUrl(item.url);
    
    return {
      id: item.tweet_id || item.id || item.tweetId || `excel_${index}`,
      url: item.url || `https://twitter.com/status/${item.tweet_id || item.id}`,
      text: item.text || item.full_text || item.fullText || '',
      username: extractedUsername,
      name: item.name || item.author_name || item.user_name || extractedUsername || 'Unknown User',
      user_id: item.user_id || item.author_id || item.user_id || '',
      created_at: item.created_at || item.createdAt || new Date().toISOString(),
      like_count: item.like_count || item.likes || item.favorite_count || 0,
      retweet_count: item.retweet_count || item.retweets || 0,
      reply_count: item.reply_count || item.replies || 0,
      quote_count: item.quote_count || item.quotes || 0,
      view_count: item.view_count || item.views || 0,
      hashtags: typeof item.hashtags === 'string' ? item.hashtags.split(',') : (item.hashtags || []),
      mentions: typeof item.mentions === 'string' ? item.mentions.split(',') : (item.mentions || []),
      isRetweet: item.isRetweet || false,
    };
  });
}

// Função principal de análise
function analyzePoints() {
  try {
    console.log('🔍 ANÁLISE ULTRADETALHADA DOS PONTOS - FLUFFY BEARS TWITTER GAME');
    console.log('=' .repeat(80));
    
    // Carregar arquivo Excel
    const filePath = path.join(__dirname, 'data', 'twitter-daily', 'fluffy-bears-tweets.xlsx');
    console.log(`📁 Lendo arquivo: ${filePath}`);
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`📊 Total de registros encontrados: ${rawData.length}`);
    console.log('');
    
    // Transformar dados
    const tweets = transformExcelData(rawData);
    
    // Análise detalhada por tweet
    console.log('📝 ANÁLISE DETALHADA POR TWEET:');
    console.log('-' .repeat(80));
    
    let totalPoints = 0;
    let tweetAnalysis = [];
    
    tweets.forEach((tweet, index) => {
      const pointsBreakdown = TwitterPointsCalculator.calculateTweetPoints(tweet);
      const engagementRate = TwitterPointsCalculator.calculateEngagementRate(tweet);
      
      console.log(`\n🐻 TWEET #${index + 1} - @${tweet.username}`);
      console.log(`📝 Texto: ${tweet.text.substring(0, 100)}${tweet.text.length > 100 ? '...' : ''}`);
      console.log(`📅 Data: ${tweet.created_at}`);
      console.log(`\n💰 BREAKDOWN DE PONTOS:`);
      console.log(`   📌 Pontos Base: ${pointsBreakdown.basePoints} pts ${tweet.isRetweet ? '(Retweet)' : '(Tweet Original)'}`);
      console.log(`   🚀 Bônus Engajamento: ${pointsBreakdown.engagementBonus} pts`);
      console.log(`      ❤️  Likes: ${tweet.like_count}`);
      console.log(`      🔄 Retweets: ${tweet.retweet_count}`);
      console.log(`      💬 Replies: ${tweet.reply_count}`);
      console.log(`      📝 Quotes: ${tweet.quote_count}`);
      console.log(`   ⭐ Bônus Qualidade: ${pointsBreakdown.qualityBonus} pts`);
      console.log(`   🏆 Bônus Oficial: ${pointsBreakdown.officialBonus} pts`);
      console.log(`   📊 Taxa de Engajamento: ${engagementRate.toFixed(2)}%`);
      console.log(`   🎯 TOTAL: ${pointsBreakdown.totalPoints} PONTOS`);
      
      totalPoints += pointsBreakdown.totalPoints;
      tweetAnalysis.push({
        username: tweet.username,
        points: pointsBreakdown.totalPoints,
        breakdown: pointsBreakdown,
        engagement: engagementRate,
        tweet: tweet
      });
    });
    
    console.log('\n' + '=' .repeat(80));
    console.log(`💎 TOTAL GERAL: ${totalPoints} PONTOS`);
    console.log('=' .repeat(80));
    
    // Top usuários
    console.log('\n🏆 RANKING DOS USUÁRIOS:');
    console.log('-' .repeat(50));
    
    const userStats = {};
    tweetAnalysis.forEach(analysis => {
      if (!userStats[analysis.username]) {
        userStats[analysis.username] = {
          username: analysis.username,
          totalPoints: 0,
          tweets: 0,
          avgEngagement: 0,
          totalEngagement: 0
        };
      }
      userStats[analysis.username].totalPoints += analysis.points;
      userStats[analysis.username].tweets += 1;
      userStats[analysis.username].totalEngagement += analysis.engagement;
    });
    
    // Calcular médias e ordenar
    const ranking = Object.values(userStats).map(user => ({
      ...user,
      avgEngagement: user.totalEngagement / user.tweets,
      pointsPerTweet: user.totalPoints / user.tweets
    })).sort((a, b) => b.totalPoints - a.totalPoints);
    
    ranking.forEach((user, index) => {
      console.log(`${index + 1}. @${user.username}`);
      console.log(`   💰 ${user.totalPoints} pontos total`);
      console.log(`   📊 ${user.tweets} tweets`);
      console.log(`   ⚡ ${user.pointsPerTweet.toFixed(1)} pts/tweet`);
      console.log(`   📈 ${user.avgEngagement.toFixed(2)}% engagement médio`);
      console.log('');
    });
    
    // Análise de hashtags
    console.log('🏷️ ANÁLISE DE HASHTAGS:');
    console.log('-' .repeat(50));
    
    const hashtagStats = {};
    tweetAnalysis.forEach(analysis => {
      const hashtags = analysis.tweet.hashtags || [];
      hashtags.forEach(hashtag => {
        if (!hashtagStats[hashtag]) {
          hashtagStats[hashtag] = { count: 0, totalPoints: 0 };
        }
        hashtagStats[hashtag].count += 1;
        hashtagStats[hashtag].totalPoints += analysis.points;
      });
    });
    
    const topHashtags = Object.entries(hashtagStats)
      .map(([hashtag, stats]) => ({
        hashtag,
        count: stats.count,
        avgPoints: stats.totalPoints / stats.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    topHashtags.forEach((tag, index) => {
      console.log(`${index + 1}. ${tag.hashtag}`);
      console.log(`   📊 ${tag.count} usos`);
      console.log(`   💰 ${tag.avgPoints.toFixed(1)} pontos médios`);
    });
    
    console.log('\n' + '=' .repeat(80));
    console.log('✅ ANÁLISE COMPLETA FINALIZADA!');
    console.log('=' .repeat(80));
    
  } catch (error) {
    console.error('❌ Erro na análise:', error.message);
    console.error(error.stack);
  }
}

// Executar análise
analyzePoints();