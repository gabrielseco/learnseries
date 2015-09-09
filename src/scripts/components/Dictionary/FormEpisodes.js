'use strict';

import React from 'react/addons';
import Select from '../UI/Select';
import Loading from '../UI/Loading';
import { Navigation, TransitionHook, State } from 'react-router';


let FilmsForm = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    return {
      select: '',
      data: ''
    };
  },
  componentWillMount(){
    this.props.flux.getActions('tv').fetchTVEpisodesSelect(this.props.requiredValues.idSerie).then((res) => {
       console.log('res', res);

      this.setState({ data: res });

    });
  },
  handleForm(){
    var requiredValues = this.props.requiredValues;
    requiredValues.idEpisodio = document.getElementById('IDEpisodio').value;

    console.log(requiredValues);

    this.props.flux.getActions('diccionarios').saveRequiredData(requiredValues);

    var idPelicula = requiredValues.idSerie;
    var idEpisodio = requiredValues.idEpisodio;
    this.transitionTo('/addWords/:id/:idPelicula/:idEpisodio', {id:'3', idPelicula: idPelicula, idEpisodio: idEpisodio});
  },
  render(){
    if(this.state.data !== ''){
      return (
        <div>
          <form className={this.state.select} id="selectName" role="form">
            <div>
            <Select
                    ID="IDEpisodio"
                    text={this.props.text.episodio}
                    data={this.state.data}>
            </Select>
            <input type="button" value="ENVIAR" onClick={this.handleForm}></input>
            </div>
          </form>
        </div>
      );
    }
    else{
      return (<Loading/>);
    }

  }
});

module.exports = FilmsForm;
