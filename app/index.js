'use strict';

var AWS = require('aws-sdk');
var config = require('./config');
var consumer = require('./click_stream_consumer');

AWS.config.update({
    accessKeyId: config.kinesis.accessKeyId,
    secretAccessKey: config.kinesis.secretAccessKey
});

var kinesis = new AWS.Kinesis({ region: config.kinesis.region });
consumer(kinesis, config.clickStreamConsumer).run();