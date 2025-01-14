"use strict";

var _path = require("path");
var _fs = require("fs");
var _crypto = require("crypto");
var _jestEnvironmentNode = require("jest-environment-node");
var _mongodbMemoryServer = require("mongodb-memory-server");
var _helpers = require("./helpers");
// eslint-disable-next-line import/order
const debug = require('debug')('jest-mongodb:environment');
const options = (0, _helpers.getMongodbMemoryOptions)();
const isReplSet = Boolean(options.replSet);
debug(`isReplSet`, isReplSet);
const mongo = isReplSet ? new _mongodbMemoryServer.MongoMemoryReplSet(options) : new _mongodbMemoryServer.MongoMemoryServer(options);
module.exports = class MongoEnvironment extends _jestEnvironmentNode.TestEnvironment {
  constructor(config, context) {
    super(config, context);
    this.globalConfigPath = (0, _path.join)(config.globalConfig.rootDir, 'globalConfig.json');
  }
  async setup() {
    debug('Setup MongoDB Test Environment');
    const globalConfig = JSON.parse((0, _fs.readFileSync)(this.globalConfigPath, 'utf-8'));
    if (globalConfig.mongoUri) {
      this.global.__MONGO_URI__ = globalConfig.mongoUri;
    } else {
      await mongo.start();
      this.global.__MONGO_URI__ = mongo.getUri();
    }
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName || (0, _crypto.randomUUID)();
    await super.setup();
  }
  async teardown() {
    debug('Teardown MongoDB Test Environment');
    await mongo.stop();
    await super.teardown();
  }

  // @ts-ignore
  runScript(script) {
    // @ts-ignore
    return super.runScript(script);
  }
};