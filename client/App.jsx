App = React.createClass({
  getInitialState(){
    // sets a dumb game
    var nextGame = {
      opponent: '?????',
      isoName: '',
      date: new Date()
      // date: new Date(1458856800 * 1000)
    };
    return {
      nextGame: nextGame
    };
  },

  componentDidMount(){
    // get data from amazon lambda
    //TODO: uncomment
    // _getNextGameFromServer();


    // mocks an ajax call, just for development, as we don't want to
    // waste our bandwith :P
    setTimeout(() => {
      this.setState({
        nextGame: {
          opponent: 'Argentina',
          isoName: 'ar',
          date: new Date(1458856800 * 1000)
        }
      });
    }, 2000);

  },
  _getNextGameFromServer(){
    $.ajax({
      context: this,
      url: 'https://toroprxmgj.execute-api.us-west-2.amazonaws.com/prod/getbrazilsnextgame',
      type: 'GET',
      crossDomain: true,
      contentType: 'application/json',
      success: function (result){
        this.setState({
          nextGame: {
            opponent: result.opponent.ptbr,
            isoName: result.opponent.iso,
            date: new Date(result.time * 1000)
          }
        });
      }
    });
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
