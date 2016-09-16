'use strict';

var atob = require('atob'),
btoa = require('btoa');

function clickStreamConsumer(kinesis, config) {

    function getStream() {        
        kinesis.describeStream({StreamName: config.stream}, function (err, data) {     
            var params = {
              ShardId: data.StreamDescription.Shards[0].ShardId, /* required */
              ShardIteratorType: config.shardType, /* required */
              StreamName: config.stream /* required */
            };

            kinesis.getShardIterator(params, function(err, data) {
                if(err){
                  console.log(err, err.stack); // an error occurred
                }
                else{     
                  getRecords(null,data);
                }          
            });
        });
    }

    function getRecords(err, data) {   	
        if (err) {
          console.log(err);
          return;
        }

        console.log('No data found.....');

        var params = {
          ShardIterator: data.ShardIterator, /* required */
          Limit: config.limit
        };

        kinesis.getRecords(params, function (err, data) {          
            if (err) {
                console.log(err);
                return;
            }

            if (data['Records'].length > 0) {
              for (var i in data['Records']) {            
                  var u8 = data['Records'][i]['Data'],
                  b64encoded = btoa(String.fromCharCode.apply(null, u8)),
                  result = atob(b64encoded);
                  //log to the console
                  console.log(result);                 
              }
            }
                
            setTimeout(function() {
                data.ShardIterator = data.NextShardIterator;
                getRecords(null, data);
            }, 200);
        });
    }

    return {
        run: getStream
    };
}

module.exports = clickStreamConsumer;




