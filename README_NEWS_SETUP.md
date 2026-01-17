# News Portal Setup Guide

This guide explains how to set up real news integration for the InsightEdge News Portal.

## 🚀 Quick Start

### 1. Get API Keys

#### NewsAPI (Recommended)
1. Visit [https://newsapi.org/register](https://newsapi.org/register)
2. Sign up for a free account (100 requests/day)
3. Copy your API key

#### Data.gov.in (Optional)
1. Visit [https://data.gov.in/](https://data.gov.in/)
2. Register and get your API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_NEWSAPI_KEY=your_newsapi_key_here
VITE_DATAGOV_KEY=your_datagov_key_here
```

### 3. RSS Feeds (No API Key Required)

Times of India RSS feeds are automatically used:
- Cities RSS: `https://timesofindia.indiatimes.com/rssfeeds/-2128833038.cms`
- Technology RSS: `https://timesofindia.indiatimes.com/rssfeeds/5880659.cms`

## 📰 How It Works

### News Sources

The system fetches from multiple sources:

1. **Times of India (RSS)**
   - No API key required
   - Fetches via RSS2JSON proxy
   - Filters for Smart Cities keywords

2. **NewsAPI**
   - Requires API key
   - Aggregates news from multiple sources
   - Searches for Smart Cities related content

3. **Data.gov.in (Optional)**
   - Government data and news
   - Requires API key

### Features

- **Latest News**: Shows articles from the last 7 days
- **Past 30 Days**: Shows articles from the past 30 days
- **Auto-refresh**: Fetches latest news on page load
- **Manual Refresh**: Click refresh button to force update
- **Smart Filtering**: Only shows Smart Cities related content
- **Career Relevance**: AI-extracted career connections

### Caching

- News is cached for 30 minutes to avoid rate limits
- Use the "Refresh" button to force a new fetch
- Cache is automatically cleared when switching date filters

## 🔧 Configuration

### Enable/Disable Sources

Edit `src/lib/news-sources.ts`:

```typescript
export const newsSources: NewsSource[] = [
  {
    id: 'timesofindia',
    enabled: true, // Set to false to disable
    // ...
  },
];
```

### Smart Cities Keywords

The system filters articles using keywords. Edit `src/lib/news-sources.ts`:

```typescript
export const smartCityKeywords = [
  'smart city',
  'urban development',
  // Add more keywords...
];
```

## 🐛 Troubleshooting

### No News Loading

1. **Check API Keys**: Ensure `.env` file has valid keys
2. **Check Console**: Look for error messages in browser console
3. **Rate Limits**: Free APIs have rate limits (100 requests/day for NewsAPI)
4. **CORS Issues**: RSS feeds use a proxy service (rss2json.com)

### Articles Not Showing

- The system filters articles for Smart Cities relevance
- If no articles match keywords, none will be displayed
- Try adjusting keywords in `news-sources.ts`

### API Errors

- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded
- **CORS Error**: RSS proxy may be down, try again later

## 📝 Legal Considerations

### Times of India RSS
- RSS feeds are for personal/non-commercial use
- Must link back to original articles
- Cannot republish full content without permission
- See: [TOI RSS Terms](https://timesofindia.indiatimes.com/rss.cms)

### NewsAPI
- Free tier: 100 requests/day
- Development use only (not for production)
- See: [NewsAPI Terms](https://newsapi.org/terms)

### Best Practices
- Always link to original articles
- Show excerpts only, not full content
- Attribute sources properly
- Respect rate limits

## 🔄 Production Setup

For production, consider:

1. **Backend API**: Move fetching to backend to avoid CORS issues
2. **Database**: Store articles in database for better performance
3. **Scheduled Jobs**: Use cron jobs to fetch news periodically
4. **Caching**: Use Redis for better caching
5. **Rate Limiting**: Implement proper rate limiting
6. **Licensing**: Get proper licenses for commercial use

## 📚 API Documentation

- [NewsAPI Docs](https://newsapi.org/docs)
- [RSS2JSON API](https://rss2json.com/docs)
- [Data.gov.in API](https://data.gov.in/api-usage-guide)
