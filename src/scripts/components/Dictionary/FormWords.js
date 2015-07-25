'use strict';

import React from 'react/addons';
import { Navigation, TransitionHook, State } from 'react-router';

var text = {
  pelicula: 'Seleccione Película',
  serie: 'Seleccione Serie',
  episodio: 'Seleccione Episodio'
};

let FormWords = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    return {
      errorInput: ''
    };
  },
  componentDidMount(){
    this.refs.english.getDOMNode().focus();

  },
  handleWords(){
    this.props.requiredValues.english = this.refs.english.getDOMNode().value;
    this.props.requiredValues.spanish = this.refs.spanish.getDOMNode().value;
    console.log(this.props.requiredValues);


    this.props.flux.getActions('diccionarios').insertWords(this.props.requiredValues).then((res) => {


    console.log('res', res);

    if(res[0].Resultado === 500){
      //error serie insertada añadir clases
      console.log('error al insertar las palabras ya insertada');
    } else if (res[0].Resultado === 501) {
      //velneo caído
      console.log('Velneo caído');
    } else if(res[0].Resultado === 200){
      console.log('palabra insertada');

    }

    this.refs.english.getDOMNode().value = '';
    this.refs.spanish.getDOMNode().value = '';
    this.refs.english.getDOMNode().focus();


  });



  },
  finish(){
    console.log('finalizar');
    this.transitionTo('/');

    //var params = this.getParams().idEpisode;
    //this.transitionTo('/dictionaryEpisode/:id', {id: params});

  },
  render(){
    console.log(this.props.requiredValues);
    return (
      <div>
      <form id="addWorld"
        role="form" >
        <input type="text"
              name="English"
              id="English"
              required
              placeholder="Inglés"
              ref="english"
              className={this.state.errorInput}>
        </input>
        <input type="text"
                    name="Spanish"
                    id="Spanish"
                    required
                    placeholder="Español"
                    ref="spanish"
                    className={this.state.errorInput}>
       </input>
        <input type="button" value="Siguiente" onClick={this.handleWords}></input>
        <input type="button" value="Finalizar" onClick={this.finish}></input>
      </form>
      </div>
    );
  }
});


module.exports = FormWords;
