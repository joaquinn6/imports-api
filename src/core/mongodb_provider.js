const { MongoClient } = require('mongodb');

function provider() {
  this.client = null;
  this.db = null;

  function connect(config) {
    return new Promise((resolve, reject) => {
      this.client = new MongoClient(config.mongoUri);
      this.client.connect()
        .then((mongoClient) => {
          this.db = mongoClient.db(config.db);
          resolve({ mongoClient, db: this.db });
        })
        .catch((reason) => reject(reason));
    });
  }

  async function close() {
    await this.client.close();
  }

  return {
    connect,
    close,
    client: this.client,
    db: this.db,
  };
}

module.exports = provider();
