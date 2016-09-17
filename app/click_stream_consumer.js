'use strict';

var atob = require('atob'),
btoa = require('btoa');

function clickStreamConsumer(kinesis, config) {
    
    /**
     * Prints a single record of data on the console
     * @param mixed records and array of data
     * @param string data_key the property key to retrieve data
     */
    var printSingleRecord = function(records, data_key){
        for (var i in records) {            
            var u8 = records[i][data_key],
            b64encoded = btoa(String.fromCharCode.apply(null, u8)),
            data = atob(b64encoded);           
            console.log(data);                 
        }
    };

    var getRecords = function(err, data) {   	
        if (err) {
            console.log(err);
            return undefined;
        }        

        var params = {
            ShardIterator: data.ShardIterator, 
            Limit: config.limit
        };

        kinesis.getRecords(params, function (err, data) {           
            if (err) {
                console.log(err);
                return undefined;
            }

            if (data['Records'].length > 0) {
                printSingleRecord(data['Records'],'Data');
            }
            else{
                console.log('No data found.....');
            }
            
            //fire getRecords function on the next 200ms  
            setTimeout(function() {
                data.ShardIterator = data.NextShardIterator;
                getRecords(null, data);
            }, 200);

        });
    };

    var getStream = function() {        
        kinesis.describeStream({StreamName: config.stream}, function (err, data) {     
            var params = {
                ShardId: data.StreamDescription.Shards[0].ShardId, 
                ShardIteratorType: config.shardType,
                StreamName: config.stream 
            };

            kinesis.getShardIterator(params, function(err, data) {
                if(err){
                    console.log(err, err.stack); 
                    return undefined;
                }
                getRecords(null, data);                         
            });
        });
    };

    

    return {
        run: getStream
    };
}

module.exports = clickStreamConsumer;




