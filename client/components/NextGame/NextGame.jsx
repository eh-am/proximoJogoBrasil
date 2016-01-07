NextGame = class NextGame extends React.Component{
  _getFlagUrl(){
    if (this.props.isoName.length <= 0) return '';

    return 'http://flagpedia.net/data/flags/normal/' + this.props.isoName.toLowerCase() + '.png';
  }


  render(){
    var date = '';
    var counter = '';
    var flagClassname = "flag placeholder";

    // prepare stuff to be showed
    if (this.props.date){
      moment.locale('pt-br');
      var m = moment(this.props.date);
      date = `Em ${m.format('LLL')} (Horário de Brasília)`;


      m = moment(this.props.date);
      counter = `O jogo acontecerá ${m.startOf('hour').fromNow()}`;

      flagClassname = "flag";
    }


    return (
      <div className="nextGame">
        <header>
          <h3>O próximo jogo do Brasil será contra</h3>
        </header>

        <span className={flagClassname}>
          <img src={this._getFlagUrl()} alt={this.props.opponent}/>
        </span>

        <h2 className="title"> { this.props.opponent } </h2>
        <h4 className="date"> { date } </h4>
        <h5>{ counter }</h5>
      </div>
    );
  }
}
