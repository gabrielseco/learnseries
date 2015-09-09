'use strict';

import React from 'react/addons';
import FilmsForm from './FilmsForm';
import TVForm from './TVForm';
import FormWords from './FormWords';
import FormEpisodes from './FormEpisodes';

import { Navigation, TransitionHook, State } from 'react-router';

var requiredValues = {
  idPelicula: '',
  idSerie: '',
  idEpisodio: '',
  english: '',
  spanish: ''
};

var text = {
  pelicula: 'Seleccione Película',
  serie: 'Seleccione Serie',
  episodio: 'Seleccione Episodio'
};

let addWords = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
  componentDidMount(){

    if(+this.getParams().idEpisodio === 0){
      requiredValues.idPelicula = this.getParams().idPelicula;
    }
    else {
      requiredValues.idSerie = this.getParams().idPelicula;
      requiredValues.idEpisodio = this.getParams().idEpisodio;
    }
        
  },
  render(){
    switch(+this.getParams().id) {
      case 1:
        return <FilmsForm flux={this.props.flux} text={text} requiredValues={requiredValues} />;
      case 2:
        return <TVForm flux={this.props.flux} text={text} requiredValues={requiredValues} />;
      case 3:
        return <FormWords flux={this.props.flux} requiredValues={requiredValues} />;
      case 4:
        return <FormEpisodes flux={this.props.flux} text={text} requiredValues={requiredValues} />;
    }
    return (<div></div>);
  }
});


module.exports = addWords;
