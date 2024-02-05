const {
  MMKVModule,
} = require(`./build/${process.arch}/Release/mmkv-node-bindings.node`);

module.exports = MMKVModule;
