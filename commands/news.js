const axios = require('axios');

// Get general news
module.exports = {
  /**
   * Get news headlines form the news api
   * This command is using the News API from
   * https://newsapi.org
   *
   * @param ctx - Bot context object
   */
  getNews(ctx) {
    // Get args if user has added some
    const args = ctx.message.text.replace('/news ', '');

    // Handle args cases
    switch (args) {

      // Handle case of Germany. Return germany based news
      case 'germany':
        axios({
          "method": "GET",
          "url": "https://newsapi.org/v2/top-headlines",
          "params": {
            "country": "de",
            "apiKey": process.env.NEWS_API
          }
        })
          .then(data => {
            // return news as markdown
            return ctx.replyWithMarkdown(generateNewsMarkdown(data));
          })
          .catch(e => {
            console.log(e);
            // Handle potential errors
            return ctx.reply("Sorry dude but I had trouble getting the data.");
          });
        break;

      // Handle case of Italy. Return italy based news
      case 'italy':
        axios({
          "method": "GET",
          "url": "https://newsapi.org/v2/top-headlines",
          "params": {
            "country": "it",
            "apiKey": process.env.NEWS_API
          }
        })
        .then(data => {
          // return news as markdown
          return ctx.replyWithMarkdown(generateNewsMarkdown(data));
        })
        .catch(e => {
          console.log(e);
          // Handle potential errors
          return ctx.reply("Sorry dude but I had trouble getting the data.");
        });
        break;

      // Handle case of Italy. Return news of category technology
      case 'tech':
        axios({
          "method": "GET",
          "url": "https://newsapi.org/v2/top-headlines",
          "params": {
            "sources": "techcrunch",
            "sortBy": "publishedAt",
            "apiKey": process.env.NEWS_API
          }
        })
        .then(data => {
          // return news as markdown
          return ctx.replyWithMarkdown(generateNewsMarkdown(data));
        })
        .catch(e => {
          console.log(e);
          // Handle potential errors
          return ctx.reply("Sorry dude but I had trouble getting the data.");
        });
        break;

      // Return generic news
      default:
        this.getGeneralNews(ctx)
          .then(news => ctx.replyWithMarkdown(news))
          .catch(err => ctx.reply(err));
    }
  },

  /**
   * Get generic news form all categories
   *
   * @returns {Promise<string>}
   */
  getGeneralNews() {
    return new Promise((resolve, reject) => {
      axios({
        "method": "GET",
        "url": "https://newsapi.org/v2/top-headlines",
        "params": {
          "sources": "techcrunch,spiegel-online,bbc-news,cnn",
          "pageSize": "40",
          "apiKey": process.env.NEWS_API
        }
      })
      .then(data => {
        // Set heading
        let news = "All right, guys, here are your top 7 headlines of the day. \n\n";

        // Select 7 random news from the api
        for (let i = 0; i < 7; i++) {
          // Make article
          const {title, description, url} = shuffle(data.data.articles).pop();
          news += `*${title}*\n\n`
          news += description + '\n';
          news += `[More here](${url})\n`;
          news += '\n----------------------------------------\n\n'
        }

        resolve(news);
      })
      .catch(e => {
        console.log(e);
        // Handle potential errors
        reject("Sorry dude but I had trouble getting the data.");
      });
    })
  }
}

/**
 *
 *
 * @param newsData - Array of news
 * @returns {string}
 */
const generateNewsMarkdown = (newsData) => {
  let news = "";

  // Make article list of news data
  for (let i = 0; i < 3; i++) {
    const {title, description, url} = newsData.data.articles[i];
    news += `*${title}*\n\n`
    news += description + '\n';
    news += `[More here](${url})\n`;
    news += '\n----------------------------------------\n\n'
  }

  return news;
}

/**
 * Shuffle array
 *
 * @param array
 * @returns {*}
 */
const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

