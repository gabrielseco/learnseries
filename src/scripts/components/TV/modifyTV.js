'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { State, Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La serie ya está insertada'
};


let modifyTV = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
      return {
        value: {},
        inputName: '',
        mostrar: false
      };
    },
    componentWillMount(){

      var self = this;
      var id = this.getParams().id;
      this.props.flux.getActions('tv').getTV(id).then(function(res){

        var value = {
          nombre: res[0].Nombre,
          anterior: res[0].Nombre,
          temporada: res[0].Temporada
        };


        self.setState({value: value });

      });


    },

    handleForm(e) {

      e.preventDefault();

      var self = this;

      var form = {
        nombre: this.refs.nombre.getDOMNode().value,
        anterior: this.state.value.anterior,
        temporada: this.refs.temporada.getDOMNode().value
      };

      console.log(form);


      this.props.flux.getActions('tv').modifyTV(form).then(function(res){
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
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
          console.log('serie modificada');
          //need to do this to update films before we go back
          self.props.flux.getActions('tv').fetchTV();
          self.transitionTo('/tv');
        }

      });

    },

    render() {

      const handleChange = (e) => {

         var value = {
           nombre: e.target.value,
           anterior: this.state.value.anterior,
           temporada: this.refs.temporada.getDOMNode().value
         };

         this.setState({value: value});

       };

       const handleTemporada = (e) => {
         var value = {
           nombre: this.refs.nombre.getDOMNode().value,
           anterior: this.state.value.anterior,
           temporada: event.target.value
         };

         this.setState({value: value});

       };

      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addTV" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="nombre" className={this.state.inputName} type="text" name="name" onChange={handleChange} required placeholder="Nombre" value={this.state.value.nombre}></input>
            <label className="is-required">Temporada</label>
            <input ref="temporada" className={this.state.inputName} type="text" name="name" onChange={handleTemporada} required placeholder="Temporada" value={this.state.value.temporada}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = modifyTV;
