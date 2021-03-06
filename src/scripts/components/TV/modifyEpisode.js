'use strict';

import React from 'react/addons';
import Loading from '../UI/Loading';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook, State } from 'react-router';


var mensaje = {
  errorInsertada: 'La serie ya está insertada'
};

var fieldValues = {
  serie: null,
  temporada: null,
  numero: null,
  nombre: null
};

let modifyEpisode = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],

    getInitialState(){
      return {
        value: '',
        nombre: '',
        numero: '',
        inputName: '',
        mostrar: false
      };
    },
    componentWillMount(){
      var id = this.getParams().id;

      this.props.flux.getActions('tv').getEpisode(id).then((res) => {

        console.log('res', res);


        this.setState({
          value: res
        });

      });
    },
    handleForm(e){
      e.preventDefault();

      var id = this.getParams().id;
      var idSerie = this.getParams().idSerie;
      var idGenerator = this.getParams().idGenerator;


      var form = {
        id: id,
        nombre: this.refs.nombre.getDOMNode().value,
        numero: this.refs.numero.getDOMNode().value,
        descripcion: this.refs.descripcion.getDOMNode().value
      };

      console.log('form '+JSON.stringify(form));

      this.props.flux.getActions('tv').modifyEpisode(form).then((res) => {

        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
          console.log('error episodio ya insertado');
          self.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');

        } else if(res[0].Resultado === 200){

          console.log('episodio modificado');
          this.transitionTo('/episodes/:id/:idGenerator', {id: idSerie, idGenerator: idGenerator});
        }

      });
    },
    addWords(){
      //console.log('Add Words');
      var idEpisodio = this.getParams().id;
      var idSerie = this.getParams().idSerie;
      this.transitionTo('/addWords/:id/:idPelicula/:idEpisodio', {id: '3', idPelicula: idSerie, idEpisodio: idEpisodio});
    },
    render() {
      var float = {
        float: 'right'
      };
      if(this.state.value !== ''){

      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <div className="dictionaryButton" style={float}>
            <button className="addWords" onClick={this.addWords}>ADD WORDS</button>
          </div>
          <img className='img' src={this.state.value[0].Foto} width="230" height="345"/>
          <form onSubmit={this.handleForm} id="modifyEpisode" method="post" role="form">
          <label className="is-required">Nombre</label>
          <input ref="nombre" className={this.state.inputName} type="text" required placeholder="Nombre" defaultValue={this.state.value[0].Nombre}></input>
          <label className="is-required">Número</label>
          <input ref="numero" className={this.state.inputName} type="number" required placeholder="Número" defaultValue={this.state.value[0].Numero}></input>
          <label>Descripción</label>
          <textarea ref="descripcion" defaultValue={this.state.value[0].Descripcion}></textarea>
          <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );

    } else {
      return (<Loading/>);
    }


    }

});


module.exports = modifyEpisode;
