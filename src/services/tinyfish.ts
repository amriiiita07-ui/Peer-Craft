export interface TinyFishSearchResult {
  position?: number;
  title: string;
  url: string;
  snippet?: string;
  site_name?: string;
  date?: string;
}

export interface TinyFishSearchResponse {
  query: string;
  results: TinyFishSearchResult[];
  total_results?: number;
  page?: number;
}

export const TINYFISH_API_KEY = 'sk-tinyfish-jOyY0OQA7-u3nNeOsLqzTtg79sjplTvX';
export const TINYFISH_SEARCH_ENDPOINT = 'https://api.search.tinyfish.ai';

/**
 * Searches the live web using TinyFish Agent & Search API
 */
export async function searchTinyFish(
  query: string,
  purpose: string = 'Find coding documentation, algorithmic solutions, and technical references'
): Promise<TinyFishSearchResponse> {
  const url = new URL(TINYFISH_SEARCH_ENDPOINT);
  url.searchParams.set('query', query);
  if (purpose) {
    url.searchParams.set('purpose', purpose);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-API-Key': TINYFISH_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`TinyFish API Error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as TinyFishSearchResponse;
  return data;
}

/**
 * Format TinyFish results into helpful mentor markdown
 */
export function formatTinyFishResults(
  query: string,
  data: TinyFishSearchResponse,
  contextTitle?: string
): string {
  const results = data.results || [];
  
  if (results.length === 0) {
    return `### 🐟 TinyFish Web Search\n\nNo live web results were found for **"${query}"**. Try adjusting your query keywords or asking a broader algorithmic question.`;
  }

  const contextNote = contextTitle ? ` *(Context: ${contextTitle})*` : '';
  let markdown = `### 🐟 TinyFish Web Search Results${contextNote}\n\n`;
  markdown += `Found **${data.total_results || results.length}** high-relevance web resources for \`${query}\`:\n\n`;

  results.slice(0, 5).forEach((item, index) => {
    const siteTag = item.site_name ? `\`${item.site_name}\`` : '';
    const dateTag = item.date ? ` • *${item.date}*` : '';
    markdown += `**${index + 1}. [${item.title}](${item.url})** ${siteTag}${dateTag}\n`;
    if (item.snippet) {
      markdown += `> ${item.snippet.trim()}\n\n`;
    } else {
      markdown += `\n`;
    }
  });

  markdown += `\n💡 *Tip: Click any title link above to jump directly to official documentation or solutions.*`;
  return markdown;
}
