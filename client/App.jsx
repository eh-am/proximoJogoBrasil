App = React.createClass({
  render(){
    var nextGames = [{
      opponent: 'Argentina',
      flag: 'http://flagpedia.net/data/flags/normal/uy.png',
      date: new Date(1458856800 * 1000)
    }];

    var nextOpponent = nextGames[0];

    return (
      <div className="container">
        

        <NextGame
          opponent={ nextOpponent.opponent }
          flag={ nextOpponent.flag }
          date= { nextOpponent.date }
          />
      </div>
    );
  }
});
