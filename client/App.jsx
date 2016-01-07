App = React.createClass({
  getInitialState(){
    // sets a dumb game
    var nextGame = {
      opponent: '?????',
      isoName: 'br',
      date: new Date()
      // date: new Date(1458856800 * 1000)
    };
    return {
      nextGame: nextGame
    };
  },

  componentDidMount(){
    // get data from amazon lambda

    // $.ajax({
    //   context: this,
    //   url: 'https://toroprxmgj.execute-api.us-west-2.amazonaws.com/prod/getbrazilsnextgame',
    //   type: 'GET',
    //   crossDomain: true,
    //   contentType: 'application/json',
    //   success: function (result){
    //     console.log('this is the result');
    //     console.log(result);
    //     this.setState({
    //       nextOpponent: {
    //         opponent: result.opponent.ptbr,
    //         flag: this._getFlagUrl(result.opponent.iso),
    //         date: new Date(result.time * 1000)
    //       }
    //     });
    //   }
    // });
  },


  render(){
    return (
      <div className="container">
        <NextGame
          opponent={ this.state.nextGame.opponent }
          isoName={ this.state.nextGame.isoName }
          date= { this.state.nextGame.date }
        />
      </div>
    );
  }
});
