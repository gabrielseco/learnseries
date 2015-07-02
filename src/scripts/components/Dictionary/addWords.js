'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import Select from '../UI/Select';
import { Navigation, TransitionHook, State } from 'react-router';

var text = {
  pelicula: 'Seleccione Película',
  serie: 'Seleccione Serie',
  episodio: 'Seleccione Episodio'
};

let addWords = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],

    getInitialState(){
      return {
        value: {},
        select: '',
        formulario: 'hidden',
        episodio: 'hidden',
        data: '',
        errorInput: '',
        words: [],
        text: ''
      };
    },

    componentWillMount() {
      var params = this.getParams().id;

      if( params === "1"){
        this.props.flux.getStore('films').addListener('change', this.onFilmsStoreChange);
      } else if(params === "2") {
        this.props.flux.getStore('tv').addListener('change', this.onTVStoreChange);
      }
    },

    componentWillUnmount() {
      var params = this.getParams().id;

      if( params === "1"){
        this.props.flux.getStore('films').removeListener('change', this.onFilmsStoreChange);
      } else if(params === "2") {
        this.props.flux.getStore('tv').removeListener('change', this.onTVStoreChange);
      }

    },

    onFilmsStoreChange() {
        this.setState({ data: this.props.flux.getStore('films').getFilms(), text: text.pelicula });
    },
    onTVStoreChange(){
      this.setState({ data: this.props.flux.getStore('tv').getTV(), text: text.serie });

    },
    handleForm(e){

      e.preventDefault();

      var params = this.getParams().id;

      if(params === '1'){
        this.setState({
          formulario: ''
        });
      }
      else if (params === '2'){
        var id = document.getElementById('ID').value;

        var value = {
          id: id
        };

        this.props.flux.getActions('tv').fetchTVEpisodes(id).then((res) => {

          this.setState({
            text: text.episodio,
            episodio: '',
            data: res,
            value: value
          });

        });



      }
      this.setState({
        select: 'hidden'
      });

    },
    saveIDEpisode(){

      console.log('SAVE EPISODE');

      this.setState({
        formulario: ''
      });

      document.getElementById('selectEpisode').className = 'hidden';
      this.refs.english.getDOMNode().focus();





    },

    handleWords(){

      var self = this;

      var idEpisodio = document.getElementById('IDEpisodio').value;
      var id = document.getElementById('ID').value;




      if(idEpisodio !== null){
        var form = {
          idSerie: id,
          idEpisodio: idEpisodio,
          english: this.refs.english.getDOMNode().value,
          spanish: this.refs.spanish.getDOMNode().value
        };

      }

      else {
        form = {
          idPelicula: id,
          english: this.refs.english.getDOMNode().value,
          spanish: this.refs.spanish.getDOMNode().value
        };
      }

      console.log('form', form);


      var array = this.state.words;

      array.push(form);

        this.props.flux.getActions('diccionarios').insertWords(form).then(function(res){


        console.log('res', res);

        if(res[0].Resultado === 500){
          //error serie insertada añadir clases
          console.log('error al insertar las palabras ya insertada');
          self.setState({
            inputName: 'redBorder'
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('palabra insertada');

        }
        var value = {
          english: '',
          spanish: '',
          id: id
        };

        self.setState({
          value: value
        });
        self.refs.english.getDOMNode().focus();

      });




    },

    finish(){
      var params = this.getParams().id;

      if(params === 1){
        this.transitionTo('/DictionaryFilms');
      }
      else{
        this.transitionTo('/DictionaryTV');
      }
    },
    renderEpisode(){
      const handleEnglish = (e) => {
        console.log('id ', this.state.value.id);
        var value = {
          english: e.target.value,
          spanish: this.state.value.spanish,
          id: this.state.value.id
        };

        this.setState({
          value: value
        });

      };

      const handleSpanish = (e) => {
        var value = {
          english: this.state.value.english,
          spanish: e.target.value,
          id: this.state.value.id

        };

        this.setState({
          value: value
        });
      };

      if(this.state.data !== ''){
      return (
      <div>
        <form id="selectEpisode" className={this.state.episodio} method="post" role="form">
          <Select ID="IDEpisodio"
                  text={this.state.text}
                  data={this.state.data}
                  series="episodio">
          </Select>
          <input type="hidden" id="ID" value={this.state.value.id}/>
          <input type="button" value="ENVIAR" onClick={this.saveIDEpisode}></input>
        </form>

        <form className={this.state.formulario} id="addWords" role="form">
          <input type="text"
                name="English"
                id="English"
                onChange={handleEnglish}
                required
                placeholder="Inglés"
                value={this.state.value.english}
                ref="english"
                className={this.state.errorInput}>
          </input>
          <input type="text"
                      name="Spanish"
                      id="Spanish"
                      onChange={handleSpanish}
                      required
                      placeholder="Español"
                      value={this.state.value.spanish}
                      ref="spanish"
                      className={this.state.errorInput}>
         </input>
          <input type="button" value="Siguiente" onClick={this.handleWords}></input>
          <input type="button" value="Finalizar" onClick={this.finish}></input>
        </form>
      </div>
    );
  }else{
    return (<div></div>);
  }
},
    renderTV(){
      if(this.state.data !== ''){
      return (
        <div>
        <form className={this.state.select} id="selectName" role="form">
          <div>
          <Select
                  ID="ID"
                  text={this.state.text}
                  data={this.state.data}
                  series="true">
          </Select>
          <input type="button" value="ENVIAR" onClick={this.handleForm}></input>
          </div>
        </form>
        </div>
      );
    } else{
      return (<div></div>);
    }

    },
    renderFilms() {

      const handleEnglish = (e) => {
        this.state.value.english = e.target.value;
      };

      const handleSpanish = (e) => {
        this.state.value.spanish = e.target.value;
      };
      if(this.state.data !== ''){
      return (
        <div>
        <form className={this.state.select} id="selectName" role="form">
          <div>
          <Select
                  ID="ID"
                  text={this.state.text}
                  data={this.state.data}
                  series="false">
          </Select>
          <input type="button" value="ENVIAR" onClick={this.handleForm}></input>
          </div>
        </form>
        <form id="addWorld" className={this.state.formulario}
          role="form" >
          <input type="text"
                name="English"
                id="English"
                onChange={handleEnglish}
                required
                placeholder="Inglés"
                value={this.state.value.english}
                ref="english"
                className={this.state.errorInput}>
          </input>
          <input type="text"
                      name="Spanish"
                      id="Spanish"
                      onChange={handleSpanish}
                      required
                      placeholder="Español"
                      value={this.state.value.spanish}
                      ref="spanish"
                      className={this.state.errorInput}>
         </input>
          <input type="button" value="Siguiente" onClick={this.handleWords}></input>
          <input type="button" value="Finalizar" onClick={this.finish}></input>
        </form>
        </div>
      );
    } else{
      return (<div></div>);
    }

    },
    render(){
      var params = this.getParams().id;

      if(params === '1') {
        return (this.renderFilms());
      }
      else if(params === '2' && this.state.episodio === 'hidden'){
        return (this.renderTV());
      }
      else if(this.state.episodio === ''){
        return (this.renderEpisode());
      }
      else{
        return (<div></div>);
      }
    }

});


module.exports = addWords;
