'use strict';

import React from 'react/addons';
import Modal from 'react-modal';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';



var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();




let BookListItem = React.createClass({

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
    //console.log('clicked the submit modal button');

    //console.log('obj', obj.ID);


  /*  this.props.flux.getActions('films').deleteFilm(obj.ID).then((res) => {

      //console.log('res', res);

      if(res[0].Resultado === 500){
        //error película insertada añadir clases
      //  console.log('error no se pudo eliminar la película');
      } else if (res[0].Resultado === 501) {
        //velneo caído
        console.log('Velneo caído');
      } else if(res[0].Resultado === 200){
        //we move to films
        //console.log('película eliminada');
        var film = document.getElementById(obj.ID);
            film.parentNode.removeChild(film);
        this.transitionTo('/films');

      }
      self.closeModal();


    });*/
  },

  modify(obj){
    this.transitionTo('/modifyBook/:name', {name: obj.Nombre});
  },

  diccionarios(obj){
    //console.log('diccionarios');
    this.transitionTo('/diccionarios/:id', {id: obj.ID});

  },


    render() {

      return (

              <div className="show-image" id={this.props.data.ID}>
                  <img onClick={this.modify.bind(this, this.props.data)}
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
                    <h2>Desea eliminar el libro {this.props.data.Nombre} ?</h2>
                    <div className="buttons">
                      <button className="cancel" onClick={this.closeModal}>Cancelar</button>
                      <button className="submit" onClick={this.remove.bind(this, this.props.data)}>Eliminar</button>
                    </div>
                  </Modal>
              </div>

      );
    }
});


module.exports = BookListItem;
