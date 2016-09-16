'use strict';

var credentials = require('./credentials');

var config = module.exports = {
  kinesis : {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    // Region for the Amazon Kinesis stream.
    region : credentials.region
  },

  clickStreamConsumer : {    
    stream : credentials.stream,
    // Total shards in the specified Amazon Kinesis stream.
    shards : 2,
    shardType : 'LATEST',
    limit: 100
  }
};