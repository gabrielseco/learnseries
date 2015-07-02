'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La serie ya está insertada'
};

let addTV = React.createClass({

  mixins: [ Navigation, TransitionHook ],

    getInitialState(){
      return {
        value: {},
        inputName: '',
        mostrar: false
      };
    },
    handleForm(e){
      e.preventDefault();

      var self = this;

      var value = {
        name: this.refs.name.getDOMNode().value,
        temporada: this.refs.temporada.getDOMNode().value
      };

      console.log('value', value);

      this.props.flux.getActions('tv').createTV(value).then(function(res){
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error serie insertada añadir clases
          console.log('error serie ya insertada');
          self.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('serie insertada');
          self.props.flux.getActions('tv').fetchTV();
          self.transitionTo('/tv');
        }

      });
    },
    render() {

      const handleChange = (e) => {

         this.state.value.name = e.target.value;

       };

       const handleTemporada = (e) => {

         this.state.value.temporada = e.target.value;


       };

      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addTV" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="name" className={this.state.inputName} type="text" name="name" onChange={handleChange} required placeholder="Nombre" value={this.state.value.name}></input>
            <label className="is-required">Temporada</label>
            <input ref="temporada" className={this.state.inputName} type="text" name="name" onChange={handleTemporada} required placeholder="Temporada" value={this.state.value.temporada}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = addTV;
