const axios = require('axios');
const cheerio = require('cheerio');

const scrapeStockData = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const stocks = {
      seeds: [],
      gear: [],
      easter: []
    };

    // Example selectors (adjust based on actual HTML structure)
    $('table.seed-shop tr').each((i, elem) => {
      const item = {
        name: $(elem).find('td:nth-child(1)').text().trim(),
        buyPrice: $(elem).find('td:nth-child(2)').text().trim(),
        sellPrice: $(elem).find('td:nth-child(3)').text().trim(),
        availability: $(elem).find('td:nth-child(4)').text().trim()
      };
      if (item.name) stocks.seeds.push(item);
    });

    $('table.gear-shop tr').each((i, elem) => {
      const item = {
        name: $(elem).find('td:nth-child(1)').text().trim(),
        buyPrice: $(elem).find('td:nth-child(2)').text().trim(),
        sellPrice: $(elem).find('td:nth-child(3)').text().trim(),
        availability: $(elem).find('td:nth-child(4)').text().trim()
      };
      if (item.name) stocks.gear.push(item);
    });

    $('table.easter-shop tr').each((i, elem) => {
      const item = {
        name: $(elem).find('td:nth-child(1)').text().trim(),
        buyPrice: $(elem).find('td:nth-child(2)').text().trim(),
        sellPrice: $(elem).find('td:nth-child(3)').text().trim(),
        availability: $(elem).find('td:nth-child(4)').text().trim()
      };
      if (item.name) stocks.easter.push(item);
    });

    return stocks;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('Access blocked, possibly due to CAPTCHA or anti-bot measures. Consider using the official Vulcan Discord bot or contacting the website owner.');
    }
    throw new Error(`Scraping failed: ${error.message}`);
  }
};

module.exports = { scrapeStockData };
