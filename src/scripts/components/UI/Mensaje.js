'use strict';

import React from 'react/addons';

let Mensaje = React.createClass({

    getInitialState(){
      var hidden;

      if(this.props.mostrar === false) {
        hidden = 'hidden';
      } else {
        hidden = '';
      }

      return {
        hidden: hidden
      };
    },

    componentWillReceiveProps(nextProps){

      if(nextProps.mostrar) {
        this.setState({
          hidden: ''
        });
      }

    },

    render() {

      return (
        <div className={this.state.hidden}>
          <p className='warning-error'>{this.props.mensaje}</p>
       </div>

      );


    }

});


module.exports = Mensaje;
