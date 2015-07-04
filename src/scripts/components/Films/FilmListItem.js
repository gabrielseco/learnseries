'use strict';

import React from 'react/addons';
import Modal from 'react-modal';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';

//we have the a filmsListItem with his UI ACTIONS



var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();




let FilmsListItem = React.createClass({

  mixins: [ Navigation, TransitionHook ],
  getInitialState(){
    return {
      modalIsOpen: false
    };
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  remove(obj){
    console.log('clicked the submit modal button');

    console.log('obj', obj.ID);

    var self = this;

    this.props.flux.getActions('films').deleteFilm(obj.ID).then(function(res){

      console.log('res', res);

      if(res[0].Resultado === 500){
        //error película insertada añadir clases
        console.log('error no se pudo eliminar la película');
      } else if (res[0].Resultado === 501) {
        //velneo caído
        console.log('Velneo caído');
      } else if(res[0].Resultado === 200){
        //we move to films
        console.log('película eliminada');
        self.props.flux.getActions('films').fetchFilms();

      }
      self.closeModal();


    });
  },

  modifyFilm(obj){
    console.log('modify');
    console.log('name', obj.Nombre);
    this.transitionTo('/modifyFilm/:name', {name: obj.Nombre});


  },

  diccionarios(obj){
    console.log('diccionarios');
    this.transitionTo('/diccionarios/:id', {id: obj.ID});

  },


    render() {

      return (

              <div className="show-image">
                  <img onClick={this.modifyFilm.bind(this, this.props.data)}
                       src={this.props.data.Foto}
                       title={this.props.data.Nombre}
                       alt={this.props.data.Nombre}
                       width="230"
                       height="345"/>
                  <input type="button"
                         className="delete"
                         value="BORRAR"
                         onClick={this.openModal}>
                  </input>
                  <div className="diccionarios">
                    <button onClick={this.diccionarios.bind(this, this.props.data)}>PALABRAS</button>
                  </div>
                  <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <h2>Desea eliminar la película {this.props.data.Nombre} ?</h2>
                    <div className="buttons">
                      <button className="cancel" onClick={this.closeModal}>Cancelar</button>
                      <button className="submit" onClick={this.remove.bind(this, this.props.data)}>Enviar</button>
                    </div>
                  </Modal>
              </div>

      );


    }

});


module.exports = FilmsListItem;
