const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const EventEmitter = require("events");
const logger = require("../../utils/logger").logger;
// const config = require("../../config");

/**
 * mongodb database credentials
 */
const options = {
  uri: process.env.MONGO_DB_URI,
  name: process.env.MONGO_DB_URI.split("/")[3] || process.env.MONGO_DB_NAME,
};
// }
/**
 * an event emitter class represent mongoose connection behavior
 */
if (process.env.NODE_ENV === "test") {
  module.exports.database = mongoose;
} else {
  class Connection extends EventEmitter {
    constructor(options) {
      super();
      // console.log(process.env);
      this._options = options;
      mongoose.set("useFindAndModify", false);
      mongoose.set("useCreateIndex", true);
      mongoose.set("useNewUrlParser", true);
      mongoose.set("useUnifiedTopology", true);
      this._connection = mongoose.createConnection();
      this._listen();
      this._connect();
    }

    get connection() {
      return this._connection;
    }

    _listen() {
      this._connection.on("connected", () => {
        logger.info(`Connected to ${this._options.name} database`);
      });
      this._connection.on("error", error => {
        logger.warn(`Connect to ${this._options.name} database failed. ${error.message}`);
      });
      this._connection.on("disconnected", () => {
        logger.warn(`Connect to ${this._options.name} database disconnected`);
      });
      this._connection.on("disconnecting", error => {
        logger.warn(`Connect to ${this._options.name} database is disconnecting. ${error.message}`);
      });
    }

    _connect() {
      // let opt = {
      //   useFindAndModify: false,
      //   useCreateIndex: true,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   socketTimeoutMS: 240000,
      // };
      const { uri } = this._options;
      if (!uri) throw new Error("database uri is missing");
      this._connection.openUri(uri);
    }
  }

  module.exports.database = new Connection(options).connection;
}
