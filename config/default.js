module.exports = {
  "MongoJS": {
    "connect_url": process.env.MONGOHQ_URL
  },
  "Auth": {
    "twit": {
        "consumerKey": process.env.MARKDOWNER_CONSUMER_KEY
      , "consumerSecret": process.env.MARKDOWNER_CONSUMER_SECRET
    }
  }
};