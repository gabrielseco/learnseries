'use strict';

import React from 'react/addons';
import Modal from 'react-modal';
import Mensaje from '../UI/Mensaje';
import { Navigation, TransitionHook } from 'react-router';

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();


let TVListItem = React.createClass({

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
    //console.log('clicked the delete button');

    //console.log('clicked the submit modal button');

    //console.log('obj', obj.ID);

    this.props.flux.getActions('tv').deleteTV(obj.ID).then((res) => {

      //console.log('res', res);

      if(res[0].Resultado === 500){
        //error película insertada añadir clases
        //console.log('error no se pudo eliminar la serie');
      } else if (res[0].Resultado === 501) {
        //velneo caído
        //console.log('Velneo caído');
      } else if(res[0].Resultado === 200){
        //we move to films
      //  console.log('serie eliminada');
        var tv = document.getElementById(obj.ID);
            tv.parentNode.removeChild(tv);

      }
      this.closeModal();

    });


  },

  modifyTV(obj){
    this.transitionTo('/modifyTV/:id', {id: obj.ID});

  },
  episodes(obj){
    //console.log('episodes');
    this.transitionTo('/episodes/:id/:idGenerator', {id: obj.ID, idGenerator: obj.IDGenerator});

  },


  diccionarios(obj){
    //console.log('diccionarios');
    //this.transitionTo('/diccionarios');
  },

    render() {
      var title = this.props.data.Nombre + " - SEASON " + this.props.data.Temporada;

      return (
        <div className="show-image" id={this.props.data.ID}>
                  <img onClick={this.modifyTV.bind(this, this.props.data)}
                        src={this.props.data.Foto}
                        title={title}
                        alt={this.props.data.Nombre}
                        width="230"
                        height="345"/>
                        <input type="button"
                               className="delete"
                               value="BORRAR"
                               onClick={this.openModal}>
                        </input>
                  <div className="episodes">
                        <button onClick={this.episodes.bind(this, this.props.data)}>EPISODES</button>
                  </div>
                  <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <h2>Desea eliminar la serie {this.props.data.Nombre} - temporada {this.props.data.Temporada} ?</h2>
                    <div className="buttons">
                      <button className="cancel" onClick={this.closeModal}>Cancelar</button>
                      <button className="submit" onClick={this.remove.bind(this, this.props.data)}>Enviar</button>
                    </div>
                  </Modal>
        </div>
      );


    }

});


module.exports = TVListItem;
