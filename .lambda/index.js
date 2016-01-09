var cheerio = require('cheerio');
var request = require('request-promise');
var countrynames = require('countrynames');

var URL = 'http://www.goal.com/br/fixtures/team/brasil/349';

exports.handler = function(event, context){
  handleRequest(context);
};

// handleRequest();

function handleRequest(context){
  request(URL)
  .then(extractNextMatch)
  .then(function (matches){
    var response = {
      // I am returning an array because I am going to return more matches later
      data: {
        matches: [matches]
      }
    };

    // isomorphic (local and amazon lambda)
    context ? context.succeed(response) : console.log(JSON.stringify(response));
  })
  .catch(function (err){
    var response = {
      status: 500,
      message: err,
      data: []
    };

    // isomorphic (local and amazon lambda)
    context ? context.fail(response) :  console.log(JSON.stringify(response));
  });
}



/**
* Given a html page from goal.com, extracts the next match object
*/
function extractNextMatch(data){
  $ = cheerio.load(data);
  var match = $('.match-table tbody').first();

  if (match <= 0) throw "Could not parse correctly. Maybe the DOM changed?";

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
