// import moment from 'moment';

NextGame = class NextGame extends React.Component{
  _getFlagUrl(){
    // return 'http://flagpedia.net/data/flags/normal/' + this.props.isoName.toLowerCase() + '.png';
    return '';
  }


  render(){
    moment.locale('pt-br');
    var m = moment(this.props.date);
    var date = m.format('LLL');

    return (
      <div className="nextGame">
        <img src={this._getFlagUrl()} alt={this.props.opponent} className="flag"/>
        <h2 className="title"> { this.props.opponent } </h2>
        <h4 className="date">Em { date }</h4>
      </div>
    );
  }
}
