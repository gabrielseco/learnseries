'use strict';

import React from 'react/addons';

let Select = React.createClass({
    getInitialState(){
      return {
        id: ''
      };
    },
    componentDidMount(){
      $(this.refs.myRef.getDOMNode(this)).select2();
    },
    onSelect(e){
      console.log(this.refs.myRef.getDOMNode(this).value);

      console.log('hola'+this.state.id);
      $()
    },
    handle(){
      this.setState({id: e.target.value});

    },
    render() {


        return (
          <select ref="myRef" className="" onChange={this.onSelect}>
            <option value="AL">Alabama</option>
            <option value="WY">Wyoming</option>
          </select>
        );
    }
});

module.exports = Select;
