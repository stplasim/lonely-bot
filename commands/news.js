const axios = require('axios');

// Get general news
module.exports = {
  getNews(ctx) {
    const args = ctx.message.text.replace('/news ', '');
    switch (args) {
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
            return ctx.replyWithMarkdown(generateNewsMarkdown(data));
          })
          .catch(e => {
            console.log(e);
            return ctx.reply("Sorry dude but I had trouble getting the data.");
          });
        break;

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
          return ctx.replyWithMarkdown(generateNewsMarkdown(data));
        })
        .catch(e => {
          console.log(e);
          return ctx.reply("Sorry dude but I had trouble getting the data.");
        });
        break;

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
          return ctx.replyWithMarkdown(generateNewsMarkdown(data));
        })
        .catch(e => {
          console.log(e);
          return ctx.reply("Sorry dude but I had trouble getting the data.");
        });
        break;

      default:
        this.getGeneralNews(ctx)
          .then(news => ctx.replyWithMarkdown(news))
          .catch(err => ctx.reply(err));
    }
  },
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
        let news = "All right, guys, here are your top 10 headlines of the day. \n\n";
        for (let i = 0; i < 10; i++) {
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
        reject("Sorry dude but I had trouble getting the data.");
      });
    })
  }
}

const generateNewsMarkdown = (newsData) => {
  let news = "";
  for (let i = 0; i < 3; i++) {
    const {title, description, url} = newsData.data.articles[i];
    news += `*${title}*\n\n`
    news += description + '\n';
    news += `[More here](${url})\n`;
    news += '\n----------------------------------------\n\n'
  }

  return news;
}

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

