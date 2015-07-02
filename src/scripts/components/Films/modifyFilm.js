'use strict';

import React from 'react/addons';
import Mensaje from '../UI/Mensaje';
import { State, Navigation, TransitionHook } from 'react-router';


var mensaje = {
  errorInsertada: 'La película ya está insertada'
};

var value = {
  name: '',
  anterior: ''
};


let modifyFilm = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
      return {
        value: value,
        inputName: '',
        mostrar: false
      };
    },
    componentDidMount(){
      var params = this.getParams().name;

        value = {
          name: params,
          anterior: params
        };

      this.setState({value: value });

    },

    handleForm(e) {

      e.preventDefault();



      var self = this;



      this.props.flux.getActions('films').modifyFilm(this.state.value).then(function(res){
        console.log('res', res);

        if(res[0].Resultado === 500){
          //error película insertada añadir clases
          console.log('error película ya insertada');
          self.setState({
            inputName: 'redBorder',
            mostrar: true
          });
        } else if (res[0].Resultado === 501) {
          //velneo caído
          console.log('Velneo caído');
        } else if(res[0].Resultado === 200){
          //we move to films
          console.log('película modificada');
          //need to do this to update films before we go back
          self.props.flux.getActions('films').fetchFilms();
          self.transitionTo('/films');
        }

      });

    },

    render() {
      const handleChange = (e) => {

         value = {
           name: e.target.value,
           anterior: this.state.value.anterior
         };

         this.setState({value: value});

       };

      return (
        <div>
          <Mensaje mostrar={this.state.mostrar} mensaje={mensaje.errorInsertada} />
          <form onSubmit={this.handleForm} id="addFilm" method="post" role="form">
            <label className="is-required">Nombre</label>
            <input ref="inputName" type="text"
                   name="name" onChange={handleChange} id="name"
                   required placeholder="Nombre"
                   value={this.state.value.name}
                   className={this.state.inputName}></input>
            <input type="submit" value="Enviar"></input>
          </form>
       </div>

      );


    }

});


module.exports = modifyFilm;
