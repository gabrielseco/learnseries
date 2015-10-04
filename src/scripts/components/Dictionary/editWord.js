'use strict';

import React from 'react/addons';
import Loading from '../UI/Loading';
import { Navigation, TransitionHook, State } from 'react-router';


let EditWord = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    return {
      errorInput: '',
      value: ''
    };
  },
  componentWillMount(){
    var params = this.getParams().id;

    this.props.flux.getActions('diccionarios').getWord(params).then((res) => {

      console.log('res', res);

      var value = {
        english: res[0].english,
        spanish: res[0].spanish,
      };

      this.setState({
        value: value
      });

      this.refs.english.getDOMNode().focus();

    });


  },
  handleWords(){
    this.state.value.english = this.refs.english.getDOMNode().value;
    this.state.value.spanish = this.refs.spanish.getDOMNode().value;
    this.state.value.ID = this.getParams().id;
    var idPelicula = this.getParams().idPelicula;
    var idEpisodio = +this.getParams().idEpisodio;

    console.log('handleWords'+JSON.stringify(this.state.value));


    this.props.flux.getActions('diccionarios').editWord(this.state.value).then((res) => {


    console.log('res', res);

    if(res[0].Resultado === 500){
      //error serie insertada añadir clases
      console.log('error al editar las palabras');
    } else if (res[0].Resultado === 501) {
      //velneo caído
      console.log('Velneo caído');

    } else if(res[0].Resultado === 200){

      console.log('palabra editada');

      if(idEpisodio !== 0){
        this.transitionTo('/dictionaryEpisode/:idPelicula/:idEpisodio',{idPelicula: idPelicula, idEpisodio: idEpisodio});
      }
      else {
        this.transitionTo('/diccionarios/:id',{id: idPelicula});
      }

    }

    this.refs.english.getDOMNode().value = '';
    this.refs.spanish.getDOMNode().value = '';
    this.refs.english.getDOMNode().focus();


  });



  },
  render(){
    if (this.state.value !== ''){
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
              className={this.state.errorInput}
              defaultValue={this.state.value.english}>
        </input>
        <input type="text"
                    name="Spanish"
                    id="Spanish"
                    required
                    placeholder="Español"
                    ref="spanish"
                    className={this.state.errorInput}
                    defaultValue={this.state.value.spanish}>
       </input>
        <input type="button" value="Editar" onClick={this.handleWords}></input>
      </form>
      </div>
    );
    } else {
      return (<Loading/>);
    }
  }
});


module.exports = EditWord;
