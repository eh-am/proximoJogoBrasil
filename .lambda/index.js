var cheerio = require('cheerio');
var request = require('request');
var countrynames = require('countrynames');


exports.handler = function(event, context){
  var URL = 'http://www.goal.com/br/fixtures/team/brasil/349';
  request(URL, handleRequest);

  function handleRequest(err, response, body){
    if (err) throw err;

    var match = extractNextMatch(body);
    context.succeed(match);
  }
};


/**
* Given a html page from goal.com, extracts the next match object
*/
function extractNextMatch(data){
  $ = cheerio.load(data);
  var match = $('.match-table tbody').first();

  if (match === null) throw err;

  $ = cheerio.load(match.html());


  var match = {
    time: $('tr').data('matchTime'),
    opponent: getOpponentsName($)
  };

  return match;
}

/**
* Gets opponent's name, regardless if it's visitors/home
*/
function getOpponentsName($){
  var opponent = {};
  var i = 0;
  do {
    opponent.ptbr = $('.team').eq(i).find('.module-team span').html()
    opponent.en = $('.team').eq(i).find('.module-team img').attr('alt')

    i++;
  } while(opponent.ptbr === 'Brasil');

  opponent.iso = countrynames.getCode(opponent.en);

  return opponent;
}
