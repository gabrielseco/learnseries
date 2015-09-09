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

let addEpisodeTV = React.createClass({

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
      var self = this;
      var id = this.getParams().id;
      this.props.flux.getActions('tv').getTVEpisode(id).then((res) => {

        console.log('res', res);
        var value = {
          serie: res[0].Nombre,
          temporada: res[0].Temporada,
          numero: res[0].Episodio,
          nombre: ''
        };



        this.setState({
          value: value,
          numero: value.numero
        });

      });
    },
    handleForm(e){
      e.preventDefault();

      var id = this.getParams().id;
      var idGenerator = this.getParams().idGenerator;

      var form = {
        id: id,
        nombre: this.refs.nombre.getDOMNode().value,
        numero: this.refs.numero.getDOMNode().value
      };


      this.props.flux.getActions('tv').createEpisodeTV(form).then((res) => {
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
          //we move to films
          console.log('episodio insertado');
          this.transitionTo('/episodes/:id/:idGenerator', {id: id, idGenerator: idGenerator});
        }

      });
    },
    render() {

      if(this.state.value !== ''){

      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addEpisode" method="post" role="form">
          <p>{this.state.value.serie} - Season {this.state.value.temporada}</p>
          <label className="is-required">Nombre</label>
          <input ref="nombre" className={this.state.inputName} type="text" required placeholder="Nombre" defaultValue={this.state.value.nombre}></input>
            <label className="is-required">Número</label>
            <input ref="numero" className={this.state.inputName} type="number" required placeholder="Número" defaultValue={this.state.value.numero}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );

    } else {
      return (<Loading/>);
    }


    }

});


module.exports = addEpisodeTV;
