var twit = require('twit');
var config = require('./config.js');
var Twitter=new twit(config);

var retweet = function() {
  var params = {
  //	q:'#inspiration',
    q: 'banana' ,
    lang:'en'   
  } 

   Twitter.get('search/tweets', params, function(err, data,response) {
          if(!err){
          	console.log(data);
          	if(data && data.statuses[0]){
         var retweetId = data.statuses[0].id_str;
         var tweets=data.statuses;
         for(var i=0;i<tweets.length;i++){
         	console.log(tweets[i].text);
         }
               Twitter.post('statuses/retweet/:id', {
                id: retweetId          
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        else {
          console.log('No tweets found!!');
        }
    }
    });
}
retweet();
setInterval(retweet,6000);//check retweet 